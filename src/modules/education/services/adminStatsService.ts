// Aggregations for the /admin overview dashboard (enrollment stats, revenue,
// active courses). Read-only. Heavy queries belong here, never in the page.

export interface AdminDashboardStats {
  totalStudents: number;
  activeEnrollments: number;
  pendingPaymentEnrollments: number;
  publishedCourses: number;
  revenuePaidCents: number;
  certificatesIssued: number;
}

export async function getDashboardStats(): Promise<AdminDashboardStats> {
  // Aggregate via prisma.count / prisma.aggregate across repositories.
  throw new Error("adminStatsService.getDashboardStats not implemented (scaffold)");
}
