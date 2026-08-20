import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().max(50).optional().default(""),
  reason: z.enum([
    "General question",
    "Prenatal Services",
    "Lactation Consultations",
    "Bundles",
    "Speaking & Events",
  ]),
  message: z.string().trim().min(1, "Please enter a message").max(2000),
  website: z.string().max(0, "Spam detected").optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export async function sendContactEmail(input: ContactFormInput) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const subject = `Website inquiry from ${input.name} — ${input.reason}`;
  const bodyLines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : "Phone: Not provided",
    `Interested in: ${input.reason}`,
    "",
    input.message,
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "noreply@feedbyfeed.com",
      to: "hello@feedbyfeed.com",
      reply_to: input.email,
      subject,
      text: bodyLines.join("\n"),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    throw new Error(`Resend API error: ${response.status} ${text}`);
  }

  return response.json();
}
