import { useState, useRef, useEffect } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import type { Project } from "@/types/firestore";
import { IoCloseOutline, IoCloudUploadOutline } from "react-icons/io5";

export interface ProjectFormData {
  title: string;
  location: string;
  type: string;
  status: "completed" | "ongoing";
  yearCompleted: string;
  expectedCompletion: string;
  progressPercent: number;
  description: string;
  order: number;
}

interface ProjectFormProps {
  initial?: Partial<Project>;
  onSubmit: (data: ProjectFormData, imageFile: File | null) => Promise<void>;
  submitLabel: string;
}

const PROJECT_TYPES = [
  "Residential Development",
  "Luxury Apartments",
  "Mixed-Use Development",
  "Commercial Development",
  "Office Complex",
  "Retail Development",
  "Industrial Development",
] as const;

const inputClasses = {
  input: "text-main-text-headlines",
  inputWrapper: "bg-main-background border border-soft-divider-line",
};

export function ProjectForm({ initial, onSubmit, submitLabel }: ProjectFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [type, setType] = useState(initial?.type ?? "");
  const [status, setStatus] = useState<"completed" | "ongoing">(
    initial?.status ?? "completed"
  );
  const [yearCompleted, setYearCompleted] = useState(initial?.yearCompleted ?? "");
  const [expectedCompletion, setExpectedCompletion] = useState(
    initial?.expectedCompletion ?? ""
  );
  const [progressPercent, setProgressPercent] = useState<number>(
    initial?.progressPercent ?? 0
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [order, setOrder] = useState<number>(initial?.order ?? 0);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initial?.image ?? "");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImagePreview(initial?.image ?? "");
  }, [initial?.image]);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(
        {
          title,
          location,
          type,
          status,
          yearCompleted,
          expectedCompletion,
          progressPercent,
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
      {/* Cover Image */}
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

      {/* Core details */}
      <section className="space-y-5 rounded-xl border border-soft-divider-line bg-main-background/30 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-labels">
          Project Details
        </h3>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          classNames={inputClasses}
          isRequired
        />
        <Input
          label="Location (e.g. Lekki, Phase 1)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          classNames={inputClasses}
          isRequired
        />
        <Input
          label="Type (e.g. 15-Unit Residential Development)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Select or type a project type"
          classNames={inputClasses}
          list="project-types"
          isRequired
        />
        <datalist id="project-types">
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>
        <Select
          label="Status"
          selectedKeys={[status]}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as "completed" | "ongoing";
            if (val) setStatus(val);
          }}
          classNames={{
            trigger: "bg-main-background border border-soft-divider-line",
            value: "text-main-text-headlines",
          }}
          isRequired
        >
          <SelectItem key="completed">Completed</SelectItem>
          <SelectItem key="ongoing">Ongoing</SelectItem>
        </Select>
        <Input
          label="Display Order (lower = first)"
          type="number"
          value={String(order)}
          onChange={(e) => setOrder(Number(e.target.value))}
          classNames={inputClasses}
        />
      </section>

      {/* Status-specific fields */}
      {status === "completed" ? (
        <section className="space-y-5 rounded-xl border border-soft-divider-line bg-main-background/30 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-labels">
            Completion Info
          </h3>
          <Input
            label="Year Completed (e.g. 2025)"
            value={yearCompleted}
            onChange={(e) => setYearCompleted(e.target.value)}
            classNames={inputClasses}
          />
        </section>
      ) : (
        <section className="space-y-5 rounded-xl border border-soft-divider-line bg-main-background/30 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-labels">
            Progress Info
          </h3>
          <Input
            label="Expected Completion (e.g. December 2027)"
            value={expectedCompletion}
            onChange={(e) => setExpectedCompletion(e.target.value)}
            classNames={inputClasses}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-main-text-headlines">
              Progress: {progressPercent}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={progressPercent}
              onChange={(e) => setProgressPercent(Number(e.target.value))}
              className="w-full accent-primary-gold"
            />
            <div className="flex justify-between text-xs text-muted-labels">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      <section className="space-y-3 rounded-xl border border-soft-divider-line bg-main-background/30 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-labels">
          Description (optional)
        </h3>
        <Textarea
          label="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={5}
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
