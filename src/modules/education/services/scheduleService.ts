import type { CourseIntake, CourseSession } from "@/modules/education/types/schedule";
import * as scheduleRepository from "@/modules/education/repositories/scheduleRepository";
import { NotFoundError } from "@/modules/education/constants/errors";

// Read-only schedule logic for the public /academy/schedule calendar and the
// enrollment intake selector.

export async function getUpcomingIntakes(): Promise<CourseIntake[]> {
  return scheduleRepository.findUpcomingIntakes();
}

export async function getIntakesForCourse(courseId: string): Promise<CourseIntake[]> {
  return scheduleRepository.findIntakesByCourse(courseId);
}

export async function getIntakeSessions(intakeId: string): Promise<CourseSession[]> {
  const intake = await scheduleRepository.findIntakeById(intakeId);
  if (!intake) throw new NotFoundError("Course intake");
  return scheduleRepository.findSessionsByIntake(intakeId);
}
