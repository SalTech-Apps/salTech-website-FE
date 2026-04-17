import { useForm } from "react-hook-form";
import { z, flattenError } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, Input, Textarea } from "@heroui/react";
import { db } from "@/lib/firebase.client";
import { REVIEW_TEXT_MAX_LENGTH } from "@/lib/reviews";
import toast from "react-hot-toast";

const formSchema = z.object({
  authorName: z.string().min(1, "Name is required").max(120, "Name is too long"),
  role: z.string().max(120, "Too long").optional(),
  text: z
    .string()
    .min(10, "Please write at least a few sentences (10+ characters)")
    .max(REVIEW_TEXT_MAX_LENGTH, `Review must be ${REVIEW_TEXT_MAX_LENGTH} characters or fewer`),
});

type FormValues = z.infer<typeof formSchema>;

export function ReviewFormSection() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      authorName: "",
      role: "",
      text: "",
    },
  });

  const textLen = watch("text")?.length ?? 0;

  async function onSubmit(data: FormValues) {
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const flattened = flattenError(result.error);
      Object.entries(flattened.fieldErrors).forEach(([field, messages]) => {
        const msg = messages?.[0];
        if (msg) setError(field as keyof FormValues, { type: "manual", message: msg });
      });
      return;
    }
    clearErrors();
    const roleTrimmed = data.role?.trim();
    try {
      await addDoc(collection(db, "reviews"), {
        text: data.text.trim(),
        authorName: data.authorName.trim(),
        ...(roleTrimmed ? { role: roleTrimmed } : {}),
        moderationStatus: "pending",
        createdAt: serverTimestamp(),
      });
      toast.success(
        "Thank you. Your review was submitted and will appear on the homepage after our team approves it.",
      );
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Could not submit your review. Please try again.");
    }
  }

  return (
    <section className="border-t border-soft-divider-line bg-secondary-background py-16 sm:py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-heading-h3 text-main-text-headlines text-center mb-2">
          Submit your review
        </h2>
        <p className="text-body text-secondary-text-body-paragraphs text-center mb-10">
          Share your experience with our investment platform. After you submit, our team will review
          it before it may appear on the homepage.
        </p>
        <div className="bg-main-background border border-soft-divider-line p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
            <div>
              <label
                htmlFor="review-authorName"
                className="block text-body font-semibold text-main-text-headlines"
              >
                Your name <span className="text-primary-gold">*</span>
              </label>
              <Input
                id="review-authorName"
                type="text"
                placeholder="Your full name"
                className="mt-2"
                classNames={{
                  input: "text-main-text-headlines placeholder:text-muted-labels",
                  inputWrapper:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                }}
                {...register("authorName")}
                isInvalid={!!errors.authorName}
                errorMessage={errors.authorName?.message}
              />
            </div>

            <div>
              <label htmlFor="review-role" className="block text-body font-semibold text-main-text-headlines">
                Role or title <span className="text-muted-labels font-normal">(optional)</span>
              </label>
              <Input
                id="review-role"
                type="text"
                placeholder="e.g. Real estate investor"
                className="mt-2"
                classNames={{
                  input: "text-main-text-headlines placeholder:text-muted-labels",
                  inputWrapper:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                }}
                {...register("role")}
                isInvalid={!!errors.role}
                errorMessage={errors.role?.message}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label
                  htmlFor="review-text"
                  className="block text-body font-semibold text-main-text-headlines"
                >
                  Your review <span className="text-primary-gold">*</span>
                </label>
                <span
                  className={`text-xs tabular-nums ${
                    textLen > REVIEW_TEXT_MAX_LENGTH
                      ? "font-semibold text-red-400"
                      : "text-muted-labels"
                  }`}
                >
                  {textLen} / {REVIEW_TEXT_MAX_LENGTH}
                </span>
              </div>
              <Textarea
                id="review-text"
                placeholder="Tell us about your experience with JESFEM..."
                minRows={5}
                maxLength={REVIEW_TEXT_MAX_LENGTH}
                className="mt-2"
                classNames={{
                  input: "text-main-text-headlines placeholder:text-muted-labels",
                  inputWrapper:
                    "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                }}
                {...register("text")}
                isInvalid={!!errors.text}
                errorMessage={errors.text?.message}
              />
              <p className="mt-1.5 text-xs text-muted-labels">
                Minimum 10 characters. Homepage testimonials are short—aim for a concise summary.
              </p>
            </div>

            <Button
              radius="none"
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="w-full bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state uppercase"
            >
              Submit review
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
