import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { BlogPost } from "./blog";

function isNewSupabaseApiKey(value: string) {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (isNewSupabaseApiKey(key) && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

const LIST_FIELDS =
  "id,title,slug,excerpt,featured_image_url,category,tags,published_at";

export type BlogListItem = Pick<
  BlogPost,
  "id" | "title" | "slug" | "excerpt" | "featured_image_url" | "category" | "tags" | "published_at"
>;

export async function fetchPublishedPosts(): Promise<BlogListItem[]> {
  const { data, error } = await publicClient()
    .from("blog_posts")
    .select(LIST_FIELDS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogListItem[];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await publicClient()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as BlogPost | null) ?? null;
}

export async function fetchBlogImage(path: string) {
  return publicClient().storage.from("blog-images").download(path);
}
