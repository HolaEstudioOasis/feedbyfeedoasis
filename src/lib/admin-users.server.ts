import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type CmsUser = {
  id: string;
  email: string;
  role: "owner" | "collaborator";
  created_at: string;
};

type Client = SupabaseClient<Database>;

/** Throws unless the calling user is an owner in cms_users (checked with the caller's own RLS). */
export async function assertOwner(supabase: Client, userId: string) {
  const { data, error } = await supabase
    .from("cms_users")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data || data.role !== "owner") {
    throw new Error("Forbidden: owner access required");
  }
}

export async function listUsers(supabase: Client): Promise<CmsUser[]> {
  const { data, error } = await supabase
    .from("cms_users")
    .select("id,email,role,created_at")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as CmsUser[];
}

export async function createCollaborator(email: string, password: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) throw new Error(error?.message ?? "Could not create the account");

  const { error: insertError } = await supabaseAdmin
    .from("cms_users")
    .insert({ id: data.user.id, email, role: "collaborator" });
  if (insertError) {
    await supabaseAdmin.auth.admin.deleteUser(data.user.id);
    throw new Error(insertError.message);
  }
  return { id: data.user.id, email };
}

export async function removeUser(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);
  return { ok: true };
}
