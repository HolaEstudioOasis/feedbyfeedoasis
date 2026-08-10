import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";

const title = "Prenatal Services | Feed by Feed";
const description = "Feel informed, prepared, and confident before your baby's arrival with Feed by Feed's prenatal breastfeeding services.";

export const Route = createFileRoute("/services/prenatal-services")({
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
  component: PrenatalServices,
});

function PrenatalServices() {
  return (
    <SiteLayout>
      <main>
        {/* Hero */}
            <section className="page-hero">
              <div className="container">
                <h1>Prenatal Services</h1>
                <p className="lead">Feel informed, prepared, and confident before your baby's arrival.</p>
              </div>
            </section>

            {/* Packages */}
            <section className="packages section">
              <div className="container">

                <article className="package-card">
                  <div className="package-content">
                    <h2>Private Prenatal Breastfeeding Consultation</h2>
                    <p className="package-tag">In home</p>
                    <p className="package-desc">A personalized in-home prenatal breastfeeding consultation. We'll discuss what to expect during the first days, address your questions, and create a plan that supports your feeding goals.</p>
                    <h3 className="package-list-heading">What's Included</h3>
                    <ul className="package-list">
                      <li>How breastfeeding works during the first days after birth</li>
                      <li>Practical latch and positioning techniques for a comfortable start</li>
                      <li>What to expect as your milk supply develops</li>
                      <li>How to prepare for common breastfeeding challenges</li>
                    </ul>
                    <div className="package-meta">
                      <div>
                        <p className="package-meta-label">Duration</p>
                        <p className="package-meta-value">1.5 hours</p>
                      </div>
                      <div>
                        <p className="package-meta-label">Price</p>
                        <p className="package-meta-value">$250</p>
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
                    <h2>Private Prenatal Breastfeeding Consultation</h2>
                    <p className="package-tag">Virtual</p>
                    <p className="package-desc">The same comprehensive prenatal breastfeeding consultation offered virtually, giving you the flexibility to prepare for your baby's arrival from anywhere.</p>
                    <h3 className="package-list-heading">What's Included</h3>
                    <ul className="package-list">
                      <li>Personalized breastfeeding preparation</li>
                      <li>Latch and positioning guidance</li>
                      <li>Milk supply expectations</li>
                      <li>Newborn feeding during the first days</li>
                      <li>Recommendations tailored to your family's goals and medical history</li>
                    </ul>
                    <div className="package-meta">
                      <div>
                        <p className="package-meta-label">Duration</p>
                        <p className="package-meta-value">1.5 hours</p>
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

                <article className="package-card">
                  <div className="package-content">
                    <h2>Prenatal Breastfeeding Class</h2>
                    <p className="package-tag">Group session</p>
                    <p className="package-desc">An interactive class for expecting parents that provides the knowledge and confidence to begin breastfeeding with realistic expectations.</p>
                    <h3 className="package-list-heading">What You'll Learn</h3>
                    <ul className="package-list">
                      <li>How breastfeeding works during the first days after birth</li>
                      <li>Practical latch and positioning techniques</li>
                      <li>What to expect from your milk supply</li>
                      <li>How to recognize newborn feeding cues</li>
                      <li>How your partner can support your breastfeeding goals</li>
                    </ul>
                    <div className="package-meta">
                      <div>
                        <p className="package-meta-label">Duration</p>
                        <p className="package-meta-value">2 hours</p>
                      </div>
                      <div>
                        <p className="package-meta-label">Price</p>
                        <p className="package-meta-value">$150 per couple</p>
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
                  <h2>Expert care tailored to the real rhythm<br className="line-break-desktop" /> of your family</h2>
                  <button type="button" className="btn btn-cream" disabled={true}>Book a Prenatal Consultation</button>
                  <p className="cta-footnote">Have questions? Contact us at <a href="/contact">hello@feedbyfeed.com</a></p>
                </div>
              </div>
            </section>
      </main>
    </SiteLayout>
  );
}
