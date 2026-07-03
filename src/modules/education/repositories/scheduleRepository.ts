import type { CourseIntake, CourseSession } from "@/modules/education/types/schedule";

export async function findUpcomingIntakes(): Promise<CourseIntake[]> {
  throw new Error("scheduleRepository.findUpcomingIntakes not implemented (scaffold)");
}

export async function findIntakesByCourse(_courseId: string): Promise<CourseIntake[]> {
  throw new Error("scheduleRepository.findIntakesByCourse not implemented (scaffold)");
}

export async function findIntakeById(_id: string): Promise<CourseIntake | null> {
  throw new Error("scheduleRepository.findIntakeById not implemented (scaffold)");
}

export async function findSessionsByIntake(_intakeId: string): Promise<CourseSession[]> {
  throw new Error("scheduleRepository.findSessionsByIntake not implemented (scaffold)");
}
