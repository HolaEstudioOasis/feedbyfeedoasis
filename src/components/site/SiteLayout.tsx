import { useEffect, type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Wires the small vanilla behaviors that came with the original HTML pages:
 * the FAQ accordion and the (intentionally inert) newsletter form.
 */
function useLegacyPageBehaviors() {
  useEffect(() => {
    const triggers = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".accordion-trigger"),
    );
    const onTriggerClick = (event: Event) => {
      const trigger = event.currentTarget as HTMLElement;
      const item = trigger.closest(".accordion-item");
      if (!item) return;
      const isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };
    triggers.forEach((trigger) => trigger.addEventListener("click", onTriggerClick));

    return () => {
      triggers.forEach((trigger) => trigger.removeEventListener("click", onTriggerClick));
    };
  }, []);
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  useLegacyPageBehaviors();

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
