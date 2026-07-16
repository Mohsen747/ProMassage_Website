export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface Attendance {
  id: string;
  sessionId: string;
  enrollmentId: string;
  studentId: string;
  status: AttendanceStatus;
  recordedById: string | null;
  recordedAt: Date;
}
