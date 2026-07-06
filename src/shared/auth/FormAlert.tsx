import type { ReactNode } from "react";

// Shared inline alert for the auth forms (login, signup, forgot/reset password),
// so every form surfaces errors and notices with the exact same treatment and
// they can never visually drift. `tone="error"` is a clear red alert box (red
// border + tinted background + red text) that reads unmistakably as an alert,
// not a fourth input field. `tone="success"` is the green equivalent.
type Tone = "error" | "success";

interface FormAlertProps {
  tone?: Tone;
  children: ReactNode;
}

const TONE_CLASSES: Record<Tone, string> = {
  error: "border-red-300 bg-red-50 text-red-700",
  success: "border-brand-200 bg-brand-50 text-brand-700",
};

export default function FormAlert({ tone = "error", children }: FormAlertProps) {
  return (
    <p
      role="alert"
      className={`flex items-start gap-2 rounded-md border px-4 py-3 text-sm font-medium ${TONE_CLASSES[tone]}`}
    >
      <span aria-hidden className="mt-0.5 leading-none">
        {tone === "error" ? "⚠" : "✓"}
      </span>
      <span>{children}</span>
    </p>
  );
}
