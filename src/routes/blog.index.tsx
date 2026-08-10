import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";
import { listPublishedPosts } from "@/lib/blog.functions";
import { formatPostDate } from "@/lib/blog";
import type { BlogListItem } from "@/lib/blog.server";

const title = "Blog | Feed by Feed";
const description = "Guidance and resources for growing families.";

export const Route = createFileRoute("/blog/")({
  loader: async () => await listPublishedPosts(),
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
  component: Blog,
});

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

function Blog() {
  const posts = Route.useLoaderData() as BlogListItem[];

  return (
    <SiteLayout>
      <main>
        {/* Hero */}
            <section className="page-hero">
              <div className="container">
                <h1>Blog</h1>
                <p className="lead">Guidance and resources for growing families.</p>
              </div>
            </section>

            {/* Latest post */}
            <section className="blog-posts section">
              <div className="container">
                <h2>Latest post</h2>

                {posts.length === 0 ? (
                  <p className="post-desc">New articles are on the way. Check back soon.</p>
                ) : (
                  <div className="posts-grid">
                    {posts.map((post) => (
                      <article className="post-card" key={post.id}>
                        {post.featured_image_url ? (
                          <img
                            className="post-card-img"
                            src={post.featured_image_url}
                            alt={post.title}
                            loading="lazy"
                          />
                        ) : (
                          <div className="img-placeholder"></div>
                        )}
                        <p className="post-date">{formatPostDate(post.published_at)}</p>
                        <h3>{post.title}</h3>
                        {post.excerpt ? <p className="post-desc">{post.excerpt}</p> : null}
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="post-read-more"
                        >
                          Read more
                          <ArrowIcon />
                        </Link>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter section">
              <div className="container newsletter-grid">
                <div className="newsletter-content">
                  <h2>Join our <em>Newsletter</em></h2>
                  <p>Get expert, judgment-free feeding tips and parenthood insights delivered to your inbox monthly.</p>
                </div>

                <form className="newsletter-form blog-newsletter-form">
                  <div className="newsletter-form-row">
                    <div>
                      <label className="field-label" htmlFor="blog-first-name">Name</label>
                      <input type="text" id="blog-first-name" name="firstName" placeholder="Name" required={true} />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="blog-last-name">Last name</label>
                      <input type="text" id="blog-last-name" name="lastName" placeholder="Last name" required={true} />
                    </div>
                  </div>
                  <div className="newsletter-field">
                    <label className="field-label" htmlFor="blog-email">Email</label>
                    <input type="email" id="blog-email" name="email" placeholder="Email" required={true} />
                  </div>
                  <button type="submit" className="btn btn-dark">Join</button>
                </form>
              </div>
            </section>

            {/* CTA */}
            <section className="cta section">
              <div className="container">
                <div className="cta-content">
                  <p className="eyebrow">Ready to start?</p>
                  <h2>Explore personalized support for your feeding journey.</h2>
                  <a href="/services/prenatal-services" className="btn btn-cream">Explore Our Services</a>
                  <p className="cta-footnote">Have questions? Contact us at <a href="/contact">hello@feedbyfeed.com</a></p>
                </div>
              </div>
            </section>
      </main>
    </SiteLayout>
  );
}
