import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";

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

function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget;
  const value = (id: string) =>
    (form.querySelector(`#${id}`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)?.value.trim() ??
    "";

  const name = value("contact-name");
  const email = value("contact-email");
  const phone = value("contact-phone");
  const reason = value("contact-reason");
  const message = value("contact-message");

  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Interested in: ${reason}`,
    "",
    message,
  ].filter((line): line is string => line !== null);

  window.location.href =
    "mailto:hello@feedbyfeed.com" +
    "?subject=" +
    encodeURIComponent(`Website inquiry from ${name}`) +
    "&body=" +
    encodeURIComponent(bodyLines.join("\n"));
}

function Contact() {
  return (
    <SiteLayout>
      <main>
        {/* Hero */}
            <section className="page-hero">
              <div className="container">
                <h1>Get in Touch</h1>
                <p className="lead">Questions about feeding, curious about a service, or ready to book your first consultation? We'd love to hear from you.</p>
              </div>
            </section>

            {/* Contact */}
            <section className="section">
              <div className="container contact-grid">

                <div className="contact-info">
                  <h2>Reach us directly</h2>
                  <p className="lead">Prefer to skip the form? Send us a message directly and we'll get back to you within 1–2 business days.</p>

                  <div className="contact-details">
                    <div>
                      <p className="contact-detail-label">Email</p>
                      <p className="contact-detail-value"><a href="mailto:hello@feedbyfeed.com" className="link-inline">hello@feedbyfeed.com</a></p>
                    </div>
                    <div>
                      <p className="contact-detail-label">Service area</p>
                      <p className="contact-detail-value">Virtual across Canada &amp; internationally. In-home &amp; in-hospital support in Toronto &amp; the GTA.</p>
                    </div>
                    <div>
                      <p className="contact-detail-label">Languages</p>
                      <p className="contact-detail-value">English &amp; Spanish</p>
                    </div>
                  </div>
                </div>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="contact-form-row">
                    <div>
                      <label className="field-label" htmlFor="contact-name">Name</label>
                      <input type="text" id="contact-name" name="name" placeholder="Your name" required={true} />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="contact-email">Email</label>
                      <input type="email" id="contact-email" name="email" placeholder="you@example.com" required={true} />
                    </div>
                  </div>

                  <div className="contact-form-row contact-form-field">
                    <div>
                      <label className="field-label" htmlFor="contact-phone">Phone (optional)</label>
                      <input type="tel" id="contact-phone" name="phone" placeholder="Your phone number" />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="contact-reason">I'm interested in</label>
                      <select id="contact-reason" name="reason">
                        <option value="General question">General question</option>
                        <option value="Prenatal Services">Prenatal Services</option>
                        <option value="Lactation Consultations">Lactation Consultations</option>
                        <option value="Packages">Packages</option>
                      </select>
                    </div>
                  </div>

                  <div className="contact-form-field">
                    <label className="field-label" htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" name="message" placeholder="Tell us a bit about how we can help." required={true}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>

              </div>
            </section>
      </main>
    </SiteLayout>
  );
}
