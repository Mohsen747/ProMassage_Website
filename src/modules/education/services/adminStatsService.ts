import * as studentRepository from "@/modules/education/repositories/studentRepository";
import * as enrollmentRepository from "@/modules/education/repositories/enrollmentRepository";
import * as courseRepository from "@/modules/education/repositories/courseRepository";
import * as paymentRepository from "@/modules/education/repositories/paymentRepository";
import * as certificateRepository from "@/modules/education/repositories/certificateRepository";

// Aggregations for the /admin overview dashboard (enrollment stats, revenue,
// active courses). Read-only. Composes count/aggregate queries from the entity
// repositories — the page never touches Prisma directly.

export interface AdminDashboardStats {
  totalStudents: number;
  activeEnrollments: number;
  pendingPaymentEnrollments: number;
  publishedCourses: number;
  revenuePaidCents: number;
  certificatesIssued: number;
}

export async function getDashboardStats(): Promise<AdminDashboardStats> {
  const [
    totalStudents,
    activeEnrollments,
    pendingPaymentEnrollments,
    publishedCourses,
    revenuePaidCents,
    certificatesIssued,
  ] = await Promise.all([
    studentRepository.countStudents(),
    enrollmentRepository.countEnrollmentsByStatus("active"),
    enrollmentRepository.countEnrollmentsByStatus("pending_payment"),
    courseRepository.countCourses(true),
    paymentRepository.sumPaidCents(),
    certificateRepository.countIssued(),
  ]);

  return {
    totalStudents,
    activeEnrollments,
    pendingPaymentEnrollments,
    publishedCourses,
    revenuePaidCents,
    certificatesIssued,
  };
}
