import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { blogImageUrl, storageObjectPath } from "@/lib/blog";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

const buttons: { label: string; command: string; arg?: string; title: string }[] = [
  { label: "B", command: "bold", title: "Bold" },
  { label: "I", command: "italic", title: "Italic" },
  { label: "H2", command: "formatBlock", arg: "h2", title: "Heading 2" },
  { label: "H3", command: "formatBlock", arg: "h3", title: "Heading 3" },
  { label: "P", command: "formatBlock", arg: "p", title: "Paragraph" },
  { label: "• List", command: "insertUnorderedList", title: "Bulleted list" },
  { label: "1. List", command: "insertOrderedList", title: "Numbered list" },
  { label: "❝", command: "formatBlock", arg: "blockquote", title: "Quote" },
];

export default function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Content is uncontrolled after mount; the parent remounts (via key) when
  // it loads a different post.
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    onChange(ref.current?.innerHTML ?? "");
  };

  const insertLink = () => {
    const url = window.prompt("Link URL");
    if (url) exec("createLink", url);
  };

  const insertImage = async (file: File) => {
    setUploading(true);
    try {
      const path = storageObjectPath("content", file);
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(path, file, { contentType: file.type || undefined, upsert: false });
      if (error) throw error;
      exec("insertImage", blogImageUrl(path));
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-md border border-border bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
        {buttons.map((button) => (
          <button
            key={button.label}
            type="button"
            title={button.title}
            className="rounded px-2 py-1 text-sm hover:bg-accent"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => exec(button.command, button.arg)}
          >
            {button.label}
          </button>
        ))}
        <button
          type="button"
          className="rounded px-2 py-1 text-sm hover:bg-accent"
          onMouseDown={(event) => event.preventDefault()}
          onClick={insertLink}
        >
          Link
        </button>
        <button
          type="button"
          className="rounded px-2 py-1 text-sm hover:bg-accent"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading…" : "Image"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void insertImage(file);
          }}
        />
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="post-body min-h-[320px] px-4 py-3 outline-none"
        onInput={() => onChange(ref.current?.innerHTML ?? "")}
        onBlur={() => onChange(ref.current?.innerHTML ?? "")}
      />
    </div>
  );
}
