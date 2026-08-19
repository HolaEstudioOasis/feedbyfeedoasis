import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";
import about1Asset from "@/assets/about-1.webp.asset.json";
import about2Asset from "@/assets/about-2.webp.asset.json";

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
                <h1>Feeding support for the whole family, <em>one feed at a time</em></h1>
              </div>
            </section>

            {/* The heart behind Feed by Feed */}
            <section className="story section">
              <div className="container story-grid">
                <div className="story-media">
                  <img src={about1Asset.url} alt="Alicia breastfeeding her toddler" className="story-img" loading="lazy" />
                </div>
                <div className="story-content">
                  <h2>The heart behind Feed by Feed</h2>
                  <p>I came to lactation through nutrition, years of working with families, and my own experience as a mother learning that feeding rarely follows a perfect plan and that good support isn't about telling a family what they "should" do. It's about understanding what matters to them and building a plan they can actually live with. Every baby is different. Every family is different. What works for one child may not work for the next.</p>
                  <p>Over the years, one phrase naturally became part of so many conversations I had with parents: take it one feed at a time. Feeding is rarely linear. Some feeds go well, others feel harder, and progress doesn't always happen in a straight line. When feeding feels overwhelming, sometimes you need someone to help you make sense of it all, see the bigger picture, and focus on the next step.</p>
                  <p>That simple idea became Feed by Feed.</p>
                  <p>Today, I support families through breastfeeding, bottle feeding, pumping, combination feeding, starting solids, and weaning, with practical guidance rooted in evidence and never judgment.</p>

                </div>
              </div>
            </section>

            {/* Before Feed by Feed became a practice */}
            <section className="story section">
              <div className="container story-grid">
                <div className="story-content">
                  <p>Before Feed by Feed became a practice, it was simply our home.</p>
                  <p>Like so many new parents, we stepped into those first weeks with questions, long nights, and more love than confidence. We were two parents learning, adapting, and showing up for our babies, one feeding at a time. My husband was my teammate through all of it, sharing the responsibility and helping me feel like I wasn't doing it alone.</p>
                  <p>My mom was another huge part of that support. In those early weeks, while I was learning, practicing, and trying to get feeding to work, she helped hold everything else together so I could focus on my baby and my goals. I still tell her that her support made a real difference in helping me get there.</p>
                  <p>That shaped the way I work today: feeding support should include the family and the people around you. It's something families learn and adapt to together, and no parent should feel like they have to carry it alone.</p>

                </div>
                <div className="story-media">
                  <img src={about2Asset.url} alt="Alicia with her husband and children" className="story-img" loading="lazy" />
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
                    <h3>Bachelor's degree in Clinical Nutrition</h3>
                  </div>
                  <div className="credential-card">
                    <h3>10+ years</h3>
                    <p>across nutrition, healthcare and family education</p>
                  </div>
                  <div className="credential-card">
                    <h3>Bilingual care</h3>
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
                  <p className="lead">Feed by Feed offers personalized lactation and infant feeding support built around your family, not a one-size-fits-all approach.</p>
                  <p className="lead">Whether you're breastfeeding, pumping, combination feeding, bottle feeding, introducing solids, weaning, or preparing for your baby's arrival, you'll receive practical, evidence-based guidance to help you feel confident every step of the way.</p>
                  <p className="lead">From in-home lactation consultations across Toronto and the GTA to virtual appointments anywhere you are, every recommendation is built around your baby, your family, and what matters most to you.</p>
                </div>

                <div className="mission-grid mission-grid--single">
                  <div className="mission-card">
                    <p className="eyebrow eyebrow--ocre">Our Purpose</p>
                    <p>To make feeding feel less overwhelming by giving families practical, evidence-based support that respects their goals, their choices, and real life.</p>
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
                  <p className="cta-footnote">Have questions? Contact us at <a href="mailto:hello@feedbyfeed.com">hello@feedbyfeed.com</a></p>
                </div>
              </div>
            </section>
      </main>
    </SiteLayout>
  );
}
