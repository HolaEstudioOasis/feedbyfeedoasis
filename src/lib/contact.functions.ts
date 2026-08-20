import { createServerFn } from "@tanstack/react-start";
import { contactFormSchema, sendContactEmail } from "./contact.server";

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data) => contactFormSchema.parse(data))
  .handler(async ({ data }) => {
    await sendContactEmail(data);
    return { success: true };
  });
