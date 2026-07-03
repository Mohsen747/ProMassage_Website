"use server";

import { signupSchema, profileUpdateSchema } from "@/modules/education/validators/studentSchema";
import * as studentService from "@/modules/education/services/studentService";
import type { Student } from "@/modules/education/types/student";
import { runAction, type ActionResult } from "@/modules/education/server/actions/actionResult";
import { requireUser } from "@/shared/auth/session";

// Shared auth actions (/signup, /account/profile). Login itself is handled by
// the Auth.js credentials provider, not a custom action.
//
// `hashPassword` is injected from the auth layer once next-auth is installed
// (bcrypt/argon2). Signature is final.

export async function signupAction(input: unknown): Promise<ActionResult<Student>> {
  return runAction({
    schema: signupSchema,
    input,
    handler: (data) =>
      studentService.registerStudent({
        input: data,
        hashPassword: async (_plain) => {
          throw new Error("hashPassword not wired — inject from auth layer");
        },
      }),
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
