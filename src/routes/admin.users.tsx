import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminSession } from "@/hooks/useAdminSession";
import { addCollaborator, deleteCmsUser, listCmsUsers } from "@/lib/admin-users.functions";
import { formatDateTime } from "@/lib/blog";
import type { CmsUser } from "@/lib/admin-users.server";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users | Feed by Feed CMS" },
      { name: "description", content: "Manage who can access the Feed by Feed content panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Users | Feed by Feed CMS" },
      { property: "og:description", content: "Manage who can access the Feed by Feed content panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminUsers,
});

function AdminUsers() {
  const session = useAdminSession();
  const fetchUsers = useServerFn(listCmsUsers);
  const invite = useServerFn(addCollaborator);
  const removeUser = useServerFn(deleteCmsUser);

  const [users, setUsers] = useState<CmsUser[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setUsers(await fetchUsers());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load users");
    }
  };

  useEffect(() => {
    if (session.role === "owner") void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.role]);

  if (session.loading) {
    return <AdminShell><p className="text-sm text-muted-foreground">Loading…</p></AdminShell>;
  }

  if (session.role && session.role !== "owner") {
    return (
      <AdminShell>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Only the owner can manage panel access.
        </p>
      </AdminShell>
    );
  }

  const onInvite = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await invite({ data: { email, password } });
      setMessage(`${email} can now sign in with the password you set.`);
      setEmail("");
      setPassword("");
      await load();
    } catch (inviteError) {
      setError(inviteError instanceof Error ? inviteError.message : "Could not add the collaborator");
    } finally {
      setBusy(false);
    }
  };

  const onRemove = async (user: CmsUser) => {
    if (!window.confirm(`Remove access for ${user.email}?`)) return;
    setError(null);
    try {
      await removeUser({ data: { userId: user.id } });
      await load();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Could not remove access");
    }
  };

  const field =
    "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring";

  return (
    <AdminShell>
      <h1 className="mb-6 text-2xl font-semibold">Users</h1>

      {error ? (
        <p className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mb-4 rounded-md border border-border bg-background px-4 py-2 text-sm">
          {message}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="overflow-x-auto rounded-lg border border-border bg-background">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Added</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDateTime(user.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {user.id === session.userId ? null : (
                      <button
                        className="rounded-md border border-destructive/40 px-2.5 py-1 text-xs text-destructive"
                        onClick={() => void onRemove(user)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={onInvite} className="space-y-4 rounded-lg border border-border bg-background p-5">
          <h2 className="text-lg font-semibold">Add collaborator</h2>
          <div>
            <label className="block text-sm font-medium" htmlFor="new-email">Email</label>
            <input
              id="new-email"
              type="email"
              required
              className={field}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="new-password">
              Temporary password
            </label>
            <input
              id="new-password"
              type="text"
              required
              minLength={8}
              className={field}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Adding…" : "Add collaborator"}
          </button>
          <p className="text-xs text-muted-foreground">
            Share the password with them privately; they can change it later.
          </p>
        </form>
      </div>
    </AdminShell>
  );
}
