"use client";

import { useState, type FormEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "type" | "subject" | "message", string>>;

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      type: String(form.get("type") ?? ""),
      subject: String(form.get("subject") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
    };
    const next: Errors = {};
    if (!values.name) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.type) next.type = "Choose an enquiry type.";
    if (!values.subject) next.subject = "Please add a subject.";
    if (!values.message) next.message = "Please add a message.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("Please review the highlighted fields.");
      return;
    }
    setStatus("This demo form is not connected to an inbox, so your message has not been sent.");
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="field"><label htmlFor="contact-name">Full name</label><input id="contact-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby="name-error" />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div>
      <div className="field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby="email-error" />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</div>
      <div className="field"><label htmlFor="contact-type">Enquiry type</label><select id="contact-type" name="type" defaultValue="" aria-invalid={Boolean(errors.type)} aria-describedby="type-error"><option value="" disabled>Select an enquiry</option><option>Product enquiry</option><option>Order support</option><option>Press</option><option>Collaboration</option><option>General enquiry</option></select>{errors.type && <span className="field-error" id="type-error">{errors.type}</span>}</div>
      <div className="field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" aria-invalid={Boolean(errors.subject)} aria-describedby="subject-error" />{errors.subject && <span className="field-error" id="subject-error">{errors.subject}</span>}</div>
      <div className="field full"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" aria-invalid={Boolean(errors.message)} aria-describedby="message-error" />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</div>
      <button className="button button-dark" type="submit">Review enquiry <span>→</span></button>
      <p className="contact-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}
