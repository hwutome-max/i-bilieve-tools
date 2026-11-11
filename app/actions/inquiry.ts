"use server";

import nodemailer from "nodemailer";
import { getProduct } from "@/lib/catalog";

export type InquiryFields = {
  email: string;
  name: string;
  country: string;
  material: string;
  diameter: string;
  quantity: string;
  message: string;
};

export type InquiryState = {
  status: "idle" | "success" | "invalid" | "smtp" | "failed";
  values?: InquiryFields;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, key: string, max: number) {
  return String(formData.get(key) ?? "").replace(/\0/g, "").trim().slice(0, max);
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const email = singleLine(field(formData, "email", 200));
  const name = singleLine(field(formData, "name", 200));
  const country = singleLine(field(formData, "country", 120));
  const material = singleLine(field(formData, "material", 160));
  const diameter = singleLine(field(formData, "diameter", 40));
  const quantity = singleLine(field(formData, "quantity", 40));
  const message = field(formData, "message", 4000);
  const productId = singleLine(field(formData, "productId", 40));
  const values: InquiryFields = { email, name, country, material, diameter, quantity, message };

  if (!emailPattern.test(email) || message.length < 2) return { status: "invalid", values };

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const to = singleLine(process.env.INQUIRY_TO || "jessica@ibelievetools.com");
  if (!host || !user || !pass || !Number.isFinite(port)) return { status: "smtp", values };

  const product = productId ? getProduct(productId) : undefined;
  const lines = [
    product ? `Product: ${product.title} (${product.id})` : "",
    product?.model ? `Model example: ${product.model}` : "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Country: ${country}`,
    `Material: ${material}`,
    `Diameter: ${diameter}`,
    `Quantity: ${quantity}`,
    "",
    message,
  ].filter((line) => line !== "");

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || user,
      to,
      replyTo: email,
      subject: `Blade inquiry from ${name || email}`.slice(0, 180),
      text: lines.join("\n"),
    });
  } catch {
    return { status: "failed", values };
  }

  return { status: "success" };
}
