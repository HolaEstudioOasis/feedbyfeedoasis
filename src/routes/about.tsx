import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";

const title = "About Alicia | Feed by Feed";
const description = "Meet Alicia, IBCLC and founder of Feed by Feed — a steady presence built around the whole family.";

export const Route = createFileRoute("/about")({
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
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <main>
        {/* Hero */}
            <section className="page-hero">
              <div className="container">
                <h1>A steady presence, built around <em>the whole family</em></h1>
              </div>
            </section>

            {/* The heart behind Feed by Feed */}
            <section className="story section">
              <div className="container story-grid">
                <div className="story-media">
                  <div className="img-placeholder"></div>
                </div>
                <div className="story-content">
                  <h2>The heart behind Feed by Feed</h2>
                  <p>Before becoming an IBCLC, I was already a nutrition professional, a healthcare provider, and a mother learning that feeding rarely follows a perfect plan. Every baby is different. Every family is different. What works for one child may not work for the next.</p>
                  <p>Over the years, one phrase naturally became part of almost every conversation I had with parents: <strong>One feed at a time.</strong> Not because feeding should feel slow—but because overwhelmed families don't need more information. They need someone who can help them focus on the next step.</p>
                  <p>That simple idea became Feed by Feed.</p>
                  <p>Today, I support families through breastfeeding, bottle feeding, pumping, combination feeding, starting solids, and gentle weaning—with practical guidance rooted in evidence, never judgment.</p>
                </div>
              </div>
            </section>

            {/* Before Feed by Feed became a practice */}
            <section className="story section">
              <div className="container story-grid">
                <div className="story-content">
                  <p>Before Feed by Feed became a practice, it was simply our home.</p>
                  <p>Like so many new parents, we stepped into those first days with questions, long nights, and more love than confidence. There wasn't a perfect plan—only two parents learning, adapting, and showing up for our babies, one feeding at a time.</p>
                  <p>My husband never stood on the sidelines. He became my teammate through every challenge, every small victory, and every moment that reminded me that feeding a baby is never one person's responsibility.</p>
                  <p>That experience shaped everything I believe today. Because when a family feels supported, a parent feels stronger. And when both parents are part of the journey, babies thrive.</p>
                  <p>Feeding a baby isn't something a mother should carry alone. It's something a family learns together.</p>
                </div>
                <div className="story-media">
                  <div className="img-placeholder"></div>
                </div>
              </div>
            </section>

            {/* Credentials */}
            <section className="credentials section">
              <div className="container">
                <div className="section-head">
                  <h2>Behind every recommendation is <em>years of learning</em></h2>
                  <p className="lead">Families place their trust in me during one of life's most vulnerable seasons. I believe that trust should always be met with experience, curiosity, and a commitment to lifelong learning.</p>
                </div>

                <div className="credentials-grid">
                  <div className="credential-card">
                    <h3>IBCLC</h3>
                    <p>International Board Certified Lactation Consultant</p>
                  </div>
                  <div className="credential-card">
                    <h3>Bachelor's degree in Nutrition</h3>
                  </div>
                  <div className="credential-card">
                    <h3>10+</h3>
                    <p>years of healthcare experience</p>
                  </div>
                  <div className="credential-card">
                    <h3>Bilingual Support</h3>
                    <p>English &amp; Spanish</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission section">
              <div className="container">
                <div className="section-head">
                  <h2>Personalized feeding support for every family</h2>
                  <p className="lead">Feed by Feed offers personalized lactation and infant feeding support tailored to your family's unique needs—not a one-size-fits-all approach.</p>
                  <p className="lead">Whether you're breastfeeding, pumping, combination feeding, bottle feeding, introducing solids, or preparing for your baby's arrival, you'll receive evidence-based guidance designed to help you feel confident every step of the way.</p>
                  <p className="lead">From in-home lactation consultations across Toronto and the GTA to virtual appointments throughout Canada, every recommendation is built around your baby, your lifestyle, and your family's goals.</p>
                </div>

                <div className="mission-grid">
                  <div className="mission-card">
                    <p className="eyebrow eyebrow--ocre">Our mission</p>
                    <p>To provide comprehensive guidance and support to families throughout their infant feeding journey, transforming feeding decisions into a shared family effort and empowering caregivers with the knowledge and confidence they need.</p>
                  </div>
                  <div className="mission-card">
                    <p className="eyebrow eyebrow--ocre">Our vision</p>
                    <p>To become Canada's most trusted family-centered infant feeding consultancy, empowering families with compassionate, evidence-based care while expanding our reach across the United States and Mexico within the next five years.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="cta section">
              <div className="container">
                <div className="cta-content">
                  <h2>Ready to feel more confident<br />about feeding your baby?</h2>
                  <button type="button" className="btn btn-cream" disabled={true}>Book a consultation</button>
                  <p className="cta-footnote">Have questions? Contact us at <a href="/contact">hello@feedbyfeed.com</a></p>
                </div>
              </div>
            </section>
      </main>
    </SiteLayout>
  );
}
