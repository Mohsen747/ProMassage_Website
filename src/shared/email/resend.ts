import { Resend } from "resend";

// Transactional email via Resend. Shared infra (not education-specific): the
// client is created lazily so importing this module never requires the API key
// at build time — only actually sending does. `EMAIL_FROM` is the verified
// sender (e.g. onboarding@resend.dev in dev).

let client: Resend | null = null;

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set — cannot send email.");
  }
  client ??= new Resend(apiKey);
  return client;
}

function getFrom(): string {
  const from = process.env.EMAIL_FROM;
  if (!from) {
    throw new Error("EMAIL_FROM is not set — cannot send email.");
  }
  return from;
}

export interface SendEmailResult {
  id: string;
}

interface PasswordResetEmailArgs {
  to: string;
  firstName: string;
  resetUrl: string;
}

export async function sendPasswordResetEmail({
  to,
  firstName,
  resetUrl,
}: PasswordResetEmailArgs): Promise<SendEmailResult> {
  const { data, error } = await getClient().emails.send({
    from: getFrom(),
    to,
    subject: "Reset your ProMassage Academy password",
    html: passwordResetHtml({ firstName, resetUrl }),
  });

  if (error) {
    // Surface Resend's error so callers/tests can see exactly what failed.
    throw new Error(`Resend send failed: ${error.name} — ${error.message}`);
  }
  if (!data) {
    throw new Error("Resend send returned no data.");
  }
  return { id: data.id };
}

function passwordResetHtml({
  firstName,
  resetUrl,
}: {
  firstName: string;
  resetUrl: string;
}): string {
  const greeting = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi,";
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1c1917;">
    <p style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#50766d;font-weight:600;margin:0 0 16px;">ProMassage Academy</p>
    <h1 style="font-size:22px;margin:0 0 16px;color:#1a221c;">Reset your password</h1>
    <p style="margin:0 0 16px;line-height:1.6;">${greeting}</p>
    <p style="margin:0 0 24px;line-height:1.6;">We received a request to reset the password for your ProMassage Academy account. Click the button below to choose a new one. This link expires in 1 hour and can only be used once.</p>
    <p style="margin:0 0 24px;">
      <a href="${resetUrl}" style="display:inline-block;background:#4E6F5C;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;">Reset password</a>
    </p>
    <p style="margin:0 0 8px;line-height:1.6;font-size:13px;color:#57534e;">If the button doesn't work, paste this link into your browser:</p>
    <p style="margin:0 0 24px;word-break:break-all;font-size:13px;color:#4E6F5C;">${resetUrl}</p>
    <p style="margin:0;line-height:1.6;font-size:13px;color:#57534e;">If you didn't request this, you can safely ignore this email — your password won't change.</p>
  </div>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
