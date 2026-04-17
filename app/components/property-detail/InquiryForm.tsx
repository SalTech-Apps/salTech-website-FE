import { useForm } from "react-hook-form";
import { z, flattenError } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, Input } from "@heroui/react";
import { db, functions, httpsCallable } from "@/lib/firebase.client";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface InquiryFormProps {
  title: string;
  submitLabel: string;
  /** Property name to include in the message (e.g. for admin notification). */
  propertyName?: string;
  /** Path to the property page (e.g. "/properties/123"). Used to build full URL in message. */
  propertyPath?: string;
}

export function InquiryForm({
  title,
  submitLabel,
  propertyName,
  propertyPath,
}: InquiryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

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

    let message = data.message.trim();
    if (propertyName || propertyPath) {
      const fullUrl =
        typeof window !== "undefined" && propertyPath
          ? `${window.location.origin}${propertyPath.startsWith("/") ? propertyPath : `/${propertyPath}`}`
          : propertyPath ?? "";
      message += `\n\n---\nProperty: ${propertyName ?? "—"}\nURL: ${fullUrl}`;
    }

    try {
      await addDoc(collection(db, "consultations"), {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: "property-inquiry",
        message,
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
          subject: "property-inquiry",
          message,
        });
      } catch (notifyErr) {
        console.warn("Admin notification failed:", notifyErr);
      }
      toast.success("Enquiry sent. We'll get back to you soon.");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send enquiry. Please try again.");
      throw err;
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h3 className="font-heading text-heading-h3 text-main-text-headlines">
        {title}
      </h3>
      <Input
        label="Full name"
        labelPlacement="outside"
        placeholder="Full name*"
        isRequired
        isInvalid={!!errors.fullName}
        errorMessage={errors.fullName?.message}
        classNames={{
          input: "text-main-text-headlines placeholder:text-muted-labels",
          inputWrapper:
            "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40",
          label: "text-secondary-text-body-paragraphs",
        }}
        {...register("fullName")}
      />
      <Input
        type="email"
        label="Email"
        labelPlacement="outside"
        placeholder="Email Address*"
        isRequired
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        classNames={{
          input: "text-main-text-headlines placeholder:text-muted-labels",
          inputWrapper:
            "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40",
          label: "text-secondary-text-body-paragraphs",
        }}
        {...register("email")}
      />
      <Input
        type="tel"
        label="Phone"
        labelPlacement="outside"
        placeholder="Phone Number*"
        isRequired
        isInvalid={!!errors.phone}
        errorMessage={errors.phone?.message}
        classNames={{
          input: "text-main-text-headlines placeholder:text-muted-labels",
          inputWrapper:
            "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40",
          label: "text-secondary-text-body-paragraphs",
        }}
        {...register("phone")}
      />
      <div>
        <label className="mb-1.5 block text-body text-secondary-text-body-paragraphs">
          Message
        </label>
        <textarea
          placeholder="Message*"
          rows={4}
          className="w-full border border-soft-divider-line bg-secondary-background px-3 py-2 text-main-text-headlines placeholder:text-muted-labels focus:border-primary-gold/60 focus:outline-none"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-danger">{errors.message.message}</p>
        )}
      </div>
      <Button
        radius="none"
        type="submit"
        isLoading={isSubmitting}
        className="w-full bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state uppercase"
      >
        {submitLabel}
      </Button>
    </form>
  );
}
