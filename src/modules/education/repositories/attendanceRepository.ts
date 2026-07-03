import type { Attendance, AttendanceStatus } from "@/modules/education/types/attendance";

export interface AttendanceUpsertData {
  sessionId: string;
  enrollmentId: string;
  studentId: string;
  status: AttendanceStatus;
  recordedById: string;
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
