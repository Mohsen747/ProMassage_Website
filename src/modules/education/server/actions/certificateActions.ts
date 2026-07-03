"use server";

import { issueCertificateSchema, revokeCertificateSchema } from "@/modules/education/validators/certificateSchema";
import * as certificateService from "@/modules/education/services/certificateService";
import type { Certificate } from "@/modules/education/types/certificate";
import { runAction, type ActionResult } from "@/modules/education/server/actions/actionResult";
import { requireRole } from "@/shared/auth/session";

// Admin certificate integration point (/admin/certificates). The "Issue" button
// calls this; actual PDF generation is deferred (certificateService placeholder).

export async function issueCertificateAction(input: unknown): Promise<ActionResult<Certificate>> {
  const admin = await requireRole("admin");
  return runAction({
    schema: issueCertificateSchema,
    input,
    handler: (data) => certificateService.issueCertificate(data, admin.id),
  });
}

export async function revokeCertificateAction(input: unknown): Promise<ActionResult<Certificate>> {
  await requireRole("admin");
  return runAction({
    schema: revokeCertificateSchema,
    input,
    handler: (data) => certificateService.revokeCertificate(data),
  });
}
