import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { Button, Input, Switch, Textarea } from "@heroui/react";
import type { Page } from "@/types/firestore";
import {
  deleteImageByUrl,
  extractStorageImageUrls,
} from "@/lib/storage";

// Toast UI Editor uses browser globals (self) — load only on client via lazy
const PageEditorClient = lazy(
  () =>
    import("./PageEditorClient").then((m) => ({ default: m.PageEditorClient }))
);
type PageEditorHandle = import("./PageEditorClient").PageEditorHandle;

export interface PageFormData {
  slug: string;
  title: string;
  content: string;
  bannerImageUrl?: string;
  order: number;
  showInFooter: boolean;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
}

interface PageFormProps {
  initial?: Partial<Page>;
  onSubmit: (data: PageFormData) => Promise<void>;
  submitLabel: string;
  /** Upload banner image; called on submit if user selected a new file. */
  uploadBanner?: (file: File) => Promise<string>;
  /** Upload in-editor images (paste/drop/toolbar). Used for content images. */
  uploadContentImage?: (file: File) => Promise<string>;
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function PageForm({
  initial,
  onSubmit,
  submitLabel,
  uploadBanner,
  uploadContentImage,
}: PageFormProps) {
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [bannerImageUrl, setBannerImageUrl] = useState(
    initial?.bannerImageUrl ?? ""
  );
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState("");
  const [showInFooter, setShowInFooter] = useState(initial?.showInFooter ?? true);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    initial?.seoDescription ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef<PageEditorHandle | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const previousContentRef = useRef<string>(initial?.content ?? "");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Create/revoke object URL for banner file preview
  useEffect(() => {
    if (!bannerFile) {
      setBannerPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(bannerFile);
    setBannerPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [bannerFile]);

  useEffect(() => {
    if (initial) {
      setSlug(initial.slug ?? "");
      setTitle(initial.title ?? "");
      setContent(initial.content ?? "");
      previousContentRef.current = initial.content ?? "";
      setBannerImageUrl(initial.bannerImageUrl ?? "");
      setBannerFile(null);
      setShowInFooter(initial.showInFooter ?? true);
      setPublished(initial.published ?? true);
      setSeoTitle(initial.seoTitle ?? "");
      setSeoDescription(initial.seoDescription ?? "");
    }
  }, [initial?.id]);

  const handleEditorContentChange = useCallback((markdown: string) => {
    const prev = previousContentRef.current;
    const prevUrls = extractStorageImageUrls(prev);
    const currentUrls = extractStorageImageUrls(markdown);
    const removed = prevUrls.filter((u) => !currentUrls.includes(u));
    removed.forEach((url) => deleteImageByUrl(url).catch(console.error));
    previousContentRef.current = markdown;
  }, []);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!initial?.slug) setSlug(toSlug(val));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const markdown =
        editorRef.current?.getInstance?.().getMarkdown?.() ?? content;
      let finalBannerUrl = bannerImageUrl || undefined;
      if (bannerFile && uploadBanner) {
        finalBannerUrl = await uploadBanner(bannerFile);
      }
      await onSubmit({
        slug: slug.trim(),
        title: title.trim(),
        content: markdown,
        bannerImageUrl: finalBannerUrl,
        order: initial?.order ?? 0,
        showInFooter,
        published,
        seoTitle: seoTitle.trim(),
        seoDescription: seoDescription.trim(),
      });
    } finally {
      setSaving(false);
    }
  }

  const inputClasses = {
    input: "text-main-text-headlines",
    inputWrapper: "bg-main-background border border-soft-divider-line",
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-4xl flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          classNames={inputClasses}
          isRequired
          placeholder="Page title"
        />
        <Input
          label="URL slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          classNames={inputClasses}
          isRequired
          placeholder="url-slug"
          description="Used in URL: /page/url-slug"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:gap-8">
        <Switch
          isSelected={showInFooter}
          onValueChange={setShowInFooter}
          classNames={{ label: "text-main-text-headlines" }}
        >
          Show in footer
        </Switch>
        <Switch
          isSelected={published}
          onValueChange={setPublished}
          classNames={{ label: "text-main-text-headlines" }}
        >
          Published
        </Switch>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-main-text-headlines">
          Banner image (optional)
        </label>
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setBannerFile(f);
          }}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          {(bannerFile || bannerImageUrl) && (
            <div className="relative h-32 w-full max-w-xs overflow-hidden rounded-lg border border-soft-divider-line bg-secondary-background sm:h-28 sm:w-48">
              <img
                src={bannerFile ? bannerPreviewUrl : bannerImageUrl || ""}
                alt="Banner preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex gap-2">
            <Button
              radius="none"
              type="button"
              variant="bordered"
              size="sm"
              onPress={() => bannerInputRef.current?.click()}
              className="border-soft-divider-line"
            >
              {bannerFile || bannerImageUrl ? "Change image" : "Upload banner"}
            </Button>
            {(bannerFile || bannerImageUrl) && (
              <Button
                radius="none"
                type="button"
                variant="light"
                size="sm"
                onPress={() => {
                  setBannerFile(null);
                  setBannerImageUrl("");
                  if (bannerInputRef.current) bannerInputRef.current.value = "";
                }}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-main-text-headlines">
          Content
        </label>
        {mounted ? (
          <Suspense
            fallback={
              <div className="flex h-[400px] items-center justify-center rounded-lg border border-soft-divider-line bg-secondary-background text-secondary-text-body-paragraphs">
                Loading editor…
              </div>
            }
          >
            <PageEditorClient
              ref={editorRef}
              initialValue={content}
              onUploadImage={uploadContentImage}
              onContentChange={handleEditorContentChange}
            />
          </Suspense>
        ) : (
          <div className="flex h-[400px] items-center justify-center rounded-lg border border-soft-divider-line bg-secondary-background text-secondary-text-body-paragraphs">
            Loading editor…
          </div>
        )}
      </div>

      <div className="rounded-xl border border-soft-divider-line bg-secondary-background p-4">
        <h3 className="mb-3 text-sm font-semibold text-main-text-headlines">
          SEO (optional)
        </h3>
        <div className="flex flex-col gap-4">
          <Input
            label="SEO title"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            classNames={inputClasses}
            placeholder="Defaults to page title"
          />
          <Textarea
            label="SEO description"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            classNames={{
              input: "text-main-text-headlines",
              inputWrapper:
                "bg-main-background border border-soft-divider-line",
            }}
            placeholder="Meta description"
            minRows={2}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          radius="none"
          type="submit"
          isLoading={saving}
          className="bg-primary-gold text-main-background font-semibold"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
