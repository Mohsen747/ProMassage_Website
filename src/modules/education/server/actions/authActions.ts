"use server";

import {
  signupSchema,
  profileUpdateSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/modules/education/validators/studentSchema";
import * as studentService from "@/modules/education/services/studentService";
import * as passwordResetService from "@/modules/education/services/passwordResetService";
import type { Student } from "@/modules/education/types/student";
import { runAction, type ActionResult } from "@/modules/education/server/actions/actionResult";
import { requireUser } from "@/shared/auth/session";

// Shared auth actions (/signup, /account/profile). Login itself is handled by
// the Auth.js credentials provider, not a custom action. Password hashing is
// applied inside studentService via the shared auth layer.

export async function signupAction(input: unknown): Promise<ActionResult<Student>> {
  return runAction({
    schema: signupSchema,
    input,
    handler: (data) => studentService.registerStudent(data),
  });
}

// Anti-enumeration: this ALWAYS resolves to a generic success, whether or not
// the email is registered and even if the email send fails. Delivery/infra
// errors are logged server-side only. Only a malformed email is surfaced.
export async function requestPasswordResetAction(input: unknown): Promise<ActionResult<null>> {
  return runAction({
    schema: forgotPasswordSchema,
    input,
    handler: async ({ email }) => {
      try {
        await passwordResetService.requestReset(email);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("[password-reset] requestReset failed:", error);
      }
      return null;
    },
  });
}

// Validates the token + new password and applies the change. An invalid/expired
// token surfaces as a typed EducationError (INVALID_RESET_TOKEN) to the form.
export async function resetPasswordAction(input: unknown): Promise<ActionResult<null>> {
  return runAction({
    schema: resetPasswordSchema,
    input,
    handler: async (data) => {
      await passwordResetService.resetPassword(data);
      return null;
    },
  });
}

export async function updateProfileAction(input: unknown): Promise<ActionResult<Student>> {
  const user = await requireUser();
  return runAction({
    schema: profileUpdateSchema,
    input,
    handler: (data) => studentService.updateProfile(user.id, data),
  });
}
