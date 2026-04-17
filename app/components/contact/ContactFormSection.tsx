import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z, flattenError } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, Input, Textarea, Select, SelectItem } from "@heroui/react";
import { db, functions, httpsCallable } from "@/lib/firebase.client";
import { getSiteConfig } from "@/lib/siteConfig";
import { hasSocialMediaLinks, SocialMediaLinks } from "@/components/common";
import type { SiteConfig } from "@/types/firestore";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

const SUBJECT_OPTIONS = [
  { value: "buying", label: "Buying a property" },
  { value: "investing", label: "Investing / Off-plan" },
  { value: "rentals", label: "Rentals" },
  { value: "management", label: "Property management" },
  { value: "general", label: "General enquiry" },
];

export function ContactFormSection() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    getSiteConfig()
      .then((c) => setSiteConfig(c))
      .catch(() => setSiteConfig(null));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const subjectValue = watch("subject");

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
    try {
      await addDoc(collection(db, "consultations"), {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
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
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        });
      } catch (notifyErr) {
        console.warn("Admin notification failed:", notifyErr);
      }
      toast.success("Message sent. We'll get back to you soon.");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
      throw err;
    }
  }

  return (
    <section className="border-t border-soft-divider-line bg-main-background py-16 sm:py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 bg-secondary-background p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
          noValidate
        >
          {hasSocialMediaLinks(siteConfig) && (
            <div className="flex flex-col items-center gap-3 border-b border-soft-divider-line pb-6">
              <p className="text-xs font-body font-semibold uppercase tracking-wider text-main-text-headlines">
                Connect with us
              </p>
              <SocialMediaLinks
                siteConfig={siteConfig}
                className="flex flex-wrap items-center justify-center gap-4"
                iconSize={26}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="fullName"
              className="block text-body font-semibold text-main-text-headlines"
            >
              Full name <span className="text-primary-gold">*</span>
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="john doe"
              className="mt-2"
              classNames={{
                input: "text-main-text-headlines placeholder:text-muted-labels",
                inputWrapper:
                  "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
              }}
              {...register("fullName")}
              isInvalid={!!errors.fullName}
              errorMessage={errors.fullName?.message}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-body font-semibold text-main-text-headlines"
            >
              Email Address <span className="text-primary-gold">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              className="mt-2"
              classNames={{
                input: "text-main-text-headlines placeholder:text-muted-labels",
                inputWrapper:
                  "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
              }}
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-body font-semibold text-main-text-headlines"
            >
              Phone Number <span className="text-primary-gold">*</span>
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+234 000 000 0000"
              className="mt-2"
              classNames={{
                input: "text-main-text-headlines placeholder:text-muted-labels",
                inputWrapper:
                  "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
              }}
              {...register("phone")}
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-body font-semibold text-main-text-headlines"
            >
              Subject of the Request{" "}
              <span className="text-primary-gold">*</span>
            </label>
            <Select
              id="subject"
              placeholder="Select one..."
              className="mt-2"
              classNames={{
                trigger:
                  "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
                value: "text-main-text-headlines",
              }}
              selectedKeys={subjectValue ? [subjectValue] : []}
              onSelectionChange={(keys) => {
                const v = Array.from(keys)[0] as string;
                setValue("subject", v ?? "", { shouldValidate: true });
              }}
              isInvalid={!!errors.subject}
              errorMessage={errors.subject?.message}
            >
              {SUBJECT_OPTIONS.map((opt) => (
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
            <label
              htmlFor="message"
              className="block text-body font-semibold text-main-text-headlines"
            >
              Message <span className="text-primary-gold">*</span>
            </label>
            <Textarea
              id="message"
              placeholder="Hello there..."
              minRows={5}
              className="mt-2"
              classNames={{
                input: "text-main-text-headlines placeholder:text-muted-labels",
                inputWrapper:
                  "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40",
              }}
              {...register("message")}
              isInvalid={!!errors.message}
              errorMessage={errors.message?.message}
            />
          </div>

          <Button
            radius="none"
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state uppercase"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
