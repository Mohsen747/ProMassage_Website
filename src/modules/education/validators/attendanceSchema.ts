import { z } from "zod";
import { idSchema } from "@/shared/validators/common";

export const attendanceStatusSchema = z.enum(["present", "absent", "late", "excused"]);

/** Admin marks attendance for a whole session in one submit. */
export const markAttendanceSchema = z.object({
  sessionId: idSchema,
  entries: z
    .array(
      z.object({
        enrollmentId: idSchema,
        status: attendanceStatusSchema,
      })
    )
    .min(1),
});

export type MarkAttendanceInput = z.infer<typeof markAttendanceSchema>;
