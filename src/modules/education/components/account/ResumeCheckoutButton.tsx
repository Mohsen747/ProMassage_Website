"use client";

import { useState, useTransition } from "react";
import Button from "@/components/ui/Button";
import { startCheckoutAction } from "@/modules/education/server/actions/paymentActions";

interface ResumeCheckoutButtonProps {
  enrollmentId: string;
}

// Resumes payment for a pending_payment enrollment by creating a fresh Square
// checkout via the existing startCheckoutAction, then handing off to the hosted
// payment page. Identity is enforced server-side; the enrollmentId is validated
// there too.
export default function ResumeCheckoutButton({ enrollmentId }: ResumeCheckoutButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleClick(): void {
    setError(null);
    startTransition(async () => {
      const result = await startCheckoutAction({ enrollmentId });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      window.location.assign(result.data.redirectUrl);
    });
  }

  return (
    <div className="space-y-3">
      <Button type="button" variant="primary" size="block" onClick={handleClick} disabled={pending}>
        {pending ? "Redirecting to secure checkout…" : "Pay now to confirm your seat"}
      </Button>
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
