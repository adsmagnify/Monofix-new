"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const params = useSearchParams();
  const region = params.get("region");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const regionNote = useMemo(() => {
    if (region === "usa") return "Enquiry from USA / North America desk.";
    if (region === "eu") return "Enquiry from Europe / PPWR desk.";
    return "";
  }, [region]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          company: String(data.get("company") || ""),
          service: String(data.get("service") || ""),
          message: String(data.get("message") || ""),
          region: regionNote,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        throw new Error(payload?.error || "Could not send the message.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send the message.");
    }
  }

  if (status === "sent") {
    return (
      <div
        className={`flex h-full min-h-[18rem] flex-col justify-center rounded-2xl bg-navy text-white ${
          compact ? "px-6 py-8 sm:px-8" : "px-8 py-10 sm:px-10"
        }`}
      >
        <p className="text-[10px] font-semibold tracking-[0.28em] text-lime uppercase">Message sent</p>
        <h3 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">Thank you.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
          We’ve received your enquiry. The MONOFIX team will get back within 24 hours, or earlier.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 w-fit cursor-pointer rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-ink hover:bg-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = compact
    ? "rounded-xl border border-slate/20 bg-white px-4 py-3 text-base font-normal outline-none focus:border-blue"
    : "rounded-xl border border-slate/20 bg-white px-4 py-4 text-base font-normal outline-none focus:border-blue";

  return (
    <form onSubmit={onSubmit} className={compact ? "grid gap-4" : "grid gap-6"}>
      {regionNote ? (
        <p className="rounded-xl bg-lime/40 px-3 py-2 text-sm font-medium text-ink">{regionNote}</p>
      ) : null}
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "contents"}>
        <label className="grid gap-1.5 text-sm font-medium">
          Name
          <input name="name" required className={field} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Email address
          <input name="email" type="email" autoComplete="email" required className={field} />
        </label>
      </div>
      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "contents"}>
        <label className="grid gap-1.5 text-sm font-medium">
          Company
          <input name="company" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Service interest
          <select name="service" required defaultValue="" className={field}>
            <option value="" disabled>
              Select a vertical
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">
        Message
        <textarea name="message" required rows={compact ? 4 : 5} className={field} />
      </label>
      {status === "error" ? <p className="text-sm font-medium text-pink">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className={`cursor-pointer rounded-full bg-ink font-bold text-white hover:bg-navy disabled:cursor-wait disabled:opacity-70 ${
          compact ? "mt-1 px-8 py-3.5 text-base" : "mt-2 px-8 py-4 text-base"
        }`}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
