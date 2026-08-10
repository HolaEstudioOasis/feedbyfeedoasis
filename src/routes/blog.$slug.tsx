import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";
import { getPublishedPost } from "@/lib/blog.functions";
import { formatPostDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPublishedPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const post = loaderData as BlogPost | undefined;
    if (!post) {
      return { meta: [{ title: "Not found | Feed by Feed" }, { name: "robots", content: "noindex" }] };
    }
    const title = post.meta_title || `${post.title} | Feed by Feed`;
    const description = post.meta_description || post.excerpt || "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostDetail,
});

function PostNotFound() {
  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="container">
            <h1>Post not found</h1>
            <p className="lead">This article isn't available.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Link to="/blog" className="btn btn-dark">Back to the blog</Link>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

function PostDetail() {
  const post = Route.useLoaderData() as BlogPost;

  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">
              {post.category ? post.category : "Blog"} · {formatPostDate(post.published_at)}
            </p>
            <h1>{post.title}</h1>
            {post.excerpt ? <p className="lead">{post.excerpt}</p> : null}
          </div>
        </section>

        <section className="section post-detail">
          <div className="container post-detail-container">
            {post.featured_image_url ? (
              <img
                className="post-detail-img"
                src={post.featured_image_url}
                alt={post.title}
              />
            ) : null}

            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
            />

            {post.tags && post.tags.length > 0 ? (
              <ul className="post-tags">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}

            <p className="post-back">
              <Link to="/blog" className="post-read-more">Back to the blog</Link>
            </p>
          </div>
        </section>

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
