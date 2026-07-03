import type { Attendance } from "@/modules/education/types/attendance";
import type { MarkAttendanceInput } from "@/modules/education/validators/attendanceSchema";
import * as attendanceRepository from "@/modules/education/repositories/attendanceRepository";
import * as enrollmentRepository from "@/modules/education/repositories/enrollmentRepository";
import { NotFoundError } from "@/modules/education/constants/errors";

// Attendance tracking (/admin/attendance). Resolves each enrollment → student
// so the student-facing view can query attendance directly.

export async function markSessionAttendance(
  input: MarkAttendanceInput,
  adminId: string
): Promise<void> {
  const rows = await Promise.all(
    input.entries.map(async (entry) => {
      const enrollment = await enrollmentRepository.findEnrollmentById(entry.enrollmentId);
      if (!enrollment) throw new NotFoundError("Enrollment");
      return {
        sessionId: input.sessionId,
        enrollmentId: entry.enrollmentId,
        studentId: enrollment.studentId,
        status: entry.status,
        recordedById: adminId,
      };
    })
  );
  await attendanceRepository.upsertAttendanceBatch(rows);
}

export async function getSessionAttendance(sessionId: string): Promise<Attendance[]> {
  return attendanceRepository.findAttendanceBySession(sessionId);
}

export async function getEnrollmentAttendance(enrollmentId: string): Promise<Attendance[]> {
  return attendanceRepository.findAttendanceByEnrollment(enrollmentId);
}
