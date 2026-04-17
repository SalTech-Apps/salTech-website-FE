import { useForm } from "react-hook-form";
import { z, flattenError } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { db } from "@/lib/firebase.client";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface OffPlanWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  offPlanId: string;
  offPlanTitle: string;
}

export function OffPlanWishlistModal({
  isOpen,
  onClose,
  offPlanId,
  offPlanTitle,
}: OffPlanWishlistModalProps) {
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

    try {
      await addDoc(collection(db, "offPlanWishlist"), {
        offPlanId,
        offPlanTitle,
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        createdAt: serverTimestamp(),
      });
      toast.success("Added to wishlist. We'll keep you updated!");
      reset();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist. Please try again.");
      throw err;
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: "bg-secondary-background border border-soft-divider-line",
        header: "border-b border-soft-divider-line",
        body: "py-6",
        footer: "border-t border-soft-divider-line",
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <h3 className="font-heading text-heading-h3 text-main-text-headlines">
              Add to Wishlist
            </h3>
            <p className="text-sm font-normal text-secondary-text-body-paragraphs mt-1">
              {offPlanTitle}
            </p>
          </ModalHeader>
          <ModalBody>
            <p className="text-body text-secondary-text-body-paragraphs mb-4">
              Enter your details to save this property to your wishlist. We'll notify you about updates.
            </p>
            <div className="space-y-4">
              <Input
                label="Full name"
                labelPlacement="outside"
                placeholder="Your name"
                isRequired
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName?.message}
                classNames={{
                  input: "text-main-text-headlines placeholder:text-muted-labels",
                  inputWrapper:
                    "bg-main-background border border-soft-divider-line hover:border-primary-gold/40",
                  label: "text-secondary-text-body-paragraphs",
                }}
                {...register("fullName")}
              />
              <Input
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="your@email.com"
                isRequired
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                classNames={{
                  input: "text-main-text-headlines placeholder:text-muted-labels",
                  inputWrapper:
                    "bg-main-background border border-soft-divider-line hover:border-primary-gold/40",
                  label: "text-secondary-text-body-paragraphs",
                }}
                {...register("email")}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              radius="none"
              variant="bordered"
              className="border-soft-divider-line text-main-text-headlines"
              onPress={onClose}
              type="button"
              isDisabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              radius="none"
              type="submit"
              isLoading={isSubmitting}
              className="bg-primary-gold text-main-background font-body font-bold hover:bg-soft-gold-hover-state uppercase"
            >
              Add to Wishlist
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
