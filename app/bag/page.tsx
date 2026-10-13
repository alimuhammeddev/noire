"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, products } from "@/lib/products";
import { useStore } from "@/components/store-context";

export default function BagPage() {
  const { items, ready, updateQuantity, removeItem } = useStore();
  const bagItems = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ item, product }] : [];
  });
  const subtotal = bagItems.reduce(
    (sum, { item, product }) => sum + item.quantity * product.price,
    0,
  );

  return (
    <section className="bag-page">
      <span className="eyebrow">NOIRÉ / YOUR SELECTION</span>
      <h1>Your Bag</h1>
      {!ready ? (
        <p className="demo-note">Restoring your bag…</p>
      ) : bagItems.length === 0 ? (
        <div className="empty-state">
          <h2>Your bag is taking a moment.</h2>
          <p>There are no pieces in your bag just yet.</p>
          <Link className="button button-dark" href="/collections">
            Explore the Collection <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="bag-columns">
          <div>
            {bagItems.map(({ item, product }) => (
              <article className="bag-item" key={item.key}>
                <Link href={`/products/${product.slug}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={110}
                    height={138}
                    sizes="110px"
                  />
                </Link>
                <div>
                  <h2>
                    <Link href={`/products/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h2>
                  <p>
                    Size: {item.size} &nbsp; · &nbsp; Color: {item.color}
                  </p>
                  <p>{formatPrice(product.price)}</p>
                  <div className="quantity-control">
                    <button
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() =>
                        item.quantity > 1 &&
                        updateQuantity(item.key, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <input
                      aria-label={`${product.name} quantity`}
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      aria-label={`Increase ${product.name} quantity`}
                      onClick={() =>
                        updateQuantity(item.key, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p>
                    <button
                      className="bag-remove"
                      onClick={() => removeItem(item.key)}
                    >
                      Remove
                    </button>
                  </p>
                </div>
                <strong>{formatPrice(product.price * item.quantity)}</strong>
              </article>
            ))}
          </div>
          <aside className="bag-summary">
            <h2>Summary</h2>
            <div className="bag-summary-line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="bag-summary-line">
              <span>Tax</span>
              <span>{formatPrice(0)}</span>
            </div>
            <div className="bag-summary-line bag-total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link className="button button-dark" href="/checkout">
              Continue to checkout <span>→</span>
            </Link>
            <p>
              <Link href="/collections">Continue shopping</Link>
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
