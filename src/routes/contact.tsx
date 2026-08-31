import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import SiteLayout from "@/components/site/SiteLayout";
import { submitContactForm } from "@/lib/contact.functions";

const title = "Contact | Feed by Feed";
const description = "Get in touch with Feed by Feed — questions, service inquiries, or ready to book your first consultation.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

type FieldErrors = { name?: string; email?: string; message?: string };
type SubmitStatus = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const INITIAL_VALUES = {
  name: "",
  email: "",
  phone: "",
  reason: "General question",
  message: "",
  website: "",
};

function Contact() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const sendForm = useServerFn(submitContactForm);

  function validate(v: typeof values): FieldErrors {
    const next: FieldErrors = {};
    if (!v.name.trim()) next.name = "Please enter your name";
    if (!v.email.trim()) next.email = "Please enter your email";
    else if (!EMAIL_RE.test(v.email.trim())) next.email = "Please enter a valid email address";
    if (!v.message.trim()) next.message = "Please enter a message";
    return next;
  }

  function update(field: keyof typeof values, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field as keyof FieldErrors]) {
      const revalidated = validate(next);
      setErrors((prev) => ({ ...prev, [field]: revalidated[field as keyof FieldErrors] }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = (["name", "email", "message"] as const).find((f) => nextErrors[f]);
    if (firstInvalid) {
      const el = document.getElementById(`contact-${firstInvalid}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLElement | null)?.focus({ preventScroll: true });
      return;
    }

    setStatus("sending");
    setFormMessage(null);

    try {
      await sendForm({
        data: {
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          reason: values.reason,
          message: values.message.trim(),
          website: values.website,
        },
      });
      setStatus("success");
      setFormMessage("Thank you! We'll get back to you soon.");
      setValues(INITIAL_VALUES);
      setErrors({});
    } catch {
      setStatus("error");
      setFormMessage(
        "Something went wrong. Please try again, or email us directly at hello@feedbyfeed.com"
      );
    }
  }

  return (
    <SiteLayout>
      <main>
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <h1>Get in Touch</h1>
            <p className="lead">
              Questions about feeding, curious about a service, or ready to book your first
              consultation? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="section">
          <div className="container contact-grid">
            <div className="contact-info">
              <h2>Reach us directly</h2>
              <p className="lead">
                Prefer to skip the form? Send us a message directly and we'll get back to you
                within 1–2 business days.
              </p>

              <div className="contact-details">
                <div>
                  <p className="contact-detail-label">Email</p>
                  <p className="contact-detail-value">
                    <a href="mailto:hello@feedbyfeed.com" className="link-inline">
                      hello@feedbyfeed.com
                    </a>
                  </p>
                </div>
                <div>
                  <p className="contact-detail-label">Service area</p>
                  <p className="contact-detail-value">
                    Virtual across Canada &amp; internationally. In-home &amp; in-hospital support
                    in Toronto &amp; the GTA.
                  </p>
                </div>
                <div>
                  <p className="contact-detail-label">Languages</p>
                  <p className="contact-detail-value">English &amp; Spanish</p>
                </div>
              </div>
            </div>

            {status === "success" ? (
              <div className="contact-form">
                <p className="contact-success" role="status">
                  {formMessage}
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form-row">
                  <div>
                    <label className="field-label" htmlFor="contact-name">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={errors.name ? "has-error" : undefined}
                    />
                    {errors.name && (
                      <p className="field-error" id="contact-name-error">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="field-label" htmlFor="contact-email">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={errors.email ? "has-error" : undefined}
                    />
                    {errors.email && (
                      <p className="field-error" id="contact-email-error">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="contact-form-row contact-form-field">
                  <div>
                    <label className="field-label" htmlFor="contact-phone">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      placeholder="Your phone number"
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="contact-reason">
                      I'm interested in <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-reason"
                      name="reason"
                      required
                      value={values.reason}
                      onChange={(e) => update("reason", e.target.value)}
                    >
                      <option value="General question">General question</option>
                      <option value="Prenatal Support">Prenatal Support</option>
                      <option value="Lactation &amp; Feeding Consultations">Lactation &amp; Feeding Consultations</option>
                      <option value="Bundles">Bundles</option>
                      <option value="Speaking &amp; Events">Speaking &amp; Events</option>
                    </select>
                  </div>
                </div>

                {/* Honeypot field — hidden from real users */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    type="text"
                    id="contact-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </div>

                <div className="contact-form-field">
                  <label className="field-label" htmlFor="contact-message">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us a bit about how we can help."
                    required
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={errors.message ? "has-error" : undefined}
                  ></textarea>
                  {errors.message && (
                    <p className="field-error" id="contact-message-error">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && formMessage && (
                  <p className="field-error contact-form-error" role="alert">
                    {formMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
