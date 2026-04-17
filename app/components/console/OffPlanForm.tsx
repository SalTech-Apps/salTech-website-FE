import { useState, useRef, useEffect } from "react";
import { Button, Input, Textarea } from "@heroui/react";
import type { OffPlan } from "@/types/firestore";
import { IoCloseOutline, IoCloudUploadOutline, IoAddOutline } from "react-icons/io5";

export interface OffPlanFormData {
  title: string;
  slug: string;
  location: string;
  price: string;
  status: string;
  developer: string;
  apartmentType: string;
  completion: string;
  progress: number;
  beds: number;
  baths: number;
  garages: number;
  completionDate: string;
  features: string[];
  description: string;
  order: number;
}

interface OffPlanFormProps {
  initial?: Partial<OffPlan>;
  onSubmit: (data: OffPlanFormData, imageFile: File | null) => Promise<void>;
  submitLabel: string;
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const inputClasses = {
  input: "text-main-text-headlines",
  inputWrapper: "bg-main-background border border-soft-divider-line",
};

export function OffPlanForm({ initial, onSubmit, submitLabel }: OffPlanFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? (initial?.title ? toSlug(initial.title) : ""));
  const [location, setLocation] = useState(initial?.location ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [status, setStatus] = useState(initial?.status ?? "OFF-PLAN");
  const [developer, setDeveloper] = useState(initial?.developer ?? "");
  const [apartmentType, setApartmentType] = useState(initial?.apartmentType ?? "");
  const [completion, setCompletion] = useState(initial?.completion ?? "");
  const [progress, setProgress] = useState(initial?.progress ?? 0);
  const [beds, setBeds] = useState(String(initial?.beds ?? ""));
  const [baths, setBaths] = useState(String(initial?.baths ?? ""));
  const [garages, setGarages] = useState(String(initial?.garages ?? ""));
  const [completionDate, setCompletionDate] = useState(initial?.completionDate ?? "");
  const [features, setFeatures] = useState<string[]>(
    (initial?.features ?? []).length > 0 ? initial!.features! : [""]
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [order, setOrder] = useState(initial?.order ?? 0);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initial?.image ?? "");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImagePreview(initial?.image ?? "");
  }, [initial?.image]);

  useEffect(() => {
    if (!initial?.slug && title) setSlug(toSlug(title));
  }, [title, initial?.slug]);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function setFeatureAt(index: number, value: string) {
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function addFeature() {
    setFeatures((prev) => [...prev, ""]);
  }

  function removeFeature(index: number) {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const featuresList = features.map((f) => f.trim()).filter(Boolean);
      await onSubmit(
        {
          title,
          slug: slug || toSlug(title),
          location,
          price,
          status,
          developer,
          apartmentType,
          completion,
          progress,
          beds: parseInt(beds, 10) || 0,
          baths: parseInt(baths, 10) || 0,
          garages: parseInt(garages, 10) || 0,
          completionDate,
          features: featuresList,
          description,
          order,
        },
        imageFile
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-3xl">
      <section className="space-y-3">
        <label className="block text-sm font-semibold text-main-text-headlines">
          Cover Image
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="hidden"
        />
        {imagePreview ? (
          <div className="relative inline-block group">
            <img
              src={imagePreview}
              alt="Cover"
              className="h-52 w-full max-w-md rounded-xl object-cover border border-soft-divider-line shadow-sm"
            />
            <button
              type="button"
              onClick={() => {
                setImageFile(null);
                setImagePreview("");
              }}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-gold"
              aria-label="Remove cover image"
            >
              <IoCloseOutline size={18} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full max-w-md min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-soft-divider-line bg-main-background/50 text-muted-labels transition-colors hover:border-primary-gold/50 hover:bg-main-background/80 focus:outline-none focus:ring-2 focus:ring-primary-gold/30"
          >
            <div className="rounded-full bg-soft-divider-line/50 p-4">
              <IoCloudUploadOutline size={28} className="text-main-text-headlines" />
            </div>
            <span className="text-sm font-medium">Click to upload cover image</span>
            <span className="text-xs">PNG, JPG or WebP</span>
          </button>
        )}
      </section>

      <section className="space-y-5 rounded-xl border border-soft-divider-line bg-main-background/30 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-labels">
          Core Details
        </h3>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          classNames={inputClasses}
          isRequired
        />
        <Input
          label="Slug (URL-friendly)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={toSlug(title) || "auto-generated"}
          classNames={inputClasses}
        />
        <Input
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          classNames={inputClasses}
          isRequired
        />
        <Input
          label="Price (e.g. From ₦45,000,000)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          classNames={inputClasses}
          isRequired
        />
        <Input
          label="Status (e.g. OFF-PLAN, 65% COMPLETE)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          classNames={inputClasses}
        />
        <Input
          label="Developer"
          value={developer}
          onChange={(e) => setDeveloper(e.target.value)}
          classNames={inputClasses}
        />
        <Input
          label="Apartment Type (e.g. 1-3 Bed Apartments)"
          value={apartmentType}
          onChange={(e) => setApartmentType(e.target.value)}
          classNames={inputClasses}
        />
        <Input
          label="Expected Completion"
          value={completion}
          onChange={(e) => setCompletion(e.target.value)}
          placeholder="e.g. Q4 2025"
          classNames={inputClasses}
        />
        <Input
          label="Completion Year (e.g. 2025)"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
          classNames={inputClasses}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-main-text-headlines">
            Progress: {progress}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full accent-primary-gold"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Beds"
            type="number"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            classNames={inputClasses}
          />
          <Input
            label="Baths"
            type="number"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            classNames={inputClasses}
          />
          <Input
            label="Garages"
            type="number"
            value={garages}
            onChange={(e) => setGarages(e.target.value)}
            classNames={inputClasses}
          />
        </div>
        <Input
          label="Display Order (lower = first)"
          type="number"
          value={String(order)}
          onChange={(e) => setOrder(Number(e.target.value))}
          classNames={inputClasses}
        />
      </section>

      <section className="space-y-5 rounded-xl border border-soft-divider-line bg-main-background/30 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-labels">
          Features & Description
        </h3>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-main-text-headlines">
            Features
          </label>
          {features.map((value, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={value}
                onChange={(e) => setFeatureAt(index, e.target.value)}
                placeholder="e.g. Payment plan available"
                classNames={inputClasses}
                className="flex-1"
              />
              <Button
                type="button"
                isIconOnly
                radius="none"
                variant="light"
                color="danger"
                onPress={() => removeFeature(index)}
                isDisabled={features.length <= 1}
                aria-label="Remove feature"
                className="shrink-0"
              >
                <IoCloseOutline size={20} />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            radius="none"
            variant="bordered"
            startContent={<IoAddOutline size={18} />}
            onPress={addFeature}
            className="border-soft-divider-line text-muted-labels hover:border-primary-gold/40 hover:text-primary-gold"
          >
            Add feature
          </Button>
        </div>
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={4}
          classNames={{
            input: "text-main-text-headlines",
            inputWrapper: "bg-main-background border border-soft-divider-line",
          }}
        />
      </section>

      <div className="pt-2">
        <Button
          radius="none"
          type="submit"
          isLoading={saving}
          className="min-w-[140px] bg-primary-gold text-main-background font-semibold"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
