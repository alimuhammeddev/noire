import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><span className="eyebrow">NOIRÉ / 404</span><h1>Not found.</h1><p>This page or piece is no longer here.</p><Link className="button button-dark" href="/collections">Return to the collection <span>→</span></Link></section>;
}
