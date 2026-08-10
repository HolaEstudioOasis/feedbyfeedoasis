import { useEffect, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/useAdminSession";

const navItems = [
  { to: "/admin", label: "Posts", exact: true },
  { to: "/admin/posts/new", label: "New post", exact: true },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const session = useAdminSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!session.loading && !session.userId) {
      void navigate({ to: "/admin/login" });
    }
  }, [session.loading, session.userId, navigate]);

  if (session.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!session.userId) return null;

  if (!session.role) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-muted px-6 text-center">
        <h1 className="text-xl font-semibold">No CMS access</h1>
        <p className="text-sm text-muted-foreground">
          This account isn't authorized to use the admin panel.
        </p>
        <button
          className="rounded-md border border-border px-4 py-2 text-sm"
          onClick={async () => {
            await supabase.auth.signOut();
            void navigate({ to: "/admin/login" });
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  const items = session.role === "owner"
    ? [...navItems, { to: "/admin/users", label: "Users", exact: true }]
    : navItems;

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
          <Link to="/admin" className="text-lg font-semibold tracking-tight">
            Feed by Feed CMS
          </Link>
          <nav className="flex items-center gap-1">
            {items.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm text-muted-foreground">
            <span className="hidden sm:inline">
              {session.email} · {session.role}
            </span>
            <a href="/" className="rounded-md border border-border px-3 py-1.5">
              View site
            </a>
            <button
              className="rounded-md border border-border px-3 py-1.5"
              onClick={async () => {
                await supabase.auth.signOut();
                void navigate({ to: "/admin/login" });
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
