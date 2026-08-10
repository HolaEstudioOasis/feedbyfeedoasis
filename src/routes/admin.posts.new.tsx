import { createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/admin/AdminShell";
import PostForm from "@/components/admin/PostForm";
import { useAdminSession } from "@/hooks/useAdminSession";

export const Route = createFileRoute("/admin/posts/new")({
  head: () => ({
    meta: [
      { title: "New post | Feed by Feed CMS" },
      { name: "description", content: "Create a new Feed by Feed blog post." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "New post | Feed by Feed CMS" },
      { property: "og:description", content: "Create a new Feed by Feed blog post." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewPost,
});

function NewPost() {
  const session = useAdminSession();

  return (
    <AdminShell>
      <h1 className="mb-6 text-2xl font-semibold">New post</h1>
      {session.userId ? <PostForm userId={session.userId} /> : null}
    </AdminShell>
  );
}
