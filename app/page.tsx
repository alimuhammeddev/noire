
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { NewsletterForm, ProductGrid } from "@/components/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=90" alt="Model in a refined neutral look against a quiet architectural backdrop" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="eyebrow light">The new collection · 2026</span>
          <h1>Less,<br />but better.</h1>
          <p>Considered essentials. Refined silhouettes.<br />A quieter expression of modern style.</p>
          <div className="hero-actions"><Link className="button button-light" href="/collections">Explore the Collection <span>↗</span></Link><Link className="text-link light-link" href="/our-story">Discover NOIRÉ <span>→</span></Link></div>
        </div>
        <span className="hero-index">01 — 04 &nbsp; / &nbsp; THE EVERYDAY EDIT</span>
        <span className="hero-side-note">FORM / FUNCTION / FEELING</span>
      </section>

      <section className="section collection-preview">
        <div className="section-heading">
          <div><span className="eyebrow">The collection · 01</span><h2>Selected for<br className="desktop-break" /> the season.</h2></div>
          <div className="heading-aside"><p>Pieces designed to move effortlessly through your everyday.</p><Link className="text-link" href="/collections">View all pieces <span>↗</span></Link></div>
        </div>
        <ProductGrid items={products.slice(0, 4)} />
      </section>

      <section className="philosophy-section">
        <div className="philosophy-image"><Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85" alt="Contemporary looks in soft natural light" fill sizes="(max-width: 900px) 100vw, 50vw" /><span className="image-caption">A STUDY IN EVERYDAY FORM</span></div>
        <div className="philosophy-copy"><span className="eyebrow">Our approach · 02</span><h2>Made to be worn.<br /><em>Designed to endure.</em></h2><p>At NOIRÉ, we believe great style begins with thoughtful choices. Every silhouette, texture, and detail has a purpose. Our approach is rooted in simplicity, versatility, and the confidence that comes from wearing pieces that feel unmistakably your own.</p><Link className="text-link" href="/our-story">Discover our story <span>↗</span></Link><span className="section-number">02 / 04</span></div>
      </section>

      <section className="campaign-feature">
        <Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=85" alt="Model wearing modern tailoring in an urban setting" fill sizes="100vw" />
        <div className="campaign-feature-copy"><span className="eyebrow light">Campaign 01 · Form study</span><h2>Form in<br /><em>Motion</em></h2><p>An exploration of proportion, movement, and the everyday uniform.</p><Link className="text-link light-link" href="/campaigns">View the campaign <span>↗</span></Link></div>
        <span className="campaign-mark">NOIRÉ / 26</span>
      </section>

      <section className="values-section section">
        <div className="values-intro"><span className="eyebrow">A point of view · 03</span><h2>Less noise.<br /><em>More meaning.</em></h2></div>
        <div className="values-list">
          <article><span>01</span><div><h3>Intentional Design</h3><p>Every detail earns its place.</p></div><span className="value-arrow">↗</span></article>
          <article><span>02</span><div><h3>Everyday Versatility</h3><p>Considered pieces for changing moments.</p></div><span className="value-arrow">↗</span></article>
          <article><span>03</span><div><h3>Lasting Style</h3><p>Less noise. More character.</p></div><span className="value-arrow">↗</span></article>
        </div>
      </section>

      <section className="newsletter-section" id="newsletter">
        <div><span className="eyebrow light">A note, now and then</span><h2>Notes from<br /><em>NOIRÉ.</em></h2></div>
        <div className="newsletter-copy"><p>New collections, editorial stories, and considered inspiration, delivered occasionally.</p><NewsletterForm /></div>
      </section>
    </>
  );
}
