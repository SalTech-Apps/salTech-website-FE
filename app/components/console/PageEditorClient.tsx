import { forwardRef, useMemo } from "react";
import type { RefObject } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

export interface PageEditorHandle {
  getInstance(): { getMarkdown(): string };
}

interface PageEditorClientProps {
  initialValue: string;
  /** When provided, paste/drop/toolbar image uploads use this to get a URL. */
  onUploadImage?: (file: File) => Promise<string>;
  /** Called when content changes (so removed images can be deleted from storage). */
  onContentChange?: (markdown: string) => void;
}

/**
 * Client-only Toast UI Editor. Imported via React.lazy so it never runs during SSR
 * (Toast UI uses browser globals like `self`).
 */
export const PageEditorClient = forwardRef<PageEditorHandle, PageEditorClientProps>(
  function PageEditorClient(
    { initialValue, onUploadImage, onContentChange },
    ref
  ) {
    const hooks = useMemo(() => {
      if (!onUploadImage) return undefined;
      return {
        addImageBlobHook: async (
          blob: Blob | File,
          callback: (url: string, altText?: string) => void
        ) => {
          const file = blob instanceof File ? blob : new File([blob], "image.png", { type: blob.type });
          try {
            const url = await onUploadImage(file);
            callback(url, "image");
          } catch (err) {
            console.error("Image upload failed:", err);
          }
        },
      };
    }, [onUploadImage]);

    return (
      <div className="overflow-hidden rounded-lg border border-soft-divider-line bg-main-background [&_.toastui-editor-defaultUI]:border-0">
        <Editor
          ref={ref as RefObject<Editor>}
          initialValue={initialValue}
          previewStyle="vertical"
          useCommandShortcut
          usageStatistics={false}
          height="500px"
          initialEditType="wysiwyg"
          hideModeSwitch={true}
          autofocus={true}
          hooks={hooks}
          onChange={() => {
            const instance = (ref as RefObject<Editor>).current?.getInstance?.();
            const md = instance?.getMarkdown?.();
            if (md !== undefined && onContentChange) onContentChange(md);
          }}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "link", "image"],
            ["code", "codeblock"],
          ]}
        />
      </div>
    );
  }
);
