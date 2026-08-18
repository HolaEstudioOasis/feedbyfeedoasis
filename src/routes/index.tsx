import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";
import aliciaIntroAsset from "@/assets/alicia-intro.webp.asset.json";
import prenatalHomeAsset from "@/assets/Prenatal_Home.webp.asset.json";
import lactationHomeAsset from "@/assets/lactation-home.webp.asset.json";
import packagesHomeAsset from "@/assets/packages-home.webp.asset.json";


const title = "Feed by Feed | Lactation Consulting & Feeding Support";
const description = "Personalized clinical support for breastfeeding, pumping, and infant nutrition in the comfort of your home.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <main>
        {/* Hero */}
            <section className="hero section">
              <div className="container">
                <div className="hero-content">
                  <h1>Empowering your family for a <em>confident</em> feeding journey.</h1>
                  <p className="lead">Personalized clinical support for breastfeeding, pumping, and infant nutrition in the comfort of your home.</p>
                  <div className="hero-actions">
                    <button type="button" className="btn btn-primary" disabled={true}>Book Now</button>
                    <a href="/about" className="link-inline">About Alicia</a>
                  </div>
                </div>
                <div className="hero-media">
                  <div className="img-placeholder"></div>
                </div>
              </div>
            </section>

            {/* Intro / Meet Alicia */}
            <section className="intro section">
              <div className="container">
                <div className="intro-media">
                  <img
                    src={aliciaIntroAsset.url}
                    alt="Alicia — IBCLC Lactation Consultant at Feed by Feed"
                    className="intro-img"
                    loading="lazy"
                  />
                </div>
                <div className="intro-content">
                  <p className="eyebrow">Worried about your baby's feeding journey?</p>
                  <h2>Hi, I'm Alicia. I'm here to bring calm to your table.</h2>
                  <p className="lead">After navigating my own complex feeding challenges with my two children, I realized no family should walk this path alone or feel judged. As an IBCLC, my mission is to help you build confidence in every single feed.</p>
                  <a href="/about" className="btn btn-primary">Get to Know Me</a>
                </div>
              </div>
            </section>

            {/* Services */}
            <section className="services section">
              <div className="container">
                <div className="section-head">
                  <h2>Support for your family, <em>one feed at a time</em></h2>
                  <p className="lead">Whether you are preparing for birth, adjusting to postpartum life, or looking for long-term guidance, our services are designed to bring clarity and peace back to your home.</p>
                </div>

                <div className="services-grid">
                  <article className="service-card">
                    <div className="zoom-frame">
                      <a href="/services/prenatal-services" className="service-card-img-link" aria-label="Learn more about Prenatal services">
                        <img src={prenatalHomeAsset.url} alt="Prenatal services" className="service-card-img img-placeholder--zoom" loading="lazy" />
                      </a>
                    </div>
                    <h3>Prenatal Services</h3>
                    <a href="/services/prenatal-services" className="btn btn-primary">More info</a>
                  </article>

                  <article className="service-card">
                    <div className="zoom-frame">
                      <a href="/services/lactation-consultations" className="service-card-img-link" aria-label="Learn more about Lactation Consultations">
                        <img src={lactationHomeAsset.url} alt="Lactation consultations" className="service-card-img img-placeholder--zoom" loading="lazy" />
                      </a>
                    </div>
                    <h3>Lactation Consultations</h3>
                    <a href="/services/lactation-consultations" className="btn btn-primary">More info</a>
                  </article>

                  <article className="service-card">
                    <div className="zoom-frame">
                      <a href="/services/packages" className="service-card-img-link" aria-label="Learn more about Packages">
                        <img src={packagesHomeAsset.url} alt="Packages" className="service-card-img img-placeholder--zoom" loading="lazy" />
                      </a>
                    </div>
                    <h3>Packages</h3>
                    <a href="/services/packages" className="btn btn-primary">More info</a>
                  </article>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section className="reviews section">
              <div className="container">
                <div className="section-head">
                  <h2>Kind words from families I've supported</h2>
                </div>

                <ReviewsCarousel />

              </div>
            </section>

            {/* FAQ */}
            <section className="faq section">
              <div className="container">
                <div className="faq-intro">
                  <p className="eyebrow">FAQs</p>
                  <h2><em>Clarity</em> before we begin</h2>
                  <p className="lead">Everything you need to know about setting up your feeding support, logistics, and how we work together.</p>
                </div>

                <div className="accordion">
                  <div className="accordion-item">
                    <h3>
                      <button type="button" className="accordion-trigger" aria-expanded="false" aria-controls="panel-approach">
                        Our Approach &amp; Philosophy
                        <span className="accordion-icon" aria-hidden="true"></span>
                      </button>
                    </h3>
                    <div className="accordion-panel-wrap" id="panel-approach">
                      <div className="accordion-panel-inner">
                        <div className="faq-entry">
                          <h4 className="faq-question">1. What is an IBCLC?</h4>
                          <p className="faq-answer">An IBCLC is an International Board Certified Lactation Consultant. IBCLCs are trained lactation professionals who support families with breastfeeding, milk supply, pumping, bottle feeding, and other feeding challenges.</p>
                          <h4 className="faq-question">2. Do you only help with breastfeeding?</h4>
                          <p className="faq-answer">No. Feed by Feed is about the whole feeding journey.<br />We support breastfeeding, pumping, bottle feeding, combo feeding, formula supplementation, starting solids, and weaning. Your feeding goals matter, and the plan should fit your real life, not someone else's idea of what feeding "should" look like.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h3>
                      <button type="button" className="accordion-trigger" aria-expanded="false" aria-controls="panel-consultations">
                        Consultations &amp; Process
                        <span className="accordion-icon" aria-hidden="true"></span>
                      </button>
                    </h3>
                    <div className="accordion-panel-wrap" id="panel-consultations">
                      <div className="accordion-panel-inner">
                        <div className="faq-entry">
                          <h4 className="faq-question">3. When should we book a lactation consultation?</h4>
                          <p className="faq-answer">You do not need to wait until there is a problem to get support.<br />Feeding is a new skill for both parent and baby. Prenatal support can help you feel more prepared, understand what to expect, know when to ask for help, and protect your feeding goals from the start.<br />You can also book anytime feeding feels painful, confusing, stressful, or not how you hoped it would feel. We can help with painful latch, nipple damage, low milk supply concerns, pumping, bottle feeding, supplementation, slow feeds, tongue tie concerns, introducing bottles, returning to work, solids, and weaning.</p>
                          <h4 className="faq-question">4. Do you offer virtual and in-home lactation support?</h4>
                          <p className="faq-answer">Yes. Feed by Feed offers virtual lactation consultations across Canada and internationally. We also offer in-home and in-hospital lactation support in Toronto and the GTA, depending on availability and location.<br />Virtual visits can be helpful for prenatal support, follow-ups, pumping, bottle feeding, milk supply, and troubleshooting. Home visits are helpful when you want hands-on support in your own space.</p>
                          <h4 className="faq-question">5. What happens during a consultation?</h4>
                          <p className="faq-answer">We start by talking through your feeding history, your concerns, and your goals. Depending on your situation, we may look at latch, positioning, milk transfer, pumping, bottle feeding, oral function, nipple pain, breast health, or supplementation.<br />After the visit, you will receive a personalized plan with clear next steps so you know what to focus on, one feed at a time.</p>
                          <h4 className="faq-question">6. Do you offer support in other languages?</h4>
                          <p className="faq-answer">Yes. Feed by Feed offers lactation and feeding support in English and Spanish.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h3>
                      <button type="button" className="accordion-trigger" aria-expanded="false" aria-controls="panel-clinical">
                        Clinical &amp; Specialized Concerns
                        <span className="accordion-icon" aria-hidden="true"></span>
                      </button>
                    </h3>
                    <div className="accordion-panel-wrap" id="panel-clinical">
                      <div className="accordion-panel-inner">
                        <div className="faq-entry">
                          <h4 className="faq-question">7. Can you help if we are worried about milk supply?</h4>
                          <p className="faq-answer">Yes. Milk supply concerns are one of the most common reasons families reach out.<br />We look at milk transfer, pumping, supplementation, baby's weight and diapers, and anything that may be affecting supply. Sometimes the issue is milk production, and sometimes baby is having a hard time removing milk well. Together, we will create a plan based on what your family needs.</p>
                          <h4 className="faq-question">8. Can you help with tongue tie or oral function concerns?</h4>
                          <p className="faq-answer">Yes. We do a thorough oral function assessment. If a referral is needed, we can help you understand the next steps and work alongside your baby's care team.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h3>
                      <button type="button" className="accordion-trigger" aria-expanded="false" aria-controls="panel-payments">
                        Payments &amp; Insurance
                        <span className="accordion-icon" aria-hidden="true"></span>
                      </button>
                    </h3>
                    <div className="accordion-panel-wrap" id="panel-payments">
                      <div className="accordion-panel-inner">
                        <div className="faq-entry">
                          <h4 className="faq-question">9. Are your services covered by insurance?</h4>
                          <p className="faq-answer">Our services are not directly covered by OHIP, but they may be covered by some private insurances, extended health benefits, or a Health Spending Account. Coverage depends on your individual plan, so we recommend checking with your insurance provider before booking.</p>
                          <h4 className="faq-question">10. What payment methods do you accept?</h4>
                          <p className="faq-answer">We accept all major credit card, e-transfer, and wire transfers.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="cta section">
              <div className="container">
                <div className="cta-content">
                  <p className="eyebrow">Ready to start?</p>
                  <h2>Every feeding journey is unique<br /><em>Let's find yours</em></h2>
                  <button type="button" className="btn btn-cream" disabled={true}>Book a consultation</button>
                  <p className="cta-footnote">Have questions? Contact us at <a href="/contact">hello@feedbyfeed.com</a></p>
                </div>
              </div>
            </section>
      </main>
    </SiteLayout>
  );
}
