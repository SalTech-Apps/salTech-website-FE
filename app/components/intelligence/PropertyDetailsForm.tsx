import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z, flattenError } from "zod";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { IoArrowForwardOutline } from "react-icons/io5";

const formSchema = z.object({
  propertyType: z.string().min(1, "Please select a property type"),
  location: z.string().min(1, "Please select an area"),
  bedrooms: z.string().min(1, "Please select bedrooms"),
  sizeSqm: z.string().min(1, "Size is required"),
  purchasePrice: z.string().min(1, "Purchase price is required"),
  investmentHorizon: z.string().min(1, "Please select a period"),
  investmentGoal: z.enum(["rent", "resell"]),
  offPlan: z.enum(["yes", "no"]),
});

export type PropertyDetailsValues = z.infer<typeof formSchema>;

const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "duplex", label: "Duplex" },
  { value: "terraced", label: "Terraced" },
  { value: "detached", label: "Detached" },
  { value: "semi-detached", label: "Semi-Detached" },
];

const LOCATIONS = [
  // --- Island Prime ---
  { value: "banana-island", label: "Banana Island, Lagos" },
  { value: "ikoyi", label: "Ikoyi, Lagos" },
  { value: "eko-atlantic", label: "Eko Atlantic City, Lagos" },
  { value: "victoria-island", label: "Victoria Island, Lagos" },
  { value: "oniru", label: "Oniru, Lagos" },
  { value: "lekki-phase-1", label: "Lekki Phase 1, Lagos" },

  // --- Mainland Prime ---
  { value: "ikeja-gra", label: "Ikeja GRA, Lagos" },
  { value: "magodo-phase-2", label: "Magodo Phase 2, Lagos" },
  { value: "omole-phase-2", label: "Omole Phase 2, Lagos" },
  { value: "ogudu", label: "Ogudu, Lagos" },

  // --- Mid-Market & Tech Hubs ---
  { value: "yaba", label: "Yaba, Lagos" },
  { value: "gbagada", label: "Gbagada, Lagos" },
  { value: "surulere", label: "Surulere, Lagos" },
  { value: "maryland", label: "Maryland, Lagos" },
  { value: "ogba", label: "Ogba, Lagos" },

  // --- Growth & Emerging Corridors ---
  { value: "lekki", label: "Lekki (General Axis), Lagos" },
  { value: "ajah", label: "Ajah, Lagos" },
  { value: "sangotedo", label: "Sangotedo, Lagos" },
  { value: "ibeju-lekki", label: "Ibeju-Lekki, Lagos" },
  { value: "epe", label: "Epe, Lagos" },
  { value: "ikorodu", label: "Ikorodu, Lagos" },

  // --- Others ---
  { value: "festac", label: "Festac Town, Lagos" },
  { value: "ipaja", label: "Ipaja, Lagos" },
  { value: "apapa", label: "Apapa, Lagos" },
];

const BEDROOMS = [
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedroom" },
  { value: "3", label: "3 Bedroom" },
  { value: "4", label: "4 Bedroom" },
  { value: "5+", label: "5+ Bedroom" },
];

const HORIZONS = [
  { value: "short", label: "Short Term (1-3 Years)" },
  { value: "medium", label: "Medium Term (3-5 Years)" },
  { value: "long", label: "Long Term (5+ Years)" },
];

const inputWrapperClass =
  "bg-secondary-background border border-soft-divider-line hover:border-primary-gold/40 data-[hover=true]:border-primary-gold/40";

export interface PropertyDetailsFormProps {
  onSubmit: (data: PropertyDetailsValues) => void;
  isSubmitting?: boolean;
  /** Fires when any field changes — used for live report preview. */
  onValuesChange?: (values: PropertyDetailsValues) => void;
}

export function PropertyDetailsForm({
  onSubmit: onSubmitProp,
  isSubmitting = false,
  onValuesChange,
}: PropertyDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<PropertyDetailsValues>({
    defaultValues: {
      propertyType: "",
      location: "",
      bedrooms: "",
      sizeSqm: "",
      purchasePrice: "",
      investmentHorizon: "",
      investmentGoal: "rent",
      offPlan: "no",
    },
  });

  const propertyType = watch("propertyType");
  const location = watch("location");
  const bedrooms = watch("bedrooms");
  const sizeSqm = watch("sizeSqm");
  const purchasePrice = watch("purchasePrice");
  const investmentHorizon = watch("investmentHorizon");
  const investmentGoal = watch("investmentGoal");
  const offPlan = watch("offPlan");

  useEffect(() => {
    onValuesChange?.({
      propertyType,
      location,
      bedrooms,
      sizeSqm,
      purchasePrice,
      investmentHorizon,
      investmentGoal,
      offPlan,
    });
  }, [
    propertyType,
    location,
    bedrooms,
    sizeSqm,
    purchasePrice,
    investmentHorizon,
    investmentGoal,
    offPlan,
    onValuesChange,
  ]);

  function onSubmit(data: PropertyDetailsValues) {
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const flattened = flattenError(result.error);
      Object.entries(flattened.fieldErrors).forEach(([field, messages]) => {
        const msg = messages?.[0];
        if (msg)
          setError(field as keyof PropertyDetailsValues, {
            type: "manual",
            message: msg,
          });
      });
      return;
    }
    clearErrors();
    onSubmitProp(result.data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <div>
        <label className="block text-buttons uppercase tracking-wider text-muted-labels">
          Property Type
        </label>
        <Select
          placeholder="Select Type"
          className="mt-2"
          classNames={{
            trigger: inputWrapperClass,
            value: "text-main-text-headlines",
          }}
          selectedKeys={propertyType ? [propertyType] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            setValue("propertyType", v ?? "", { shouldValidate: true });
          }}
          isInvalid={!!errors.propertyType}
          errorMessage={errors.propertyType?.message}
        >
          {PROPERTY_TYPES.map((opt) => (
            <SelectItem key={opt.value} className="text-main-text-headlines">
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-buttons uppercase tracking-wider text-muted-labels">
          Location (Area)
        </label>
        <Select
          placeholder="Select Area"
          className="mt-2"
          classNames={{
            trigger: inputWrapperClass,
            value: "text-main-text-headlines",
          }}
          selectedKeys={location ? [location] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            setValue("location", v ?? "", { shouldValidate: true });
          }}
          isInvalid={!!errors.location}
          errorMessage={errors.location?.message}
        >
          {LOCATIONS.map((opt) => (
            <SelectItem key={opt.value} className="text-main-text-headlines">
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-buttons uppercase tracking-wider text-muted-labels">
          Bedrooms
        </label>
        <Select
          placeholder="Select Bedrooms"
          className="mt-2"
          classNames={{
            trigger: inputWrapperClass,
            value: "text-main-text-headlines",
          }}
          selectedKeys={bedrooms ? [bedrooms] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            setValue("bedrooms", v ?? "", { shouldValidate: true });
          }}
          isInvalid={!!errors.bedrooms}
          errorMessage={errors.bedrooms?.message}
        >
          {BEDROOMS.map((opt) => (
            <SelectItem key={opt.value} className="text-main-text-headlines">
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-buttons uppercase tracking-wider text-muted-labels">
          Size (SQM)
        </label>
        <Input
          type="text"
          placeholder="e.g. 250"
          className="mt-2"
          classNames={{
            input: "text-main-text-headlines placeholder:text-muted-labels",
            inputWrapper: inputWrapperClass,
          }}
          {...register("sizeSqm")}
          isInvalid={!!errors.sizeSqm}
          errorMessage={errors.sizeSqm?.message}
        />
      </div>

      <div>
        <label className="block text-buttons uppercase tracking-wider text-muted-labels">
          Purchase Price (N)
        </label>
        <Input
          type="text"
          placeholder="e.g. 150000000"
          className="mt-2"
          classNames={{
            input: "text-main-text-headlines placeholder:text-muted-labels",
            inputWrapper: inputWrapperClass,
          }}
          {...register("purchasePrice")}
          isInvalid={!!errors.purchasePrice}
          errorMessage={errors.purchasePrice?.message}
        />
      </div>

      <div>
        <label className="block text-buttons uppercase tracking-wider text-muted-labels">
          Investment Horizon
        </label>
        <Select
          placeholder="Select Period"
          className="mt-2"
          classNames={{
            trigger: inputWrapperClass,
            value: "text-main-text-headlines",
          }}
          selectedKeys={investmentHorizon ? [investmentHorizon] : []}
          onSelectionChange={(keys) => {
            const v = Array.from(keys)[0] as string;
            setValue("investmentHorizon", v ?? "", { shouldValidate: true });
          }}
          isInvalid={!!errors.investmentHorizon}
          errorMessage={errors.investmentHorizon?.message}
        >
          {HORIZONS.map((opt) => (
            <SelectItem key={opt.value} className="text-main-text-headlines">
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-buttons uppercase tracking-wider text-muted-labels mb-2">
          Investment Goal
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setValue("investmentGoal", "rent", { shouldValidate: true })
            }
            className={`flex-1 border px-4 py-3 text-buttons transition-colors ${
              investmentGoal === "rent"
                ? "border-primary-gold bg-primary-gold text-main-background hover:bg-soft-gold-hover-state"
                : "border-soft-divider-line bg-secondary-background text-secondary-text-body-paragraphs hover:border-soft-divider-line/80"
            }`}
          >
            RENT OUT
          </button>
          <button
            type="button"
            onClick={() =>
              setValue("investmentGoal", "resell", { shouldValidate: true })
            }
            className={`flex-1 border px-4 py-3 text-buttons transition-colors ${
              investmentGoal === "resell"
                ? "border-primary-gold bg-primary-gold text-main-background hover:bg-soft-gold-hover-state"
                : "border-soft-divider-line bg-secondary-background text-secondary-text-body-paragraphs hover:border-soft-divider-line/80"
            }`}
          >
            RESELL
          </button>
        </div>
      </div>

      <div>
        <label className="block text-buttons uppercase tracking-wider text-muted-labels mb-2">
          Is This Off-Plan?
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue("offPlan", "yes", { shouldValidate: true })}
            className={`flex-1 border px-4 py-3 text-buttons transition-colors ${
              offPlan === "yes"
                ? "border-primary-gold bg-primary-gold text-main-background hover:bg-soft-gold-hover-state"
                : "border-soft-divider-line bg-secondary-background text-secondary-text-body-paragraphs hover:border-soft-divider-line/80"
            }`}
          >
            YES
          </button>
          <button
            type="button"
            onClick={() => setValue("offPlan", "no", { shouldValidate: true })}
            className={`flex-1 border px-4 py-3 text-buttons transition-colors ${
              offPlan === "no"
                ? "border-primary-gold bg-primary-gold text-main-background hover:bg-soft-gold-hover-state"
                : "border-soft-divider-line bg-secondary-background text-secondary-text-body-paragraphs hover:border-soft-divider-line/80"
            }`}
          >
            NO
          </button>
        </div>
      </div>

      <Button
        radius="none"
        type="submit"
        size="lg"
        isLoading={isSubmitting}
        className="w-full bg-primary-gold font-body font-bold text-main-background hover:bg-soft-gold-hover-state uppercase mt-2"
        endContent={<IoArrowForwardOutline className="h-5 w-5" />}
      >
        Generate Investment Report
      </Button>
    </form>
  );
}
