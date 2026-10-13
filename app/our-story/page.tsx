import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The perspective and design principles behind NOIRÉ.",
};

export default function OurStoryPage() {
  return (
    <>
      <section className="editorial-intro">
        <span className="eyebrow">NOIRÉ / OUR PERSPECTIVE</span>
        <h1 className="page-title">Clarity in every detail.</h1>
        <p className="page-intro-text">
          NOIRÉ was imagined around a simple idea: personal style does not need
          to be complicated. It needs intention. We create a considered wardrobe
          of contemporary essentials designed to work together, feel natural,
          and remain relevant beyond a single season.
        </p>
      </section>
      <section className="editorial-split">
        <Image
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
          alt="Portrait in understated contemporary styling"
          width={1200}
          height={1500}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <div className="editorial-copy">
          <span className="eyebrow">01 / Our Philosophy</span>
          <h2>
            Room for
            <br />
            <em>your own point of view.</em>
          </h2>
          <p>
            We believe that the strongest wardrobes are built with intention.
            Thoughtful proportions, versatile pieces, and carefully considered
            details allow personal style to develop naturally.
          </p>
        </div>
      </section>
      <section className="principles">
        <span className="eyebrow">02 / Our Design Principles</span>
        <h2>Keep what matters.</h2>
        <ul>
          <li>Simplicity over excess.</li>
          <li>Versatility over passing trends.</li>
          <li>Thoughtful details over unnecessary decoration.</li>
          <li>Personal expression over rigid rules.</li>
        </ul>
      </section>
      <section className="editorial-split">
        <div className="editorial-copy">
          <span className="eyebrow">03 / Our Perspective</span>
          <h2>
            Style lives
            <br />
            <em>in the everyday.</em>
          </h2>
          <p>
            Fashion is part of everyday life. The way a garment moves, the
            texture of its fabric, and the ease with which it fits into a
            wardrobe can change how it feels to wear it. NOIRÉ explores those
            small but meaningful details.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
          alt="A model in a minimal look against a warm architectural wall"
          width={1200}
          height={1500}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </section>
    </>
  );
}
