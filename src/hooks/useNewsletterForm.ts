import { useState, type FormEvent } from "react";

export const NEWSLETTER_ACTION =
  "https://assets.mailerlite.com/jsonp/2570708/forms/195544417940014318/subscribe";

export type NewsletterStatus = "idle" | "sending" | "success" | "error";

export function useNewsletterForm() {
  const [status, setStatus] = useState<NewsletterStatus>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setStatus("sending");
    try {
      await fetch(NEWSLETTER_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: new FormData(form),
      });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return { status, onSubmit };
}
