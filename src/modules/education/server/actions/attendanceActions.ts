"use server";

import { markAttendanceSchema } from "@/modules/education/validators/attendanceSchema";
import * as attendanceService from "@/modules/education/services/attendanceService";
import { runAction, type ActionResult } from "@/modules/education/server/actions/actionResult";
import { requireRole } from "@/shared/auth/session";

// Admin marks a whole session's attendance (/admin/attendance).
export async function markAttendanceAction(input: unknown): Promise<ActionResult<{ sessionId: string }>> {
  const admin = await requireRole("admin");
  return runAction({
    schema: markAttendanceSchema,
    input,
    handler: async (data) => {
      await attendanceService.markSessionAttendance(data, admin.id);
      return { sessionId: data.sessionId };
    },
  });
}
