import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";

const title = "Packages | Feed by Feed";
const description = "Lactation and infant feeding support packages combining prenatal preparation, postpartum consultations, and follow-up care.";

export const Route = createFileRoute("/services/packages")({
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
  component: Packages,
});

function Packages() {
  return (
    <SiteLayout>
      <main>
        {/* Hero */}
            <section className="page-hero">
              <div className="container">
                <h1>Packages</h1>
                <p className="lead">Lactation and infant feeding support packages combining prenatal preparation, postpartum consultations, and follow-up care.</p>
              </div>
            </section>

            {/* Packages */}
            <section className="packages section">
              <div className="container">

                <article className="package-card">
                  <div className="package-content">
                    <h2>Prenatal + Postpartum Support</h2>
                    <p className="package-tag">In home prenatal</p>
                    <p className="package-desc">A complete support package that begins with prenatal breastfeeding preparation and continues through the early postpartum period, with follow-up care available throughout your feeding journey.</p>
                    <h3 className="package-list-heading">What's Included</h3>
                    <ul className="package-list">
                      <li>1 private in-home prenatal breastfeeding consultation</li>
                      <li>1 initial lactation consultation in-home or hospital</li>
                      <li>1 virtual follow-up consultation</li>
                      <li>Unlimited text and email support throughout care</li>
                      <li>Complimentary 15-minute follow-up call</li>
                      <li>Follow-up can be used for pumping, bottle introduction, starting solids, or gentle weaning</li>
                      <li>In-home follow-up upgrade available for +$75</li>
                    </ul>
                    <div className="package-meta">
                      <div>
                        <p className="package-meta-label">Price</p>
                        <p className="package-meta-value">$600</p>
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
                    <h2>Prenatal + Postpartum Support</h2>
                    <p className="package-tag">Virtual prenatal</p>
                    <p className="package-desc">A complete support package that starts with virtual prenatal breastfeeding preparation and continues with personalized lactation care after your baby arrives.</p>
                    <h3 className="package-list-heading">What's Included</h3>
                    <ul className="package-list">
                      <li>1 private virtual prenatal breastfeeding consultation</li>
                      <li>1 initial lactation consultation in-home or hospital</li>
                      <li>1 virtual follow-up consultation</li>
                      <li>Unlimited text and email support throughout care</li>
                      <li>Complimentary 15-minute follow-up call</li>
                      <li>Follow-up can be used for pumping, bottle introduction, starting solids, or gentle weaning</li>
                    </ul>
                    <div className="package-meta">
                      <div>
                        <p className="package-meta-label">Price</p>
                        <p className="package-meta-value">$550</p>
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
                    <h2>Postpartum Support Package</h2>
                    <p className="package-desc">Ongoing lactation and infant feeding support for families who are already navigating the early days and want continued guidance as their feeding journey develops.</p>
                    <h3 className="package-list-heading">What's Included</h3>
                    <ul className="package-list">
                      <li>1 initial lactation consultation in-home or virtual</li>
                      <li>1 in-home or virtual follow-up consultation</li>
                      <li>Unlimited text and email support throughout care</li>
                      <li>Complimentary 15-minute follow-up call</li>
                      <li>Follow-up can be used for pumping, bottle introduction, starting solids, or gentle weaning</li>
                    </ul>
                    <div className="package-meta">
                      <div>
                        <p className="package-meta-label">Price</p>
                        <p className="package-meta-value">$475</p>
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
                  <h2>Support that grows with your feeding journey</h2>
                  <button type="button" className="btn btn-cream" disabled={true}>Choose Your Package</button>
                  <p className="cta-footnote">Have questions? Contact us at <a href="/contact">hello@feedbyfeed.com</a></p>
                </div>
              </div>
            </section>
      </main>
    </SiteLayout>
  );
}
