import { prisma } from "@/shared/db/prismaClient";
import type { Attendance as PrismaAttendance } from "@prisma/client";
import type { Attendance, AttendanceStatus } from "@/modules/education/types/attendance";

export interface AttendanceUpsertData {
  sessionId: string;
  enrollmentId: string;
  studentId: string;
  status: AttendanceStatus;
  recordedById: string;
}

/** Map a Prisma row → the ORM-independent domain `Attendance`. */
function toDomain(row: PrismaAttendance): Attendance {
  return {
    id: row.id,
    sessionId: row.sessionId,
    enrollmentId: row.enrollmentId,
    studentId: row.studentId,
    status: row.status,
    recordedById: row.recordedById,
    recordedAt: row.recordedAt,
  };
}

export async function upsertAttendanceBatch(_entries: AttendanceUpsertData[]): Promise<void> {
  throw new Error("attendanceRepository.upsertAttendanceBatch not implemented (scaffold)");
}

export async function findAttendanceBySession(_sessionId: string): Promise<Attendance[]> {
  throw new Error("attendanceRepository.findAttendanceBySession not implemented (scaffold)");
}

export async function findAttendanceByEnrollment(_enrollmentId: string): Promise<Attendance[]> {
  throw new Error("attendanceRepository.findAttendanceByEnrollment not implemented (scaffold)");
}

/** All attendance rows for a student (admin student detail), newest first. */
export async function findAttendanceByStudent(studentId: string): Promise<Attendance[]> {
  const rows = await prisma.attendance.findMany({
    where: { studentId },
    orderBy: { recordedAt: "desc" },
  });
  return rows.map(toDomain);
}
