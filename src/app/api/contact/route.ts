import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/content/site";

type ContactBody = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  region?: string;
};

function text(value?: string) {
  return String(value ?? "").trim();
}

export async function POST(request: Request) {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!user || !pass) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = text(body.name);
  const email = text(body.email);
  const company = text(body.company);
  const service = text(body.service);
  const message = text(body.message);
  const region = text(body.region);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const to = process.env.CONTACT_TO?.trim() || site.emails.join(",");
  const from = process.env.CONTACT_FROM?.trim() || `"MONOFIX Packaging Solutions" <${user}>`;
  const subject = `Website enquiry — ${service || "MONOFIX"}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    service ? `Service interest: ${service}` : null,
    region ? `Region: ${region}` : null,
    "",
    message,
  ].filter((line) => line !== null);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: `${name} <${email}>`,
      subject,
      text: lines.join("\n"),
    });
  } catch (error) {
    console.error("Contact SMTP error:", error);
    return NextResponse.json({ error: "Could not send the message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
