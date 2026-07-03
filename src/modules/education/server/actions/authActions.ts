"use server";

import { signupSchema, profileUpdateSchema } from "@/modules/education/validators/studentSchema";
import * as studentService from "@/modules/education/services/studentService";
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

export async function updateProfileAction(input: unknown): Promise<ActionResult<Student>> {
  const user = await requireUser();
  return runAction({
    schema: profileUpdateSchema,
    input,
    handler: (data) => studentService.updateProfile(user.id, data),
  });
}
