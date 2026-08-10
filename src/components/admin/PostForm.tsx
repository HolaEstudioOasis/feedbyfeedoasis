import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import RichTextEditor from "./RichTextEditor";
import { blogImageUrl, slugify, type BlogPost, type PostStatus } from "@/lib/blog";

type FormState = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  category: string;
  tags: string;
  meta_title: string;
  meta_description: string;
  status: PostStatus;
  published_at: string;
};

function toLocalInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function emptyForm(): FormState {
  return {
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image_url: "",
    category: "",
    tags: "",
    meta_title: "",
    meta_description: "",
    status: "draft",
    published_at: "",
  };
}

export default function PostForm({ post, userId }: { post?: BlogPost; userId: string }) {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!post) return;
    setSlugTouched(true);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content ?? "",
      excerpt: post.excerpt ?? "",
      featured_image_url: post.featured_image_url ?? "",
      category: post.category ?? "",
      tags: (post.tags ?? []).join(", "),
      meta_title: post.meta_title ?? "",
      meta_description: post.meta_description ?? "",
      status: post.status,
      published_at: toLocalInput(post.published_at),
    });
  }, [post]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const uploadFeatured = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const path = `featured/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(path, file);
      if (uploadError) throw uploadError;
      set("featured_image_url", blogImageUrl(path));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async (mode: "draft" | "publish" | "schedule") => {
    setSaving(true);
    setError(null);
    try {
      if (!form.title.trim()) throw new Error("A title is required");

      let status: PostStatus = "draft";
      let publishedAt: string | null = null;

      if (mode === "publish") {
        status = "published";
        publishedAt = form.published_at
          ? new Date(form.published_at).toISOString()
          : new Date().toISOString();
      } else if (mode === "schedule") {
        if (!form.published_at) throw new Error("Pick a date and time to schedule this post");
        const when = new Date(form.published_at);
        if (when.getTime() <= Date.now()) throw new Error("The scheduled time must be in the future");
        status = "scheduled";
        publishedAt = when.toISOString();
      } else {
        publishedAt = form.published_at ? new Date(form.published_at).toISOString() : null;
      }

      const payload = {
        title: form.title.trim(),
        slug: (form.slug || slugify(form.title)).trim(),
        content: form.content,
        excerpt: form.excerpt || null,
        featured_image_url: form.featured_image_url || null,
        category: form.category || null,
        tags: form.tags
          ? form.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          : null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
        status,
        published_at: publishedAt,
      };

      if (post) {
        const { error: updateError } = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", post.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("blog_posts")
          .insert({ ...payload, author_id: userId });
        if (insertError) throw insertError;
      }

      void navigate({ to: "/admin" });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save the post");
    } finally {
      setSaving(false);
    }
  };

  const label = "block text-sm font-medium text-foreground";
  const field =
    "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring";

  return (
    <div className="space-y-6">
      {error ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-5 rounded-lg border border-border bg-background p-5">
          <div>
            <label className={label} htmlFor="title">Title</label>
            <input
              id="title"
              className={field}
              value={form.title}
              onChange={(event) => {
                const value = event.target.value;
                setForm((prev) => ({
                  ...prev,
                  title: value,
                  slug: slugTouched ? prev.slug : slugify(value),
                }));
              }}
            />
          </div>

          <div>
            <label className={label} htmlFor="slug">Slug</label>
            <input
              id="slug"
              className={field}
              value={form.slug}
              onChange={(event) => {
                setSlugTouched(true);
                set("slug", slugify(event.target.value));
              }}
            />
          </div>

          <div>
            <label className={label}>Content</label>
            <div className="mt-1">
              <RichTextEditor
                key={post?.id ?? "new"}
                value={form.content}
                onChange={(html) => set("content", html)}
              />
            </div>
          </div>

          <div>
            <label className={label} htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              rows={3}
              className={field}
              value={form.excerpt}
              onChange={(event) => set("excerpt", event.target.value)}
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-4 rounded-lg border border-border bg-background p-5">
            <div>
              <label className={label}>Featured image</label>
              {form.featured_image_url ? (
                <img
                  src={form.featured_image_url}
                  alt=""
                  className="mt-2 aspect-video w-full rounded-md object-cover"
                />
              ) : null}
              <input
                type="file"
                accept="image/*"
                className="mt-2 text-sm"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (file) void uploadFeatured(file);
                }}
              />
              {uploading ? <p className="text-xs text-muted-foreground">Uploading…</p> : null}
              {form.featured_image_url ? (
                <button
                  type="button"
                  className="mt-2 text-xs text-muted-foreground underline"
                  onClick={() => set("featured_image_url", "")}
                >
                  Remove image
                </button>
              ) : null}
            </div>

            <div>
              <label className={label} htmlFor="category">Category</label>
              <input
                id="category"
                className={field}
                value={form.category}
                onChange={(event) => set("category", event.target.value)}
              />
            </div>

            <div>
              <label className={label} htmlFor="tags">Tags (comma separated)</label>
              <input
                id="tags"
                className={field}
                value={form.tags}
                onChange={(event) => set("tags", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-5">
            <div>
              <label className={label} htmlFor="meta_title">Meta title</label>
              <input
                id="meta_title"
                className={field}
                value={form.meta_title}
                onChange={(event) => set("meta_title", event.target.value)}
              />
            </div>
            <div>
              <label className={label} htmlFor="meta_description">Meta description</label>
              <textarea
                id="meta_description"
                rows={3}
                className={field}
                value={form.meta_description}
                onChange={(event) => set("meta_description", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border bg-background p-5">
            <p className="text-sm text-muted-foreground">
              Current status: <strong className="text-foreground">{form.status}</strong>
            </p>
            <div>
              <label className={label} htmlFor="published_at">Publish date &amp; time</label>
              <input
                id="published_at"
                type="datetime-local"
                className={field}
                value={form.published_at}
                onChange={(event) => set("published_at", event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                disabled={saving}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
                onClick={() => void save("publish")}
              >
                Publish now
              </button>
              <button
                type="button"
                disabled={saving}
                className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-60"
                onClick={() => void save("schedule")}
              >
                Schedule
              </button>
              <button
                type="button"
                disabled={saving}
                className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-60"
                onClick={() => void save("draft")}
              >
                Save as draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
