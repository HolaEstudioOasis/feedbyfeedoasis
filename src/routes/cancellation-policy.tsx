import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";

const title = "Cancellation Policy | Feed by Feed";
const description =
  "Our cancellation and rescheduling policy for Feed by Feed lactation consultations is being finalized.";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: CancellationPolicy,
});

function CancellationPolicy() {
  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="container">
            <h1>Cancellation Policy</h1>
          </div>
        </section>

        <section className="legal section legal-placeholder">
          <div className="container">
            <p className="lead">
              We're currently finalizing this policy. If you have any questions in the meantime,
              please reach out at{" "}
              <a href="mailto:hello@feedbyfeed.com">hello@feedbyfeed.com</a> and we'll be happy to
              help.
            </p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
