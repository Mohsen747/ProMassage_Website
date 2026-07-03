import type { Student, StudentProfile } from "@/modules/education/types/student";

export interface CreateStudentData {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone: string | null;
}

export async function createStudent(_data: CreateStudentData): Promise<Student> {
  throw new Error("studentRepository.createStudent not implemented (scaffold)");
}

export async function findStudentByEmail(_email: string): Promise<Student | null> {
  throw new Error("studentRepository.findStudentByEmail not implemented (scaffold)");
}

export async function findStudentById(_id: string): Promise<Student | null> {
  throw new Error("studentRepository.findStudentById not implemented (scaffold)");
}

export async function findAllStudents(): Promise<Student[]> {
  throw new Error("studentRepository.findAllStudents not implemented (scaffold)");
}

/** Aggregated profile for /admin/students/[id]. */
export async function getStudentProfile(_id: string): Promise<StudentProfile | null> {
  throw new Error("studentRepository.getStudentProfile not implemented (scaffold)");
}
