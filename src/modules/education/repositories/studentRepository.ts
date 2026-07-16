import { prisma } from "@/shared/db/prismaClient";
import type { User as PrismaUser } from "@prisma/client";
import type { Student, StudentListItem, StudentProfile } from "@/modules/education/types/student";

export interface CreateStudentData {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone: string | null;
}

export interface UpdateStudentData {
  firstName: string;
  lastName: string;
  phone: string | null;
}

/** Map a Prisma User row → the domain `Student` (drops auth-only fields). */
function toStudent(row: PrismaUser): Student {
  return {
    id: row.id,
    email: row.email,
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone,
    createdAt: row.createdAt,
  };
}

export async function createStudent(data: CreateStudentData): Promise<Student> {
  const row = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash: data.passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: "student",
    },
  });
  return toStudent(row);
}

export async function findStudentByEmail(email: string): Promise<Student | null> {
  const row = await prisma.user.findUnique({ where: { email } });
  return row ? toStudent(row) : null;
}

export async function findStudentById(id: string): Promise<Student | null> {
  const row = await prisma.user.findUnique({ where: { id } });
  return row ? toStudent(row) : null;
}

export async function updateStudent(id: string, data: UpdateStudentData): Promise<Student> {
  const row = await prisma.user.update({
    where: { id },
    data: { firstName: data.firstName, lastName: data.lastName, phone: data.phone },
  });
  return toStudent(row);
}

/** All students (role=student), newest first, each with its enrollment count. */
export async function findAllStudents(): Promise<StudentListItem[]> {
  const rows = await prisma.user.findMany({
    where: { role: "student" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { enrollments: true } } },
  });
  return rows.map((row) => ({ ...toStudent(row), enrollmentCount: row._count.enrollments }));
}

/** Count of student-role users (admin dashboard). */
export async function countStudents(): Promise<number> {
  return prisma.user.count({ where: { role: "student" } });
}

/** Aggregated profile for /admin/students/[id]. */
export async function getStudentProfile(id: string): Promise<StudentProfile | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { _count: { select: { enrollments: true, certificates: true } } },
  });
  if (!user) return null;

  const [activeEnrollmentCount, completedEnrollmentCount, paid] = await Promise.all([
    prisma.enrollment.count({ where: { studentId: id, status: "active" } }),
    prisma.enrollment.count({ where: { studentId: id, status: "completed" } }),
    prisma.payment.aggregate({
      _sum: { amountCents: true },
      where: { studentId: id, status: "paid" },
    }),
  ]);

  return {
    ...toStudent(user),
    enrollmentCount: user._count.enrollments,
    activeEnrollmentCount,
    completedEnrollmentCount,
    totalPaidCents: paid._sum.amountCents ?? 0,
    certificateCount: user._count.certificates,
  };
}
