import type { Student, StudentProfile } from "@/modules/education/types/student";
import type { ProfileUpdateInput, SignupInput } from "@/modules/education/validators/studentSchema";
import * as studentRepository from "@/modules/education/repositories/studentRepository";
import { EducationError, NotFoundError } from "@/modules/education/constants/errors";

// Student account logic (shared auth signup + /account/profile + admin views).
// Password hashing delegated to the auth layer; the plain password never reaches
// the repository. `hashPassword` is injected to keep this service framework-free.

interface RegisterArgs {
  input: SignupInput;
  hashPassword: (plain: string) => Promise<string>;
}

export async function registerStudent({ input, hashPassword }: RegisterArgs): Promise<Student> {
  const existing = await studentRepository.findStudentByEmail(input.email);
  if (existing) throw new EducationError("Email already registered", "EMAIL_TAKEN");

  const passwordHash = await hashPassword(input.password);
  return studentRepository.createStudent({
    email: input.email,
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone ?? null,
  });
}

export async function getStudentProfile(id: string): Promise<StudentProfile> {
  const profile = await studentRepository.getStudentProfile(id);
  if (!profile) throw new NotFoundError("Student");
  return profile;
}

export async function updateProfile(_id: string, _input: ProfileUpdateInput): Promise<Student> {
  throw new Error("studentService.updateProfile not implemented (scaffold)");
}

export async function listStudents(): Promise<Student[]> {
  return studentRepository.findAllStudents();
}
