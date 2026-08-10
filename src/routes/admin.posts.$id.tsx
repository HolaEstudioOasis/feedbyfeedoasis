import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/admin/AdminShell";
import PostForm from "@/components/admin/PostForm";
import { useAdminSession } from "@/hooks/useAdminSession";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/lib/blog";

export const Route = createFileRoute("/admin/posts/$id")({
  head: () => ({
    meta: [
      { title: "Edit post | Feed by Feed CMS" },
      { name: "description", content: "Edit a Feed by Feed blog post." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Edit post | Feed by Feed CMS" },
      { property: "og:description", content: "Edit a Feed by Feed blog post." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const session = useAdminSession();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error: loadError }) => {
        if (!active) return;
        if (loadError) setError(loadError.message);
        setPost((data as BlogPost | null) ?? null);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <AdminShell>
      <h1 className="mb-6 text-2xl font-semibold">Edit post</h1>
      {error ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : !post ? (
        <p className="text-sm text-muted-foreground">This post no longer exists.</p>
      ) : session.userId ? (
        <PostForm post={post} userId={session.userId} />
      ) : null}
    </AdminShell>
  );
}
