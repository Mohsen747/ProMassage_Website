export interface Student {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  createdAt: Date;
}

/** Row for the /admin/students list — basic info plus enrollment count. */
export interface StudentListItem extends Student {
  enrollmentCount: number;
}

/** Aggregated view for /admin/students/[id] — everything in one place. */
export interface StudentProfile extends Student {
  enrollmentCount: number;
  activeEnrollmentCount: number;
  completedEnrollmentCount: number;
  totalPaidCents: number;
  certificateCount: number;
}
