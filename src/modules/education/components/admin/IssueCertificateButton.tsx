"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { issueCertificateAction } from "@/modules/education/server/actions/certificateActions";

interface IssueCertificateButtonProps {
  enrollmentId: string;
}

// Admin action: issue a certificate for a completed enrollment. Rendered inline
// in the admin enrollment tables; on success the page refreshes so the row flips
// to a "View certificate" link.
export default function IssueCertificateButton({ enrollmentId }: IssueCertificateButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function issue(): void {
    setError(null);
    startTransition(async () => {
      const result = await issueCertificateAction({ enrollmentId });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={issue}
        disabled={pending}
        className="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Issuing…" : "Issue certificate"}
      </button>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
