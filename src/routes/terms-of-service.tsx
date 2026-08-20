import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";

const title = "Terms of Service | Feed by Feed";
const description =
  "The terms that govern the use of the Feed by Feed website and our lactation and infant feeding support services in Toronto, the GTA and online.";

export const Route = createFileRoute("/terms-of-service")({
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
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="container">
            <h1>Terms of Service</h1>
            <p className="lead">Last updated: August 20, 2026</p>
          </div>
        </section>

        <section className="legal section">
          <div className="container legal-content">
            <h2>1. About these terms</h2>
            <p>
              These Terms of Service govern your use of the Feed by Feed website and the services we
              provide. By using this website or booking a consultation, you agree to these terms.
            </p>
            <p>Feed by Feed is operated by Alicia Cerda, IBCLC, in Toronto, Ontario, Canada.</p>
            <p>
              If you have questions about these terms, contact{" "}
              <a href="mailto:hello@feedbyfeed.com">hello@feedbyfeed.com</a>.
            </p>

            <h2>2. Who we are and what we do</h2>
            <p>
              Alicia Cerda is an <strong>International Board Certified Lactation Consultant
              (IBCLC)</strong> with a bachelor's degree in nutrition and over ten years of
              experience across nutrition, healthcare and family education.
            </p>
            <p>
              We provide lactation and infant feeding support, including help with breastfeeding,
              pumping, bottle feeding, combination feeding, starting solids, weaning, and prenatal
              feeding preparation. Support is offered in your home across Toronto and the GTA, and
              virtually to families in Canada, the United States and Mexico.
            </p>

            <h2>3. Important — what our services are not</h2>
            <p>
              <strong>Feed by Feed does not provide medical care, diagnosis, or treatment.</strong>
            </p>
            <p>
              Lactation consultants are not licensed to diagnose medical conditions, prescribe
              medication, or perform medical procedures. Our support complements — and does not
              replace — care from your physician, midwife, nurse practitioner, paediatrician, or
              dentist.
            </p>
            <p>Specifically:</p>
            <ul>
              <li>We do <strong>not</strong> diagnose or treat medical conditions in you or your baby.</li>
              <li>We do <strong>not</strong> prescribe or recommend prescription medication.</li>
              <li>
                We do <strong>not</strong> perform frenotomies or any other procedure. Where an oral
                restriction is suspected, we will refer you to an appropriate provider for
                assessment.
              </li>
              <li>
                We do <strong>not</strong> replace your baby's regular medical care, growth
                monitoring, or immunization schedule.
              </li>
            </ul>
            <p>
              <strong>Always consult a qualified medical professional</strong> about your health or
              your baby's health, and never delay seeking medical advice because of something we
              have said or something you have read on this website.
            </p>

            <h2>4. In an emergency</h2>
            <p className="legal-callout">
              <strong>
                If you or your baby are experiencing a medical emergency, call 911 or go to your
                nearest emergency department immediately.
              </strong>
            </p>
            <p>
              Do not use our contact form, email, or WhatsApp to report an emergency. We do not
              monitor these channels continuously and cannot provide urgent care.
            </p>
            <p>
              Seek immediate medical attention if your baby is not feeding, is difficult to wake, is
              not producing wet diapers, has a fever, is having difficulty breathing, or if you
              develop a fever, severe breast pain, or symptoms of infection.
            </p>

            <h2>5. Website content</h2>
            <p>
              The information on this website, including blog posts and resources, is general in
              nature and provided for educational purposes. It is not personalized advice and does
              not create a professional relationship between us.
            </p>
            <p>
              Every baby and every family is different. What is appropriate for one may not be
              appropriate for another. Information on this website should not be relied upon as a
              substitute for a consultation or for medical care.
            </p>

            <h2>6. Enquiries and booking</h2>
            <p>
              Submitting the contact form, sending an email, or requesting an appointment{" "}
              <strong>does not create a client relationship</strong> and does not guarantee that an
              appointment will be provided.
            </p>
            <p>
              A client relationship begins only when a consultation is confirmed and any required
              intake information or consent is completed.
            </p>
            <p>
              We aim to respond to enquiries within 1–2 business days. We cannot guarantee
              availability at any particular time.
            </p>
            <p>
              We reserve the right to decline or discontinue services where a matter falls outside
              our scope of practice, where in-person or medical care is more appropriate, or where a
              respectful working relationship is not possible.
            </p>

            <h2>7. Your responsibilities as a client</h2>
            <p>To help us support you safely, you agree to:</p>
            <ul>
              <li>
                Provide accurate and complete information about your health and your baby's health,
                including medical conditions, medications, and any concerns raised by other
                providers
              </li>
              <li>Tell us promptly about any changes in your baby's health, feeding, or growth</li>
              <li>Follow up with your medical providers as recommended</li>
              <li>
                Use your own judgement in applying our suggestions, and stop and seek medical advice
                if something does not feel right
              </li>
            </ul>
            <p>
              We rely on the information you give us. Recommendations based on incomplete or
              inaccurate information may not be appropriate for your situation.
            </p>

            <h2>8. Fees and payment</h2>
            <ul>
              <li>Current fees for each service are shown on the relevant service page.</li>
              <li>
                <strong>Payment is due at the end of your consultation</strong>, unless we have
                agreed otherwise in writing.
              </li>
              <li>
                We accept all major credit cards, e-transfer, wire transfer, and cash. Card payments
                are processed securely by Stripe.
              </li>
              <li>
                Our services are <strong>not covered by OHIP</strong>. They may be covered by some
                private insurance plans, extended health benefits, or a Health Spending Account.
                Coverage depends on your individual plan, and we recommend checking with your
                insurer before booking.
              </li>
              <li>
                We can provide a receipt for insurance purposes. We cannot guarantee that your
                insurer will reimburse you.
              </li>
            </ul>

            <h2>9. Cancellations and rescheduling</h2>
            <p>
              Our cancellation policy is set out separately. Please see our{" "}
              <Link to="/cancellation-policy">Cancellation Policy</Link>.
            </p>

            <h2>10. Virtual consultations</h2>
            <p>Virtual consultations are conducted by video call using Google Meet.</p>
            <p>By booking a virtual consultation, you understand and accept that:</p>
            <ul>
              <li>
                A virtual assessment has limitations compared with an in-person visit. We cannot
                physically examine you or your baby.
              </li>
              <li>
                The quality of the consultation depends on your internet connection, camera and
                lighting.
              </li>
              <li>
                Sessions are <strong>not recorded</strong> by us. Please do not record without our
                prior written consent.
              </li>
              <li>
                You are responsible for being in a private, safe setting where you can attend to
                your baby.
              </li>
              <li>
                If we determine that your situation requires in-person or medical assessment, we
                will tell you and refer you appropriately.
              </li>
            </ul>
            <p>
              If you are located outside Ontario, you are responsible for confirming that receiving
              these services is permitted where you live.
            </p>

            <h2>11. Support between sessions</h2>
            <p>
              We offer follow-up support by WhatsApp between sessions, because questions often come
              up outside of appointments.
            </p>
            <p>Please note:</p>
            <ul>
              <li>
                This support is for general questions and check-ins related to your care plan. It
                does not replace a consultation, and complex or new concerns may require a follow-up
                appointment.
              </li>
              <li>
                We respond during business hours. Messages sent outside those hours may not be seen
                until the next business day.
              </li>
              <li>
                <strong>WhatsApp is not a secure channel</strong> for health information, and it is
                not monitored continuously.
              </li>
              <li>
                <strong>WhatsApp must never be used for emergencies.</strong> See section 4.
              </li>
            </ul>

            <h2>12. Intellectual property</h2>
            <p>
              All content on this website — text, images, care plans, handouts and educational
              materials — belongs to Feed by Feed and is protected by copyright.
            </p>
            <p>
              Materials provided to you during a consultation are for your personal use. Please do
              not reproduce, distribute or publish them without our written permission.
            </p>

            <h2>13. Limitation of liability</h2>
            <p>To the fullest extent permitted by law:</p>
            <ul>
              <li>
                Our services are provided on the basis of the information you give us and our
                professional judgement. <strong>We do not guarantee any particular outcome</strong>,
                including that breastfeeding will be established, maintained, or achieved on any
                particular timeline.
              </li>
              <li>
                We are not liable for indirect, incidental or consequential damages arising from
                your use of this website or our services.
              </li>
              <li>
                Our total liability arising from our services is limited to the amount you paid for
                the service in question.
              </li>
              <li>
                We are not responsible for the acts or omissions of other providers to whom we refer
                you.
              </li>
            </ul>
            <p>
              Nothing in these terms excludes liability that cannot be excluded by law, including
              under Ontario's <em>Consumer Protection Act, 2002</em>.
            </p>

            <h2>14. Third-party links</h2>
            <p>
              Our website may link to other websites and resources. We provide these for convenience
              and are not responsible for their content, accuracy, or privacy practices.
            </p>

            <h2>15. Privacy</h2>
            <p>
              Your personal information is handled in accordance with our{" "}
              <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>

            <h2>16. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. The current version will always be
              available on this page, with the date it was last updated. Continuing to use our
              website or services after a change means you accept the updated terms.
            </p>

            <h2>17. Governing law</h2>
            <p>
              These terms are governed by the laws of the Province of Ontario and the laws of Canada
              that apply in Ontario. Any dispute will be subject to the exclusive jurisdiction of
              the courts of Ontario.
            </p>

            <h2>18. Contact</h2>
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
