"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { formatPrice, products, type Product } from "@/lib/products";
import { useStore } from "@/components/store-context";

export function Header() {
  const router = useRouter();
  const { count } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    router.push(term ? `/collections?search=${encodeURIComponent(term)}` : "/collections");
    setSearchOpen(false);
  }

  return (
    <header className="site-header">
      <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span />
      </button>
      <nav className="nav-left" aria-label="Main navigation">
        <Link href="/collections">Collections</Link>
        <Link href="/campaigns">Campaigns</Link>
      </nav>
      <Link className="wordmark" href="/" aria-label="NOIRÉ home">NOIRÉ</Link>
      <nav className="nav-right" aria-label="Brand navigation">
        <Link href="/our-story">Our Story</Link>
        <button className="search-toggle" aria-label="Search the collection" aria-expanded={searchOpen} onClick={() => setSearchOpen(!searchOpen)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m15.4 15.4 5 5" /></svg>
        </button>
        <Link className="bag-link" href="/bag" aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 8h13l1 12h-15l1-12Z" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
          </svg>
          <span className="bag-count" aria-hidden="true">{count}</span>
        </Link>
      </nav>
      {searchOpen && (
        <>
          <button className="search-backdrop" aria-label="Close search" tabIndex={-1} onClick={() => setSearchOpen(false)} />
          <div className="search-panel" onKeyDown={(event) => event.key === "Escape" && setSearchOpen(false)}>
            <form role="search" onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="site-search">Search the collection</label>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m15.4 15.4 5 5" /></svg>
              <input id="site-search" autoFocus autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" />
              <button type="submit">Search</button>
              <button type="button" className="search-close" aria-label="Close search" onClick={() => setSearchOpen(false)}>×</button>
            </form>
            <div className="search-suggestions">
              <span>Popular</span>
              {["Overshirt", "Blazer", "Knit", "Denim", "Tote"].map((term) => (
                <Link key={term} href={`/collections?search=${term}`} onClick={() => setSearchOpen(false)}>{term}</Link>
              ))}
            </div>
          </div>
        </>
      )}
      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          <Link href="/collections" onClick={() => setMenuOpen(false)}>Collections</Link>
          <Link href="/campaigns" onClick={() => setMenuOpen(false)}>Campaigns</Link>
          <Link href="/our-story" onClick={() => setMenuOpen(false)}>Our Story</Link>
          <Link href="/collections" onClick={() => setMenuOpen(false)}>Search the Collection</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="wordmark footer-mark" href="/">NOIRÉ</Link>
          <p>Style without compromise.</p>
        </div>
        <div className="footer-links">
          <div><span className="footer-label">Explore</span><Link href="/collections">Collections</Link><Link href="/campaigns">Campaigns</Link><Link href="/our-story">Our Story</Link></div>
          <div><span className="footer-label">Information</span><Link href="/contact">Contact</Link><span aria-disabled="true">Shipping &amp; Returns</span><span aria-disabled="true">Privacy Policy</span><span aria-disabled="true">Size Guide</span></div>
          <div><span className="footer-label">Follow</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">Pinterest ↗</a><a href="/#newsletter">Newsletter</a></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 NOIRÉ.</span><span>Designed for the everyday.</span></div>
    </footer>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-image-wrap" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <Image className="product-image" src={product.images[0]} alt={`${product.name} in ${product.colors[0]}`} fill sizes="(max-width: 620px) 50vw, (max-width: 900px) 33vw, 25vw" />
        {product.isNew && <span className="product-tag">New</span>}
        <span className="product-view">View piece <span aria-hidden="true">↗</span></span>
      </Link>
      <div className="product-card-meta"><div><Link href={`/products/${product.slug}`}>{product.name}</Link><span>{product.category} · {product.colors[0]}</span></div><span>{formatPrice(product.price)}</span></div>
    </article>
  );
}

export function ProductGrid({ items = products }: { items?: Product[] }) {
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessage("Enter a valid email address to continue.");
      setIsError(true);
      return;
    }
    setMessage("Thank you — this demo does not store or send email addresses.");
    setIsError(false);
    setEmail("");
  }
  return (
    <form className="newsletter-form" onSubmit={submit} noValidate>
      <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
      <input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-describedby="newsletter-status" />
      <button className="button button-light" type="submit">Join the List <span aria-hidden="true">→</span></button>
      <p id="newsletter-status" className={isError ? "form-message error" : "form-message"} aria-live="polite">{message}</p>
    </form>
  );
}
