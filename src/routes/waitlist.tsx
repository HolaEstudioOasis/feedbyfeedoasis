import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import logoCrema from "@/assets/logo-crema.svg.asset.json";
import bgAsset from "@/assets/carrusel-2.webp.asset.json";

const WAITLIST_ACTION =
  "https://assets.mailerlite.com/jsonp/2570708/forms/196877723998619006/subscribe";

const title = "Feed by Feed is coming soon";
const description =
  "Join the waitlist and be the first to know when Feed by Feed launches.";
const ogImage = `https://feedbyfeed.lovable.app${bgAsset.url}`;

export const Route = createFileRoute("/waitlist")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
  }),
  component: Waitlist,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Waitlist() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", last_name: "", email: "" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = values.email.trim();
    if (!email) {
      setEmailError("Please enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);
    setStatus("sending");

    const body = new FormData();
    body.append("fields[name]", values.name);
    body.append("fields[last_name]", values.last_name);
    body.append("fields[email]", email);
    body.append("ml-submit", "1");
    body.append("anticsrf", "true");

    try {
      await fetch(WAITLIST_ACTION, { method: "POST", mode: "no-cors", body });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="waitlist">
      <img src={bgAsset.url} alt="" aria-hidden="true" className="waitlist-bg" />
      <div className="waitlist-overlay" aria-hidden="true" />

      <div className="waitlist-inner">
        <img
          src={logoCrema.url}
          width={250}
          height={80}
          alt="Feed by Feed"
          className="waitlist-logo"
        />

        {status === "success" ? (
          <div className="waitlist-copy" role="status">
            <h1>
              You're <em>in!</em>
            </h1>
            <p>
              Thanks for joining us. You'll be among the first to know when FeedbyFeed
              launches. One feed at a time.
            </p>
          </div>
        ) : (
          <>
            <div className="waitlist-copy">
              <h1>
                Feed by Feed is <em>coming soon</em>
              </h1>
              <p>
                Join the FeedbyFeed waitlist and be the first to know when we're ready to
                support families, one feed at a time.
              </p>
            </div>

            <form className="waitlist-form" onSubmit={onSubmit} noValidate>
              <div className="waitlist-row">
                <label htmlFor="wl-name" className="visually-hidden">
                  Name
                </label>
                <input
                  id="wl-name"
                  type="text"
                  placeholder="Name"
                  autoComplete="given-name"
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                />
                <label htmlFor="wl-last" className="visually-hidden">
                  Last name
                </label>
                <input
                  id="wl-last"
                  type="text"
                  placeholder="Last name"
                  autoComplete="family-name"
                  value={values.last_name}
                  onChange={(e) => setValues((v) => ({ ...v, last_name: e.target.value }))}
                />
              </div>

              <div className="waitlist-field">
                <label htmlFor="wl-email" className="visually-hidden">
                  Email
                </label>
                <input
                  id="wl-email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  aria-invalid={emailError ? "true" : undefined}
                  className={emailError ? "has-error" : undefined}
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                />
                {emailError && (
                  <p className="waitlist-error" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-cream waitlist-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Joining..." : "Join the Waitlist"}
              </button>

              {status === "error" && (
                <p className="waitlist-error waitlist-error--center" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
}
