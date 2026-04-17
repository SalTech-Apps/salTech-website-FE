import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Input, Select, SelectItem, Textarea } from "@heroui/react";
import toast from "react-hot-toast";
import type {
  ContentDepthChoice,
  FirstImpressionChoice,
  NavigationEaseRating,
  SectionsVisitedChoice,
  LikelihoodToInvest,
  TechnicalPerformanceChoice,
} from "@/types/firestore";
import {
  CONTENT_DEPTH_OPTIONS,
  FIRST_IMPRESSION_OPTIONS,
  NAVIGATION_RATING_OPTIONS,
  SECTIONS_VISITED_OPTIONS,
  TECH_PERFORMANCE_OPTIONS,
} from "./survey.constants";
import {
  buildDeviceInfoString,
  clearStoredSubmittedWeek,
  getDeviceFingerprint,
  getOrCreateClientDeviceId,
  getStoredSubmittedWeek,
  getWeekKey,
  normalizeEmail,
} from "./survey.device";
import { applySchemaErrors, formSchema, type FormValues, type SurveyFormInput } from "./survey.schema";
import { submitSurveyResponse } from "./survey.submit";
import { SurveyThankYou } from "./SurveyThankYou";

export function SurveyFormSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SurveyFormInput>({
    defaultValues: {
      company: "",
      email: "",
      firstImpression: undefined as unknown as FirstImpressionChoice,
      navigationEaseRating: undefined as unknown as NavigationEaseRating,
      contentDepth: undefined as unknown as ContentDepthChoice,
      technicalPerformance: undefined as unknown as TechnicalPerformanceChoice,
      technicalPerformanceDetails: "",
      investorLensText: "",
      futureInterest: false,
      sectionsVisited: [],
      likelihoodToInvest: undefined as unknown as number,
      missingMostText: "",
      weekKey: undefined as unknown as number,
      deviceInfo: "",
    },
  });

  const technicalPerformanceValue = watch("technicalPerformance");

  useEffect(() => {
    const currentWeek = getWeekKey();
    const storedWeek = getStoredSubmittedWeek();
    if (storedWeek != null && storedWeek >= currentWeek) {
      setSubmitted(true);
    }
  }, []);

  useEffect(() => {
    // Keep Firestore payload clean: only collect details when needed.
    if (technicalPerformanceValue !== "significant_issues") {
      setValue("technicalPerformanceDetails", "", { shouldValidate: false });
    }
  }, [technicalPerformanceValue, setValue]);

  const firstImpressionValue = watch("firstImpression");
  const navigationEaseRatingValue = watch("navigationEaseRating");
  const contentDepthValue = watch("contentDepth");
  const futureInterestValue = watch("futureInterest");

  const selectDisabled = useMemo(
    () => submitted || isSubmitting,
    [submitted, isSubmitting],
  );

  async function onSubmit(rawData: SurveyFormInput) {
    // Honeypot: humans never see this; bots often fill every field. Silently drop without saving.
    if (rawData.company?.trim()) {
      setSubmitted(true);
      reset();
      toast.success("Thanks! Your response was submitted.");
      return;
    }

    const { company, ...surveyFields } = rawData;
    void company;

    // Compute de-duplication fields at submit-time (not controlled directly by the user).
    const normalized = normalizeEmail(surveyFields.email);
    const weekKey = getWeekKey();
    const deviceInfo = buildDeviceInfoString();

    const storedWeek = getStoredSubmittedWeek();
    if (storedWeek != null && storedWeek >= weekKey) {
      setSubmitted(true);
      toast.success(
        "It looks like you have a survey response already submitted this week.",
      );
      return;
    }

    const prepared: FormValues = {
      ...surveyFields,
      email: normalized,
      weekKey,
      deviceInfo,
    };

    const result = formSchema.safeParse(prepared);
    if (!result.success) {
      const firstFieldMessage = applySchemaErrors(result.error, (field, message) => {
        setError(field, { type: "manual", message });
      });
      toast.error(
        firstFieldMessage ??
          "Please fix the highlighted form errors and try again.",
      );
      return;
    }

    clearErrors();

    try {
      const deviceId = getOrCreateClientDeviceId();
      const deviceFingerprint = await getDeviceFingerprint();
      const data: FormValues = {
        ...result.data,
        deviceInfo: buildDeviceInfoString(deviceId),
      };
      const outcome = await submitSurveyResponse({
        data,
        deviceId,
        deviceFingerprint,
      });

      if (outcome.kind === "duplicate") {
        setSubmitted(true);
        toast.success("It looks like you already submitted this week. Thank you!");
        return;
      }

      setSubmitted(true);
      reset();
      toast.success("Thanks! Your response was submitted.");
    } catch (err) {
      const code = (err as { code?: unknown } | undefined)?.code;
      const message =
        typeof (err as { message?: unknown } | undefined)?.message === "string"
          ? (err as { message: string }).message.toLowerCase()
          : "";
      const isNetworkError =
        code === "unavailable" ||
        code === "deadline-exceeded" ||
        code === "resource-exhausted" ||
        message.includes("network");

      if (code === "permission-denied") {
        setSubmitted(true);
        toast.success(
          "It looks like you already submitted this week. Thank you!",
        );
      } else {
        if (isNetworkError) {
          clearStoredSubmittedWeek();
        }
        toast.error("Could not submit your response. Please try again.");
      }
    }
  }

  if (submitted) {
    return <SurveyThankYou />;
  }

  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-16 sm:py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-heading-h3 text-main-text-headlines text-center mb-2">
          Submit your 60-second survey
        </h2>
        <p className="text-body text-secondary-text-body-paragraphs text-center mb-10">
          This takes about a minute. Your answers will be stored securely and
          reviewed by our team.
        </p>

        <div className="bg-main-background border border-soft-divider-line p-6 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex flex-col gap-6"
            noValidate
          >
            {/* Honeypot: off-screen text field; real users leave it empty. */}
            <div
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
              aria-hidden="true"
            >
              <label htmlFor="survey-company-leave-blank">Company</label>
              <input
                id="survey-company-leave-blank"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("company")}
              />
            </div>

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                Your email (required){" "}
                <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                We use your email (and a device snapshot) to prevent duplicate
                submissions within the same week.
              </p>
              <Input
                id="survey-email"
                type="email"
                placeholder="you@example.com"
                className="mt-2"
                classNames={{
                  input:
                    "text-main-text-headlines placeholder:text-muted-labels",
                  inputWrapper:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                }}
                {...register("email")}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                disabled={selectDisabled}
              />
            </div>

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                1. First Impressions{" "}
                <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                Think about the moment you first landed on JESFEM. Was the offer
                clear within a few seconds?
              </p>
              <Select
                disabled={selectDisabled}
                placeholder="Choose one option"
                className="mt-2"
                selectedKeys={
                  firstImpressionValue ? [firstImpressionValue] : []
                }
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as
                    | FirstImpressionChoice
                    | undefined;
                  if (v) {
                    clearErrors("firstImpression");
                    setValue("firstImpression", v, { shouldValidate: true });
                  }
                }}
                classNames={{
                  trigger:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                  value: "text-main-text-headlines",
                }}
                isInvalid={!!errors.firstImpression}
                errorMessage={errors.firstImpression?.message}
              >
                {FIRST_IMPRESSION_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    className="text-main-text-headlines"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                2. Navigation &amp; Flow{" "}
                <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                How easy was it to move between{" "}
                <span className="text-main-text-headlines font-semibold">
                  Property Listings
                </span>{" "}
                and{" "}
                <span className="text-main-text-headlines font-semibold">
                  Investment Intelligence
                </span>{" "}
                (and come back)?
              </p>
              <Select
                disabled={selectDisabled}
                placeholder="Pick a number (1-5)"
                className="mt-2"
                selectedKeys={
                  navigationEaseRatingValue != null
                    ? [String(navigationEaseRatingValue)]
                    : []
                }
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as string | undefined;
                  const n = v ? Number(v) : undefined;
                  if (n != null && Number.isFinite(n) && n >= 1 && n <= 5) {
                    clearErrors("navigationEaseRating");
                    setValue(
                      "navigationEaseRating",
                      n as NavigationEaseRating,
                      { shouldValidate: true },
                    );
                  }
                }}
                classNames={{
                  trigger:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                  value: "text-main-text-headlines",
                }}
                isInvalid={!!errors.navigationEaseRating}
                errorMessage={errors.navigationEaseRating?.message}
              >
                {NAVIGATION_RATING_OPTIONS.map((opt) => (
                  <SelectItem
                    key={String(opt.value)}
                    className="text-main-text-headlines"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
              <p className="mt-2 text-xs text-muted-labels">
                1 - Difficult &nbsp;|&nbsp; 5 - Seamless
              </p>
            </div>

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                3. Content Depth <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                Did the information (Investment Intelligence / Blog) make you
                feel confident about investing in Lagos?
              </p>
              <Select
                disabled={selectDisabled}
                placeholder="Choose one option"
                className="mt-2"
                selectedKeys={contentDepthValue ? [contentDepthValue] : []}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as
                    | ContentDepthChoice
                    | undefined;
                  if (v) {
                    clearErrors("contentDepth");
                    setValue("contentDepth", v, { shouldValidate: true });
                  }
                }}
                classNames={{
                  trigger:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                  value: "text-main-text-headlines",
                }}
                isInvalid={!!errors.contentDepth}
                errorMessage={errors.contentDepth?.message}
              >
                {CONTENT_DEPTH_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    className="text-main-text-headlines"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                4. Technical Performance{" "}
                <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                Broken links, slow images, alignment issues, or buttons that
                don’t behave as expected.
              </p>
              <Select
                disabled={selectDisabled}
                placeholder="Choose one option"
                className="mt-2"
                selectedKeys={
                  technicalPerformanceValue ? [technicalPerformanceValue] : []
                }
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as
                    | TechnicalPerformanceChoice
                    | undefined;
                  if (v) {
                    clearErrors("technicalPerformance");
                    setValue("technicalPerformance", v, {
                      shouldValidate: true,
                    });
                  }
                }}
                classNames={{
                  trigger:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                  value: "text-main-text-headlines",
                }}
                isInvalid={!!errors.technicalPerformance}
                errorMessage={errors.technicalPerformance?.message}
              >
                {TECH_PERFORMANCE_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    className="text-main-text-headlines"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {technicalPerformanceValue === "significant_issues" && (
              <div>
                <label className="block text-body font-semibold text-main-text-headlines">
                  Please specify what went wrong{" "}
                  <span className="text-primary-gold">*</span>
                </label>
                <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                  Example: “Images took too long to load on mobile”, “A link led
                  to a blank page”, “Text overlapped at 375px width”.
                </p>
                <Textarea
                  placeholder="Broken links, slow images, layout glitches, etc."
                  minRows={5}
                  className="mt-2"
                  classNames={{
                    input:
                      "text-main-text-headlines placeholder:text-muted-labels",
                    inputWrapper:
                      "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                  }}
                  {...register("technicalPerformanceDetails")}
                  isInvalid={!!errors.technicalPerformanceDetails}
                  errorMessage={errors.technicalPerformanceDetails?.message}
                />
              </div>
            )}

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                5. The &quot;Investor&quot; Lens{" "}
                <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                What’s one addition that would make an overseas (diaspora)
                investor feel more confident and protected?
              </p>
              <Textarea
                placeholder="One thing we could add to make a diaspora investor feel more secure..."
                minRows={5}
                className="mt-2"
                classNames={{
                  input:
                    "text-main-text-headlines placeholder:text-muted-labels",
                  inputWrapper:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                }}
                {...register("investorLensText")}
                isInvalid={!!errors.investorLensText}
                errorMessage={errors.investorLensText?.message}
              />
            </div>

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                6. Future Interest <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                We’ll only notify you when we launch new high-yield property
                leads based on feedback from this study.
              </p>
              <Select
                disabled={selectDisabled}
                placeholder="Choose one option"
                className="mt-2"
                selectedKeys={[futureInterestValue ? "yes" : "no"]}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as "yes" | "no" | undefined;
                  if (v) {
                    clearErrors("futureInterest");
                    setValue("futureInterest", v === "yes", {
                      shouldValidate: true,
                    });
                  }
                }}
                classNames={{
                  trigger:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                  value: "text-main-text-headlines",
                }}
                isInvalid={!!errors.futureInterest}
                errorMessage={errors.futureInterest?.message}
              >
                <SelectItem key="yes" className="text-main-text-headlines">
                  Yes, keep me in the loop.
                </SelectItem>
                <SelectItem key="no" className="text-main-text-headlines">
                  No, thank you.
                </SelectItem>
              </Select>
            </div>

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                7. Which sections did you visit?{" "}
                <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                Select all that you explored during the 2–3 minutes before
                submitting.
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {SECTIONS_VISITED_OPTIONS.map((opt) => {
                  const checked = (watch("sectionsVisited") ?? []).includes(
                    opt.value,
                  );
                  return (
                    <Checkbox
                      key={opt.value}
                      isSelected={checked}
                      onValueChange={(next) => {
                        const current = (watch("sectionsVisited") ??
                          []) as SectionsVisitedChoice[];
                        const safeCurrent = Array.isArray(current)
                          ? current
                          : [];
                        const set = new Set(safeCurrent);
                        if (next) set.add(opt.value);
                        else set.delete(opt.value);
                        clearErrors("sectionsVisited");
                        setValue(
                          "sectionsVisited",
                          Array.from(set) as SectionsVisitedChoice[],
                          { shouldValidate: true },
                        );
                      }}
                      classNames={{ label: "text-sm text-main-text-headlines" }}
                    >
                      {opt.label}
                    </Checkbox>
                  );
                })}
              </div>
              {errors.sectionsVisited?.message ? (
                <p className="mt-2 text-sm text-red-300">
                  {errors.sectionsVisited.message}
                </p>
              ) : null}
            </div>

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                8. Likelihood to Invest{" "}
                <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                On a scale of{" "}
                <span className="font-semibold text-main-text-headlines">
                  1 to 10
                </span>
                , how likely are you to invest (or shortlist properties) after
                exploring?
              </p>
              <Select
                disabled={selectDisabled}
                placeholder="Choose a number (1-10)"
                className="mt-2"
                selectedKeys={
                  typeof watch("likelihoodToInvest") === "number"
                    ? [String(watch("likelihoodToInvest"))]
                    : []
                }
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as string | undefined;
                  const n = v ? Number(v) : undefined;
                  if (n != null && Number.isFinite(n) && n >= 1 && n <= 10) {
                    clearErrors("likelihoodToInvest");
                    setValue("likelihoodToInvest", n as LikelihoodToInvest, {
                      shouldValidate: true,
                    });
                  }
                }}
                classNames={{
                  trigger:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                  value: "text-main-text-headlines",
                }}
                isInvalid={!!errors.likelihoodToInvest}
                errorMessage={errors.likelihoodToInvest?.message}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <SelectItem
                    key={String(n)}
                    className="text-main-text-headlines"
                  >
                    {n}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-body font-semibold text-main-text-headlines">
                9. What’s missing most?{" "}
                <span className="text-primary-gold">*</span>
              </label>
              <p className="mt-2 text-sm text-secondary-text-body-paragraphs">
                If you could add one thing right now to increase confidence,
                what would it be?
              </p>
              <Textarea
                placeholder="Share what you expected to see (risk disclosure, legal docs, track record, due diligence steps, pricing transparency, etc.)"
                minRows={5}
                className="mt-2"
                classNames={{
                  input:
                    "text-main-text-headlines placeholder:text-muted-labels",
                  inputWrapper:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                }}
                {...register("missingMostText")}
                isInvalid={!!errors.missingMostText}
                errorMessage={errors.missingMostText?.message}
              />
            </div>

            <Button
              radius="none"
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="w-full bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state uppercase"
            >
              Submit
            </Button>

            <p className="text-xs text-muted-labels">
              By submitting, you agree that JESFEM may review and store your
              responses for product research.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

