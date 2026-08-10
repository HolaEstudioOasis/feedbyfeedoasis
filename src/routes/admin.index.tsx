import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import AdminShell from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { formatDateTime, slugify, type BlogPost, type PostStatus } from "@/lib/blog";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Blog posts | Feed by Feed CMS" },
      { name: "description", content: "Manage Feed by Feed blog posts." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Blog posts | Feed by Feed CMS" },
      { property: "og:description", content: "Manage Feed by Feed blog posts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPosts,
});

const statusStyles: Record<PostStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-chart-5/20 text-foreground",
  published: "bg-chart-2/20 text-foreground",
};

function AdminPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PostStatus>("all");
  const [sortAsc, setSortAsc] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    setPosts((data ?? []) as BlogPost[]);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const visible = useMemo(() => {
    const filtered = posts.filter((post) => {
      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    return filtered.sort((a, b) => {
      const aDate = new Date(a.published_at ?? a.created_at).getTime();
      const bDate = new Date(b.published_at ?? b.created_at).getTime();
      return sortAsc ? aDate - bDate : bDate - aDate;
    });
  }, [posts, search, statusFilter, sortAsc]);

  const remove = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    const { error: deleteError } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    void load();
  };

  const duplicate = async (post: BlogPost) => {
    const { data: session } = await supabase.auth.getSession();
    const { error: insertError } = await supabase.from("blog_posts").insert({
      title: `${post.title} (copy)`,
      slug: `${slugify(post.title)}-copy-${Date.now().toString(36)}`,
      content: post.content,
      excerpt: post.excerpt,
      featured_image_url: post.featured_image_url,
      category: post.category,
      tags: post.tags,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      status: "draft",
      published_at: null,
      author_id: session.session?.user.id ?? null,
    });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    void load();
  };

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold">Blog posts</h1>
        <Link
          to="/admin/posts/new"
          className="ml-auto rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          New post
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          placeholder="Search by title"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as "all" | PostStatus)}
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>
        <button
          className="rounded-md border border-border px-3 py-2 text-sm"
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Date: {sortAsc ? "oldest first" : "newest first"}
        </button>
      </div>

      {error ? (
        <p className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-border bg-background">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-muted-foreground" colSpan={4}>Loading…</td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-muted-foreground" colSpan={4}>No posts yet.</td>
              </tr>
            ) : (
              visible.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      to="/admin/posts/$id"
                      params={{ id: post.id }}
                      className="font-medium hover:underline"
                    >
                      {post.title}
                    </Link>
                    <span className="block text-xs text-muted-foreground">/blog/{post.slug}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${statusStyles[post.status]}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {post.status === "scheduled" ? "Publishes " : ""}
                    {formatDateTime(post.published_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to="/admin/posts/$id"
                        params={{ id: post.id }}
                        className="rounded-md border border-border px-2.5 py-1 text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        className="rounded-md border border-border px-2.5 py-1 text-xs"
                        onClick={() => void duplicate(post)}
                      >
                        Duplicate
                      </button>
                      <button
                        className="rounded-md border border-destructive/40 px-2.5 py-1 text-xs text-destructive"
                        onClick={() => void remove(post)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
