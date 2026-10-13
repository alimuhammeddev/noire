"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice, products, type Product } from "@/lib/products";
import { useStore } from "@/components/store-context";
import { ProductGrid } from "@/components/site";

export default function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useStore();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);

  function addToBag() {
    if (!size) {
      setStatus("Please choose a size before adding this piece to your bag.");
      return;
    }
    addItem({ productId: product.id, size, color, quantity });
    setStatus(`${product.name} added to your bag.`);
  }

  return (
    <>
      <div className="product-layout">
        <div className="product-gallery">
          {product.images.map((src, index) => <Image key={src} src={src} width={1200} height={1500} sizes="(max-width: 900px) 100vw, 50vw" alt={`${product.name}, view ${index + 1}`} priority={index === 0} />)}
        </div>
        <div className="product-info">
          <div className="breadcrumb"><Link href="/collections">Collection</Link> &nbsp;/&nbsp; {product.category}</div>
          <h1>{product.name}</h1>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="product-description">{product.description}</p>
          <div className="option-group">
            <div className="option-label">Color <span>{color}</span></div>
            <div className="color-options">{product.colors.map((option) => <button key={option} className={color === option ? "selected" : ""} onClick={() => setColor(option)} aria-pressed={color === option}>{option}</button>)}</div>
          </div>
          <div className="option-group">
            <div className="option-label">Select size <span>{size || "Required"}</span></div>
            <div className="size-options">{product.sizes.map((option) => <button key={option} className={size === option ? "selected" : ""} onClick={() => { setSize(option); setStatus(""); }} aria-pressed={size === option}>{option}</button>)}</div>
            <span className="size-guide-link">Size guide</span>
          </div>
          <div className="option-group">
            <div className="option-label">Quantity</div>
            <div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button><input aria-label="Quantity" inputMode="numeric" value={quantity} onChange={(event) => { const next = Number(event.target.value); if (Number.isInteger(next) && next > 0) setQuantity(next); }} /><button aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}>+</button></div>
          </div>
          <button className="button button-dark add-button" onClick={addToBag}>Add to Bag <span>→</span></button>
          <p className="inline-status" role="status" aria-live="polite">{status}</p>
          <div className="product-accordions">
            <details><summary>Product details</summary><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details>
            <details><summary>Materials</summary><p>{product.material} All material information is illustrative sample product data.</p></details>
            <details><summary>Delivery &amp; returns</summary><p>Free standard shipping on orders over $150, delivered in 3–5 business days. Express delivery is available at checkout. Returns are accepted within 30 days of delivery for unworn items with their original tags attached, and refunds are issued to your original payment method within 5–7 business days.</p></details>
          </div>
        </div>
      </div>
      <section className="section related-section"><span className="eyebrow">A considered pairing</span><h2>You may also like</h2><ProductGrid items={related.length ? related : products.filter((item) => item.id !== product.id).slice(0, 4)} /></section>
    </>
  );
}
