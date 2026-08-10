import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  assertOwner,
  listUsers,
  createCollaborator,
  removeUser,
  type CmsUser,
} from "./admin-users.server";

export const listCmsUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<CmsUser[]> => {
    await assertOwner(context.supabase, context.userId);
    return await listUsers(context.supabase);
  });

export const addCollaborator = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z
      .object({ email: z.string().email(), password: z.string().min(8) })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    await assertOwner(context.supabase, context.userId);
    return await createCollaborator(data.email, data.password);
  });

export const deleteCmsUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ userId: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    await assertOwner(context.supabase, context.userId);
    if (data.userId === context.userId) {
      throw new Error("You cannot remove your own access");
    }
    return await removeUser(data.userId);
  });
