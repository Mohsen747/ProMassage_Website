"use client";

import { useState, useTransition } from "react";
import { enrollmentFormSchema, type EnrollmentFormInput } from "@/modules/education/validators/enrollmentSchema";
import { submitEnrollmentAction } from "@/modules/education/server/actions/enrollmentActions";

// Enrollment form state + submission. Validates client-side with the SAME Zod
// schema the server action re-validates with (defense in depth). Owns no UI.

interface UseEnrollmentFormResult {
  fieldErrors: Record<string, string[]>;
  formError: string | null;
  isPending: boolean;
  submit: (input: EnrollmentFormInput) => void;
  onSuccessRedirect: string | null;
}

export function useEnrollmentForm(): UseEnrollmentFormResult {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [onSuccessRedirect, setOnSuccessRedirect] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit(input: EnrollmentFormInput): void {
    setFieldErrors({});
    setFormError(null);

    const parsed = enrollmentFormSchema.safeParse(input);
    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    startTransition(async () => {
      const result = await submitEnrollmentAction(parsed.data);
      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setFormError(result.error);
        return;
      }
      setOnSuccessRedirect(`/account/courses/${result.data.id}`);
    });
  }

  return { fieldErrors, formError, isPending, submit, onSuccessRedirect };
}
