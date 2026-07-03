export interface Student {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  createdAt: Date;
}

/** Aggregated view for /admin/students/[id] — everything in one place. */
export interface StudentProfile extends Student {
  enrollmentCount: number;
  activeEnrollmentCount: number;
  completedEnrollmentCount: number;
  totalPaidCents: number;
  certificateCount: number;
}
