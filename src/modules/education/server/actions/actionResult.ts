import { z } from "zod";
import { EducationError } from "@/modules/education/constants/errors";

// Shared discriminated-union result type for every server action, plus a helper
// that runs a validated handler inside a single try/catch (CONTRIBUTING.md §11).

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code: string; fieldErrors?: Record<string, string[]> };

interface RunArgs<TInput, TOutput> {
  schema: z.ZodType<TInput>;
  input: unknown;
  handler: (parsed: TInput) => Promise<TOutput>;
}

export async function runAction<TInput, TOutput>({
  schema,
  input,
  handler,
}: RunArgs<TInput, TOutput>): Promise<ActionResult<TOutput>> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const data = await handler(parsed.data);
    return { ok: true, data };
  } catch (error) {
    if (error instanceof EducationError) {
      return { ok: false, error: error.message, code: error.code };
    }
    // Never leak internal error details to the client.
    return { ok: false, error: "Something went wrong", code: "INTERNAL_ERROR" };
  }
}
