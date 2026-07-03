import { prisma } from "@/shared/db/prismaClient";
import type { User as PrismaUser } from "@prisma/client";
import type { Student, StudentProfile } from "@/modules/education/types/student";

export interface CreateStudentData {
  email: string;
  passwordHash: string;
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

export async function findAllStudents(): Promise<Student[]> {
  throw new Error("studentRepository.findAllStudents not implemented (scaffold)");
}

/** Aggregated profile for /admin/students/[id]. */
export async function getStudentProfile(_id: string): Promise<StudentProfile | null> {
  throw new Error("studentRepository.getStudentProfile not implemented (scaffold)");
}
