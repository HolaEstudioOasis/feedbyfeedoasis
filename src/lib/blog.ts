export type PostStatus = "draft" | "scheduled" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  author_id: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export const BLOG_IMAGE_PREFIX = "/api/public/blog-image/";

/** Public, stable URL for an object stored in the private `blog-images` bucket. */
export function blogImageUrl(path: string) {
  return `${BLOG_IMAGE_PREFIX}${path.replace(/^\/+/, "")}`;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatPostDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Safe, unique storage object path: `<folder>/<uuid>.<ext>` (no spaces, parens or extra dots). */
export function storageObjectPath(folder: "featured" | "content", file: File) {
  const match = /\.([A-Za-z0-9]{1,5})$/.exec(file.name);
  const fromName = match?.[1]?.toLowerCase();
  const fromType = file.type.split("/")[1]?.toLowerCase().replace(/[^a-z0-9]/g, "");
  const ext = fromName || fromType || "bin";
  return `${folder}/${crypto.randomUUID()}.${ext}`;
}
