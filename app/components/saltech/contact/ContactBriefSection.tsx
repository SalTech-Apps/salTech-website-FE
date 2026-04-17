import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z, flattenError } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { FaArrowRight, FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import toast from "react-hot-toast";
import { db, functions, httpsCallable } from "@/lib/firebase.client";
import {
  BUDGET_OPTIONS,
  BUILD_OPTIONS,
  QUICK_ANSWERS,
  ROLE_OPTIONS,
  SALTECH_CONTACT,
  TIMELINE_OPTIONS,
} from "@/data/contactPage";

const briefSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().min(1, "Company or project name is required"),
  role: z.string().min(1, "Please select your role"),
  build: z.string().min(1, "Please select an option"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range or “Prefer not to say”"),
  message: z.string().min(1, "Tell us a bit about your project"),
});

type BriefFormValues = z.infer<typeof briefSchema>;

const inputSurfaceClassNames = {
  input: "text-[#111827] placeholder:text-gray-400 text-sm",
  inputWrapper:
    "bg-[#f9fafb] border border-[#e5e7eb] shadow-none hover:border-[#d1d5db] data-[hover=true]:border-[#d1d5db] h-10 min-h-10 rounded-lg",
};

const selectSurfaceClassNames = {
  trigger:
    "bg-[#f9fafb] border border-[#e5e7eb] shadow-none hover:border-[#d1d5db] data-[hover=true]:border-[#d1d5db] h-10 min-h-10 rounded-lg",
  value: "text-[#111827] text-sm",
};

function labelClass(id: string, children: ReactNode) {
  return (
    <label
      htmlFor={id}
      className="text-xs font-medium text-[#374151]"
    >
      {children}
    </label>
  );
}

export function ContactBriefSection() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<BriefFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      role: "",
      build: "",
      timeline: "asap",
      budget: "unspecified",
      message: "",
    },
  });

  const role = watch("role");
  const build = watch("build");
  const timeline = watch("timeline");
  const budget = watch("budget");

  async function onSubmit(data: BriefFormValues) {
    const parsed = briefSchema.safeParse(data);
    if (!parsed.success) {
      const flattened = flattenError(parsed.error);
      Object.entries(flattened.fieldErrors).forEach(([field, messages]) => {
        const msg = messages?.[0];
        if (msg) setError(field as keyof BriefFormValues, { type: "manual", message: msg });
      });
      return;
    }
    clearErrors();

    const lines = [
      `Company / project: ${data.company}`,
      `Role: ${ROLE_OPTIONS.find((r) => r.value === data.role)?.label ?? data.role}`,
      `Looking to build: ${BUILD_OPTIONS.find((b) => b.value === data.build)?.label ?? data.build}`,
      `Timeline: ${TIMELINE_OPTIONS.find((t) => t.value === data.timeline)?.label ?? data.timeline}`,
      `Budget: ${BUDGET_OPTIONS.find((b) => b.value === data.budget)?.label ?? data.budget}`,
      "",
      data.message,
    ];

    try {
      await addDoc(collection(db, "consultations"), {
        fullName: data.fullName,
        email: data.email,
        phone: "—",
        subject: "SalTech — Project brief",
        message: lines.join("\n"),
        createdAt: serverTimestamp(),
      });
      try {
        const sendNotification = httpsCallable<
          { fullName: string; email: string; phone: string; subject: string; message: string },
          { success: boolean }
        >(functions, "sendContactFormNotification");
        await sendNotification({
          fullName: data.fullName,
          email: data.email,
          phone: "—",
          subject: "SalTech — Project brief",
          message: lines.join("\n"),
        });
      } catch (notifyErr) {
        console.warn("Admin notification failed:", notifyErr);
      }
      toast.success("Brief sent. We'll reply within one business day.");
      reset({
        fullName: "",
        email: "",
        company: "",
        role: "",
        build: "",
        timeline: "asap",
        budget: "unspecified",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6 text-[#111827]">
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-[28px] sm:leading-snug">
                We respond within one business day.
              </h2>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#6b7280]">
                Every inquiry is reviewed by a real person. If your project is a
                fit, we&apos;ll schedule a 30-minute call — no pitch, no pressure.
              </p>
            </div>

            <ul className="flex flex-col gap-5">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-primary-gold">
                  <FaEnvelope className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#374151]">Email</p>
                  <a
                    className="text-xs text-[#374151]/70 underline-offset-2 hover:underline"
                    href={`mailto:${SALTECH_CONTACT.email}`}
                  >
                    {SALTECH_CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-primary-gold">
                  <FaPhone className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#374151]">Phone</p>
                  <a
                    className="text-xs text-[#374151]/70 underline-offset-2 hover:underline"
                    href={`tel:${SALTECH_CONTACT.phoneE164}`}
                  >
                    {SALTECH_CONTACT.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-primary-gold">
                  <FaMapMarkerAlt className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#374151]">Office</p>
                  <p className="text-xs leading-relaxed text-[#374151]/70">
                    {SALTECH_CONTACT.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            </ul>

            <blockquote className="rounded-2xl bg-[#faf3dc] p-4 text-[#111827]">
              <p className="text-sm font-medium leading-relaxed">
                &ldquo;SalTech turned our idea into a working product in six
                weeks. Clear process, zero surprises.&rdquo;
              </p>
              <footer className="mt-2 text-xs text-[#6b7280]">
                — Founder, Fintech Startup (US)
              </footer>
            </blockquote>

            <div>
              <p className="text-sm font-semibold text-[#374151]">
                Quick answers
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[#6b7280]">
                {QUICK_ANSWERS.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-primary-gold" aria-hidden>
                      ⁘
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[20px] bg-white p-6 shadow-sm ring-1 ring-[#e5e7eb] lg:p-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-semibold text-[#111827]">
                Send us your brief
              </h2>
              <p className="mt-2 flex items-center gap-2 text-base text-[#6b7280]">
                <FaClock className="h-4 w-4 shrink-0 text-[#6b7280]" aria-hidden />
                Average response: 4 hours during business days
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  {labelClass("brief-fullName", "Full Name")}
                  <Input
                    id="brief-fullName"
                    placeholder="Your name"
                    {...register("fullName")}
                    isInvalid={!!errors.fullName}
                    errorMessage={errors.fullName?.message}
                    classNames={inputSurfaceClassNames}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  {labelClass("brief-email", "Email Address")}
                  <Input
                    id="brief-email"
                    type="email"
                    placeholder="you@company.com"
                    {...register("email")}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    classNames={inputSurfaceClassNames}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  {labelClass("brief-company", "Company / Project Name")}
                  <Input
                    id="brief-company"
                    placeholder="Acme Inc."
                    {...register("company")}
                    isInvalid={!!errors.company}
                    errorMessage={errors.company?.message}
                    classNames={inputSurfaceClassNames}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  {labelClass("brief-role", "Your Role")}
                  <Select
                    id="brief-role"
                    placeholder="Select role"
                    selectedKeys={role ? [role] : []}
                    onSelectionChange={(keys) => {
                      const v = Array.from(keys)[0] as string;
                      setValue("role", v ?? "", { shouldValidate: true });
                    }}
                    isInvalid={!!errors.role}
                    errorMessage={errors.role?.message}
                    classNames={selectSurfaceClassNames}
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} textValue={opt.label}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {labelClass("brief-build", "What are you looking to build?")}
                <Select
                  id="brief-build"
                  placeholder="Select an option"
                  selectedKeys={build ? [build] : []}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as string;
                    setValue("build", v ?? "", { shouldValidate: true });
                  }}
                  isInvalid={!!errors.build}
                  errorMessage={errors.build?.message}
                  classNames={selectSurfaceClassNames}
                >
                  {BUILD_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} textValue={opt.label}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  {labelClass("brief-timeline", "Timeline")}
                  <Select
                    id="brief-timeline"
                    placeholder="Timeline"
                    selectedKeys={timeline ? [timeline] : []}
                    onSelectionChange={(keys) => {
                      const v = Array.from(keys)[0] as string;
                      setValue("timeline", v ?? "", { shouldValidate: true });
                    }}
                    isInvalid={!!errors.timeline}
                    errorMessage={errors.timeline?.message}
                    classNames={selectSurfaceClassNames}
                  >
                    {TIMELINE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} textValue={opt.label}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  {labelClass("brief-budget", "Budget (Optional)")}
                  <Select
                    id="brief-budget"
                    placeholder="Prefer not to say"
                    selectedKeys={budget ? [budget] : []}
                    onSelectionChange={(keys) => {
                      const v = Array.from(keys)[0] as string;
                      setValue("budget", v ?? "", { shouldValidate: true });
                    }}
                    isInvalid={!!errors.budget}
                    errorMessage={errors.budget?.message}
                    classNames={selectSurfaceClassNames}
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} textValue={opt.label}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {labelClass("brief-message", "Tell us about your project")}
                <Textarea
                  id="brief-message"
                  minRows={4}
                  placeholder={`E.g. We're building a logistics platform for SMEs in West Africa and need an MVP in 10 weeks.`}
                  {...register("message")}
                  isInvalid={!!errors.message}
                  errorMessage={errors.message?.message}
                  classNames={{
                    input:
                      "text-[#111827] placeholder:text-gray-400 text-sm min-h-[80px]",
                    inputWrapper:
                      "bg-[#f9fafb] border border-[#e5e7eb] shadow-none hover:border-[#d1d5db] rounded-lg",
                  }}
                />
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  radius="md"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full bg-primary-gold font-body font-semibold text-[#111827] hover:bg-soft-gold-hover-state"
                  endContent={<FaArrowRight className="text-sm" aria-hidden />}
                >
                  Send My Brief
                </Button>
                <p className="mt-3 text-center text-xs text-[#9ca3af]">
                  No commitment. No spam. Just a real conversation.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
