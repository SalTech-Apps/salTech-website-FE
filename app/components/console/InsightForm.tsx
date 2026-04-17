import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import type { Insight } from "@/types/firestore";
import { IoCloseOutline, IoCloudUploadOutline } from "react-icons/io5";

const PageEditorClient = lazy(
  () =>
    import("./PageEditorClient").then((m) => ({ default: m.PageEditorClient }))
);
type PageEditorHandle = import("./PageEditorClient").PageEditorHandle;

const INSIGHT_CATEGORIES = [
  "BUYING GUIDES",
  "INVESTMENT STRATEGY",
  "MARKET UPDATES",
  "DIASPORA INVESTOR GUIDES",
  "PROPERTY MANAGEMENT TIPS",
  "LEGAL & COMPLIANCE",
  "TAX & FINANCE",
  "OFF-PLAN & NEW BUILD",
  "RENTAL YIELDS",
  "AREA GUIDES",
  "FIRST-TIME BUYERS",
  "SELLING GUIDES",
  "MARKET TRENDS",
  "SUCCESS STORIES",
  "FAQ & HOW-TO",
] as const;

function estimateReadTimeMinutes(markdown: string): number {
  const plain = markdown.replace(/[#*_[\]()`]/g, " ").replace(/\s+/g, " ").trim();
  const words = plain ? plain.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return minutes;
}

function formatReadTime(minutes: number): string {
  return minutes === 1 ? "1 min read" : `${minutes} min read`;
}

export interface InsightFormData {
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface InsightFormProps {
  initial?: Partial<Insight>;
  onSubmit: (data: InsightFormData, imageFile: File | null) => Promise<void>;
  submitLabel: string;
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function InsightForm({ initial, onSubmit, submitLabel }: InsightFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    initial?.seoDescription ?? ""
  );
  const initialContent = initial?.content ?? "";

  const date =
    initial?.date ?? new Date().toISOString().slice(0, 10);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initial?.image ?? "");
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<PageEditorHandle | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!initial?.slug) setSlug(toSlug(val));
  }

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
      const markdown =
        editorRef.current?.getInstance?.().getMarkdown?.() ?? initialContent;
      const readTime = formatReadTime(estimateReadTimeMinutes(markdown));
      await onSubmit(
        {
          title,
          slug,
          category,
          date,
          readTime,
          content: markdown,
          seoTitle: seoTitle || undefined,
          seoDescription: seoDescription || undefined,
        },
        imageFile
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClasses = {
    input: "text-main-text-headlines",
    inputWrapper: "bg-main-background border border-soft-divider-line",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-3xl">
      {/* Cover image first */}
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
              <IoCloudUploadOutline
                size={28}
                className="text-main-text-headlines"
              />
            </div>
            <span className="text-sm font-medium">
              Click to upload cover image
            </span>
            <span className="text-xs">PNG, JPG or WebP</span>
          </button>
        )}
      </section>

      {/* Article details */}
      <section className="space-y-5 rounded-xl border border-soft-divider-line bg-main-background/30 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-labels">
          Article details
        </h3>
        <Input
          label="Title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          classNames={inputClasses}
          isRequired
        />
        <Input
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          classNames={inputClasses}
          isRequired
        />
        <Select
          label="Category (optional)"
          placeholder="Select a category"
          selectedKeys={category ? [category] : []}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as string | undefined;
            setCategory(val ?? "");
          }}
          classNames={{
            trigger: "bg-main-background border border-soft-divider-line",
            value: "text-main-text-headlines",
          }}
        >
          {INSIGHT_CATEGORIES.map((cat) => (
            <SelectItem key={cat}>{cat}</SelectItem>
          ))}
        </Select>
        <Input
          label="SEO Title"
          placeholder="e.g. Best Property Investment Tips 2025"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          classNames={inputClasses}
          description="Optional. Used for meta title and search results. Defaults to article title."
        />
        <Input
          label="SEO Description"
          placeholder="e.g. Discover expert tips for property investment in Nigeria..."
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
          classNames={inputClasses}
          description="Optional. Used for meta description. 150–160 chars recommended. Defaults to content excerpt."
        />
        <div className="flex flex-wrap gap-6 text-sm text-muted-labels">
          <span>
            <strong className="text-main-text-headlines">Date:</strong> {date}
          </span>
          <span>
            <strong className="text-main-text-headlines">Read time:</strong> Set
            automatically from content length
          </span>
        </div>
      </section>

      {/* Content */}
      <section className="space-y-3">
        <label className="block text-sm font-semibold text-main-text-headlines">
          Content
        </label>
        {mounted ? (
          <Suspense
            fallback={
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-soft-divider-line bg-main-background/50 text-muted-labels">
                Loading editor…
              </div>
            }
          >
            <PageEditorClient ref={editorRef} initialValue={initialContent} />
          </Suspense>
        ) : (
          <div className="flex h-[400px] items-center justify-center rounded-lg border border-soft-divider-line bg-main-background/50 text-muted-labels">
            Loading editor…
          </div>
        )}
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
