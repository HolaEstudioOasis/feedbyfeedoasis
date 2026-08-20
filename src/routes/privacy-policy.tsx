import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";

const title = "Privacy Policy | Feed by Feed";
const description =
  "How Feed by Feed collects, uses, protects and retains your personal information, and the privacy choices available to you under Canadian law.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: PrivacyPolicy,
});

const PROVIDERS: Array<[string, string, string]> = [
  ["Lovable", "Website hosting", "Technical data from site visits"],
  ["Supabase", "Backend for the contact form", "Contact form submissions"],
  ["Resend", "Email delivery for the contact form", "Name, email, phone, message"],
  ["MailerLite", "Newsletter", "Email address"],
  [
    "Google Workspace (Calendar, Drive, Meet)",
    "Scheduling, record storage, virtual consultations",
    "Appointment details, consultation records",
  ],
  ["Stripe", "Card payment processing", "Payment details, handled directly by Stripe"],
  ["WhatsApp", "Follow-up support between sessions", "Messages you choose to send us"],
];

function PrivacyPolicy() {
  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="container">
            <h1>Privacy Policy</h1>
            <p className="lead">Last updated: August 20, 2026</p>
          </div>
        </section>

        <section className="legal section">
          <div className="container legal-content">
            <h2>1. Who we are</h2>
            <p>
              Feed by Feed is a lactation and infant feeding support practice operated by Alicia
              Cerda, IBCLC, based in Toronto, Ontario, Canada. We provide in-home consultations
              across Toronto and the Greater Toronto Area, and virtual consultations to families in
              Canada, the United States and Mexico.
            </p>
            <p>
              This Privacy Policy explains what personal information we collect, why we collect it,
              how we use and protect it, and what choices you have.
            </p>
            <p>
              If you have any questions about this policy or how your information is handled,
              contact us at <a href="mailto:hello@feedbyfeed.com">hello@feedbyfeed.com</a>.
            </p>

            <h2>2. The law that applies to us</h2>
            <p>
              We are a private practice operating in Ontario. Our handling of personal information
              is governed by the <strong>Personal Information Protection and Electronic Documents
              Act (PIPEDA)</strong>, Canada's federal privacy law for commercial activity.
            </p>
            <p>
              Feed by Feed is not a regulated health profession under Ontario's <em>Regulated Health
              Professions Act</em>, and we are therefore not a "health information custodian" under
              Ontario's <em>Personal Health Information Protection Act</em>. We nonetheless treat
              information about you and your baby as confidential and handle it with the care that
              health-related information deserves.
            </p>

            <h2>3. Information we collect</h2>
            <h3>When you use our website</h3>
            <ul>
              <li>
                <strong>Contact form:</strong> your name, email address, phone number (optional),
                the service you're interested in, and the content of your message.
              </li>
              <li>
                <strong>Newsletter signup:</strong> your email address.
              </li>
            </ul>
            <p>
              We do not use analytics or tracking tools on this website, and we do not use cookies
              to track your activity across other websites.
            </p>

            <h3>When you become a client</h3>
            <p>
              To provide feeding support safely and effectively, we collect information about you
              and your baby, which may include:
            </p>
            <ul>
              <li>Contact and identifying information (name, address, phone, email)</li>
              <li>Your pregnancy, birth and postpartum history</li>
              <li>Your baby's date of birth, weight, growth and feeding history</li>
              <li>Relevant medical history for you and your baby, including medications and diagnoses</li>
              <li>Observations from feeding assessments and oral assessments</li>
              <li>Your feeding goals and the care plans we develop together</li>
              <li>Notes from consultations and follow-up communications</li>
            </ul>
            <p>We collect only what we need to provide the service you have asked for.</p>

            <h3>Payment information</h3>
            <p>
              Card payments are processed by <strong>Stripe</strong>. We do not see, collect or
              store your full card number. Stripe handles the transaction directly under its own
              privacy policy and security standards.
            </p>
            <p>
              Payments by e-transfer, wire transfer or cash do not involve a third-party processor,
              and we retain only the record needed for our accounting and tax obligations.
            </p>

            <h2>4. Why we collect it and your consent</h2>
            <p>We collect and use your information to:</p>
            <ul>
              <li>Respond to your enquiries</li>
              <li>Schedule and provide consultations</li>
              <li>Assess feeding and develop care plans</li>
              <li>Provide follow-up support between sessions</li>
              <li>Issue receipts and meet our accounting and tax obligations</li>
              <li>Send you our newsletter, if you have signed up</li>
              <li>Meet our professional and legal obligations</li>
            </ul>
            <p>
              We rely on <strong>your consent</strong>. By submitting the contact form, booking a
              consultation, or subscribing to our newsletter, you consent to the uses described in
              this policy.
            </p>
            <p>
              <strong>You may withdraw your consent at any time</strong> by contacting us at{" "}
              <a href="mailto:hello@feedbyfeed.com">hello@feedbyfeed.com</a>, subject to our
              record-keeping obligations. Withdrawing consent may mean we can no longer provide
              certain services.
            </p>
            <p>
              Newsletter consent is separate: subscribing does not create a client relationship, and
              unsubscribing does not affect your care.
            </p>

            <h2>5. Service providers we use</h2>
            <p>
              We use third-party services to operate our practice. Each has access only to the
              information needed for its function.
            </p>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th scope="col">Provider</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">Information involved</th>
                  </tr>
                </thead>
                <tbody>
                  {PROVIDERS.map(([provider, purpose, info]) => (
                    <tr key={provider}>
                      <th scope="row" data-label="Provider">{provider}</th>
                      <td data-label="Purpose">{purpose}</td>
                      <td data-label="Information involved">{info}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <strong>Information stored outside Canada:</strong> most of these providers store or
              process information on servers outside Canada, primarily in the United States and the
              European Union. Information stored in another country may be accessible to that
              country's courts and law enforcement under its laws. By using our website and
              services, you acknowledge this.
            </p>
            <p>
              <strong>We do not sell your personal information.</strong> We do not share it with
              third parties for their own marketing purposes.
            </p>

            <h2>6. A note about WhatsApp and email</h2>
            <p>
              We offer follow-up support by WhatsApp between sessions, because we know questions
              come up at difficult moments and quick reassurance matters.
            </p>
            <p>
              Please understand that <strong>WhatsApp and email are not secure channels for health
              information</strong>. Messages are stored on your device and on servers operated by
              those companies, outside our control. We recommend keeping sensitive details for your
              consultation, and using messaging for general questions and check-ins.
            </p>
            <p>
              Neither channel is monitored continuously and neither should be used for emergencies.
              See our <Link to="/terms-of-service">Terms of Service</Link> for what to do in an
              emergency.
            </p>

            <h2>7. When we may share your information</h2>
            <p>We may share information about you or your baby:</p>
            <ul>
              <li>
                <strong>With your consent</strong>, for example when we refer you to a physician,
                dentist, midwife or other professional, or when we communicate with a member of your
                care team at your request.
              </li>
              <li>
                <strong>In an emergency</strong>, where there is a risk of serious harm to you or
                your baby.
              </li>
              <li>
                <strong>Where required by law</strong>, including our legal obligation to report
                suspected child abuse or neglect to a children's aid society under Ontario's{" "}
                <em>Child, Youth and Family Services Act</em>.
              </li>
              <li>
                <strong>With professional advisors</strong> bound by confidentiality, where
                necessary.
              </li>
            </ul>

            <h2>8. How we protect your information</h2>
            <p>We take reasonable steps to protect your information, including:</p>
            <ul>
              <li>
                Storing consultation records in a password-protected Google Drive account with
                two-factor authentication enabled
              </li>
              <li>Limiting access to consultation records to Alicia Cerda alone</li>
              <li>
                Avoiding identifying clinical details in calendar entries — appointments are
                recorded using initials or a client reference rather than full names and clinical
                information
              </li>
              <li>Not storing sensitive clinical information in email or messaging applications</li>
              <li>Not recording virtual consultations</li>
            </ul>
            <p>
              <strong>No method of transmission or storage is completely secure.</strong> We cannot
              guarantee absolute security, but we take the protection of your information seriously
              and review our practices as our services grow.
            </p>

            <h2>9. How long we keep your information</h2>
            <p>
              We retain client records for <strong>at least 10 years</strong> from the date of the
              last consultation. Where records concern a child, we retain them for at least 10 years
              after that child reaches the age of 18.
            </p>
            <p>
              This reflects the standard applied to regulated health professionals in Ontario. We
              follow it as good practice, and because records may be needed if a question or concern
              arises later.
            </p>
            <p>
              Website enquiries that do not lead to a consultation are retained for up to 12 months.
              Newsletter subscriptions are retained until you unsubscribe.
            </p>

            <h2>10. Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> the personal information we hold about you</li>
              <li><strong>Request corrections</strong> to information that is inaccurate or incomplete</li>
              <li><strong>Withdraw your consent</strong> to our use of your information</li>
              <li><strong>Unsubscribe</strong> from our newsletter at any time, using the link in any email</li>
              <li><strong>Ask questions</strong> about how your information is handled</li>
            </ul>
            <p>
              To exercise any of these rights, contact{" "}
              <a href="mailto:hello@feedbyfeed.com">hello@feedbyfeed.com</a>. We will respond within
              30 days.
            </p>
            <p>
              If you are not satisfied with our response, you may contact the{" "}
              <strong>Office of the Privacy Commissioner of Canada</strong> at{" "}
              <a href="https://priv.gc.ca" target="_blank" rel="noreferrer">priv.gc.ca</a> or
              1-800-282-1376.
            </p>

            <h2>11. If there is a privacy breach</h2>
            <p>
              If your personal information is lost, stolen, or accessed without authorization in a
              way that creates a real risk of significant harm to you, we will notify you and the
              Office of the Privacy Commissioner of Canada as required by law, and tell you what
              steps you can take.
            </p>

            <h2>12. Children's information</h2>
            <p>
              Our services concern the feeding and care of infants and young children. Information
              about your child is collected from you as their parent or guardian, and is treated
              with the same confidentiality as your own.
            </p>
            <p>
              Our website is not directed at children and we do not knowingly collect information
              directly from anyone under 18.
            </p>

            <h2>13. Families outside Canada</h2>
            <p>
              We offer virtual consultations to families in the United States and Mexico. If you are
              located outside Canada, your information will be transferred to and stored in Canada
              and in the countries where our service providers operate, and will be handled in
              accordance with this policy and Canadian law.
            </p>

            <h2>14. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The current version will always be
              available on this page, with the date it was last updated. Material changes affecting
              how we use your information will be communicated to active clients.
            </p>

            <h2>15. Contact</h2>
            <p className="legal-signature">
              <strong>Feed by Feed</strong>
              <br />
              Alicia Cerda, IBCLC
              <br />
              Email: <a href="mailto:hello@feedbyfeed.com">hello@feedbyfeed.com</a>
              <br />
              Toronto, Ontario, Canada
            </p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
