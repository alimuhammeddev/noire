"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { formatPrice, products } from "@/lib/products";
import "./checkout.css";
import { useStore } from "@/components/store-context";

type Field =
  | "email"
  | "firstName"
  | "lastName"
  | "address"
  | "city"
  | "postcode"
  | "country"
  | "cardName"
  | "cardNumber"
  | "expiry"
  | "cvc";
type Errors = Partial<Record<Field, string>>;
type Order = {
  number: string;
  email: string;
  total: number;
  count: number;
  delivery: string;
  address: string;
};

const shippingOptions = [
  {
    id: "standard",
    label: "Standard delivery",
    detail: "3–5 business days",
    price: 0,
  },
  {
    id: "express",
    label: "Express delivery",
    detail: "1–2 business days",
    price: 25,
  },
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "France",
  "Germany",
  "Nigeria",
];

function formatCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2
    ? `${digits.slice(0, 2)} / ${digits.slice(2)}`
    : digits;
}

function createOrderNumber() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  return `NR-${part}`;
}

export default function Checkout() {
  const { items, ready, clearBag } = useStore();
  const [errors, setErrors] = useState<Errors>({});
  const [shipping, setShipping] = useState("standard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const bagItems = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ item, product }] : [];
  });
  const subtotal = bagItems.reduce(
    (sum, { item, product }) => sum + item.quantity * product.price,
    0,
  );
  const shippingOption =
    shippingOptions.find((option) => option.id === shipping) ??
    shippingOptions[0];
  const total = subtotal + shippingOption.price;

  useEffect(() => {
    if (!order) return;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [order]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (name: string) => String(form.get(name) ?? "").trim();
    const next: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email")))
      next.email = "Enter a valid email address.";
    if (!get("firstName")) next.firstName = "Enter your first name.";
    if (!get("lastName")) next.lastName = "Enter your last name.";
    if (!get("address")) next.address = "Enter your street address.";
    if (!get("city")) next.city = "Enter your city.";
    if (!get("postcode")) next.postcode = "Enter your postcode.";
    if (!get("cardName")) next.cardName = "Enter the name on your card.";
    if (cardNumber.replace(/\s/g, "").length !== 16)
      next.cardNumber = "Enter a 16-digit card number.";
    const [month, year] = expiry.split(" / ");
    if (
      !month ||
      !year ||
      year.length !== 2 ||
      Number(month) < 1 ||
      Number(month) > 12
    )
      next.expiry = "Use MM / YY.";
    if (!/^\d{3,4}$/.test(get("cvc")))
      next.cvc = "Enter the 3 or 4 digit code.";
    setErrors(next);

    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (
        event.currentTarget.elements.namedItem(first) as HTMLElement | null
      )?.focus();
      return;
    }

    setPlacing(true);
    window.setTimeout(() => {
      setOrder({
        number: createOrderNumber(),
        email: get("email"),
        total,
        count: bagItems.reduce((sum, { item }) => sum + item.quantity, 0),
        delivery: `${shippingOption.label} · ${shippingOption.detail}`,
        address: `${get("address")}, ${get("city")}, ${get("postcode")}, ${get("country")}`,
      });
      clearBag();
      setPlacing(false);
    }, 900);
  }

  function input(
    name: Field,
    label: string,
    extra: {
      type?: string;
      autoComplete?: string;
      value?: string;
      onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
      inputMode?: "numeric";
      placeholder?: string;
      maxLength?: number;
      full?: boolean;
    } = {},
  ) {
    const { full, ...rest } = extra;
    return (
      <div className={full ? "field full" : "field"}>
        <label htmlFor={`co-${name}`}>{label}</label>
        <input
          id={`co-${name}`}
          name={name}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={`co-${name}-error`}
          {...rest}
        />
        <span className="field-error" id={`co-${name}-error`}>
          {errors[name]}
        </span>
      </div>
    );
  }

  if (!order && ready && bagItems.length === 0) {
    return (
      <section className="not-found">
        <span className="eyebrow">NOIRÉ / CHECKOUT</span>
        <h1>Your bag is empty.</h1>
        <p>Add a piece to your bag before checking out.</p>
        <Link className="button button-dark" href="/collections">
          Explore the Collection <span>→</span>
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <span className="eyebrow">NOIRÉ / SECURE CHECKOUT</span>
      <h1>Checkout</h1>
      <div className="checkout-columns">
        <form className="checkout-form" onSubmit={submit} noValidate>
          <fieldset>
            <legend>
              <span>1</span>Contact
            </legend>
            <div className="checkout-grid">
              {input("email", "Email address", {
                type: "email",
                autoComplete: "email",
                full: true,
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span>2</span>Delivery address
            </legend>
            <div className="checkout-grid">
              {input("firstName", "First name", { autoComplete: "given-name" })}
              {input("lastName", "Last name", { autoComplete: "family-name" })}
              {input("address", "Street address", {
                autoComplete: "street-address",
                full: true,
              })}
              {input("city", "City", { autoComplete: "address-level2" })}
              {input("postcode", "Postcode", { autoComplete: "postal-code" })}
              <div className="field full">
                <label htmlFor="co-country">Country</label>
                <select
                  id="co-country"
                  name="country"
                  defaultValue={countries[0]}
                  autoComplete="country-name"
                >
                  {countries.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span>3</span>Delivery method
            </legend>
            <div className="shipping-options">
              {shippingOptions.map((option) => (
                <label
                  key={option.id}
                  className={
                    shipping === option.id
                      ? "shipping-option selected"
                      : "shipping-option"
                  }
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={shipping === option.id}
                    onChange={() => setShipping(option.id)}
                  />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.detail}</small>
                  </span>
                  <em>
                    {option.price === 0 ? "Free" : formatPrice(option.price)}
                  </em>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span>4</span>Payment
            </legend>
            <div className="checkout-grid">
              {input("cardName", "Name on card", {
                autoComplete: "cc-name",
                full: true,
              })}
              {input("cardNumber", "Card number", {
                autoComplete: "cc-number",
                inputMode: "numeric",
                placeholder: "0000 0000 0000 0000",
                value: cardNumber,
                onChange: (event) =>
                  setCardNumber(formatCard(event.target.value)),
                full: true,
              })}
              {input("expiry", "Expiry", {
                autoComplete: "cc-exp",
                inputMode: "numeric",
                placeholder: "MM / YY",
                value: expiry,
                onChange: (event) =>
                  setExpiry(formatExpiry(event.target.value)),
              })}
              {input("cvc", "Security code", {
                autoComplete: "cc-csc",
                inputMode: "numeric",
                maxLength: 4,
                placeholder: "123",
              })}
            </div>
          </fieldset>

          <button
            className="button button-dark checkout-submit"
            type="submit"
            disabled={placing}
          >
            {placing
              ? "Placing your order…"
              : `Place order · ${formatPrice(total)}`}
          </button>
        </form>

        <aside className="checkout-summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <ul>
            {bagItems.map(({ item, product }) => (
              <li key={item.key}>
                <div className="checkout-thumb">
                  <Image
                    src={product.images[0]}
                    alt=""
                    width={64}
                    height={80}
                    sizes="64px"
                  />
                  <span>{item.quantity}</span>
                </div>
                <div>
                  <strong>{product.name}</strong>
                  <small>
                    {item.size} · {item.color}
                  </small>
                </div>
                <span>{formatPrice(product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="bag-summary-line">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="bag-summary-line">
            <span>Shipping</span>
            <span>
              {shippingOption.price === 0
                ? "Free"
                : formatPrice(shippingOption.price)}
            </span>
          </div>
          <div className="bag-summary-line">
            <span>Tax</span>
            <span>{formatPrice(0)}</span>
          </div>
          <div className="bag-summary-line bag-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link className="checkout-back" href="/bag">
            ← Back to bag
          </Link>
        </aside>
      </div>

      {order && (
        <div className="order-overlay">
          <div
            className="order-dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            tabIndex={-1}
          >
            <div className="order-check" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </div>
            <span className="eyebrow">Order confirmed</span>
            <h2 id="order-title">Thank you for your order.</h2>
            <p className="order-lead">
              A confirmation has been sent to <strong>{order.email}</strong>.
            </p>
            <div className="order-number">
              <small>Order number</small>
              <strong>{order.number}</strong>
            </div>
            <dl className="order-details">
              <div>
                <dt>Items</dt>
                <dd>{order.count}</dd>
              </div>
              <div>
                <dt>Total paid</dt>
                <dd>{formatPrice(order.total)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>{order.delivery}</dd>
              </div>
              <div>
                <dt>Shipping to</dt>
                <dd>{order.address}</dd>
              </div>
            </dl>
            <p className="order-note">
              Keep your order number to hand if you contact us about this order.
              Returns are accepted within 30 days of delivery for unworn items
              with tags attached.
            </p>
            <div className="order-actions">
              <Link className="button button-dark" href="/collections">
                Continue shopping <span>→</span>
              </Link>
              <Link className="order-home" href="/">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
