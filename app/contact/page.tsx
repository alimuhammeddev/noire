import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact NOIRÉ about the collection, collaborations, or press.",
};

export default function ContactPage() {
  return (
    <>
      <section className="editorial-intro">
        <span className="eyebrow">NOIRÉ / GET IN TOUCH</span>
        <h1 className="page-title">Let&apos;s talk.</h1>
        <p className="page-intro-text">
          For questions about the collection, collaborations, press enquiries,
          or anything else, we&apos;d love to hear from you.
        </p>
      </section>
      <section className="contact-layout">
        <aside className="contact-aside">
          <span className="eyebrow">Contact details</span>
          <p>
            <a href="mailto:hello@example.com">hello@example.com</a>
          </p>
          <p>
            Find us on{" "}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>{" "}
            and{" "}
            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noreferrer"
            >
              Pinterest ↗
            </a>
            .
          </p>
        </aside>
        <ContactForm />
      </section>
    </>
  );
}
