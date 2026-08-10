import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";

const title = "Lactation Consultations | Feed by Feed";
const description = "Support for families navigating breastfeeding, pumping, bottle feeding, and other feeding challenges.";

export const Route = createFileRoute("/services/lactation-consultations")({
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
  component: LactationConsultations,
});

function LactationConsultations() {
  return (
    <SiteLayout>
      <main>
        {/* Hero */}
            <section className="page-hero">
              <div className="container">
                <h1>Lactation Consultations</h1>
                <p className="lead">Support for families navigating breastfeeding, pumping, bottle feeding, and other feeding challenges.</p>
              </div>
            </section>

            {/* Packages */}
            <section className="packages section">
              <div className="container">

                <article className="package-card">
                  <div className="package-content">
                    <h2>Initial Lactation Consultation</h2>
                    <p className="package-tag">In home or hospital</p>
                    <p className="package-desc">A comprehensive lactation consultation for families who need support with breastfeeding, milk supply, latch, or other feeding concerns.</p>
                    <h3 className="package-list-heading">What's Included</h3>
                    <ul className="package-list">
                      <li>Feeding history and assessment</li>
                      <li>Latch and positioning assessment</li>
                      <li>Baby's oral function and milk transfer</li>
                      <li>Review of feeding goals and concerns</li>
                      <li>Personalized feeding plan</li>
                      <li>Two weeks of text and email support</li>
                    </ul>
                    <div className="package-meta">
                      <div>
                        <p className="package-meta-label">Duration</p>
                        <p className="package-meta-value">1.5 hours</p>
                      </div>
                      <div>
                        <p className="package-meta-label">Price</p>
                        <p className="package-meta-value">$275</p>
                      </div>
                    </div>
                  </div>
                  <div className="package-media">
                    <div className="img-placeholder"></div>
                  </div>
                  <button type="button" className="btn btn-outline package-book-btn" disabled={true}>Book Now</button>
                </article>

                <article className="package-card">
                  <div className="package-content">
                    <h2>Follow-Up Lactation Consultation</h2>
                    <p className="package-tag">In home</p>
                    <p className="package-desc">A follow-up lactation consultation to review how feeding is progressing and make adjustments based on your baby's needs.</p>
                    <h3 className="package-list-heading">What's Included</h3>
                    <ul className="package-list">
                      <li>Review of feeding progress</li>
                      <li>Feeding observation</li>
                      <li>Adjustments to your care plan</li>
                      <li>Continued breastfeeding support</li>
                      <li>One week of text and email support</li>
                    </ul>
                    <div className="package-meta">
                      <div>
                        <p className="package-meta-label">Duration</p>
                        <p className="package-meta-value">1 hour</p>
                      </div>
                      <div>
                        <p className="package-meta-label">Price</p>
                        <p className="package-meta-value">$225</p>
                      </div>
                    </div>
                  </div>
                  <div className="package-media">
                    <div className="img-placeholder"></div>
                  </div>
                  <button type="button" className="btn btn-outline package-book-btn" disabled={true}>Book Now</button>
                </article>

                <article className="package-card">
                  <div className="package-content">
                    <h2>Follow-Up Lactation Consultation</h2>
                    <p className="package-tag">Virtual</p>
                    <p className="package-desc">A virtual lactation consultation for families who need ongoing support, troubleshooting, or guidance as their feeding journey changes.</p>
                    <h3 className="package-list-heading">What's Included</h3>
                    <ul className="package-list">
                      <li>Review of your current feeding concerns</li>
                      <li>Guidance for breastfeeding and pumping</li>
                      <li>Bottle feeding support</li>
                      <li>Support with starting solids or weaning</li>
                      <li>Adjustments to your feeding plan</li>
                    </ul>
                    <div className="package-meta">
                      <div>
                        <p className="package-meta-label">Duration</p>
                        <p className="package-meta-value">1 hour</p>
                      </div>
                      <div>
                        <p className="package-meta-label">Price</p>
                        <p className="package-meta-value">$150</p>
                      </div>
                    </div>
                  </div>
                  <div className="package-media">
                    <div className="img-placeholder"></div>
                  </div>
                  <button type="button" className="btn btn-outline package-book-btn" disabled={true}>Book Now</button>
                </article>

              </div>
            </section>

            {/* Additional Notes */}
            <section className="notes section">
              <div className="container">
                <h2>Additional Notes</h2>
                <div className="notes-grid">
                  <div className="note-card">
                    <p>Travel fees may apply for home visits outside central Toronto.</p>
                  </div>
                  <div className="note-card">
                    <p>Weekend and evening appointments may be available upon request.</p>
                  </div>
                  <div className="note-card">
                    <p>Payment can be made by cash or e-transfer.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="cta section">
              <div className="container">
                <div className="cta-content">
                  <p className="eyebrow">Ready to start?</p>
                  <h2>Support for every step of your feeding journey</h2>
                  <button type="button" className="btn btn-cream" disabled={true}>Book a Lactation Consultation</button>
                  <p className="cta-footnote">Have questions? Contact us at <a href="/contact">hello@feedbyfeed.com</a></p>
                </div>
              </div>
            </section>
      </main>
    </SiteLayout>
  );
}
