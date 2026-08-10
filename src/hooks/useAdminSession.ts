import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminSession = {
  loading: boolean;
  userId: string | null;
  email: string | null;
  role: "owner" | "collaborator" | null;
};

export function useAdminSession(): AdminSession {
  const [state, setState] = useState<AdminSession>({
    loading: true,
    userId: null,
    email: null,
    role: null,
  });

  useEffect(() => {
    let active = true;

    const load = async (userId: string | null, email: string | null) => {
      if (!userId) {
        if (active) setState({ loading: false, userId: null, email: null, role: null });
        return;
      }
      const { data } = await supabase
        .from("cms_users")
        .select("role")
        .eq("id", userId)
        .maybeSingle();
      if (!active) return;
      setState({
        loading: false,
        userId,
        email,
        role: (data?.role as "owner" | "collaborator" | undefined) ?? null,
      });
    };

    supabase.auth.getSession().then(({ data }) => {
      void load(data.session?.user.id ?? null, data.session?.user.email ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void load(session?.user.id ?? null, session?.user.email ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
