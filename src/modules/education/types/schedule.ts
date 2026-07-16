export type IntakeSeason = "Fall" | "Winter" | "Spring" | "Summer";

export type IntakeStatus =
  | "scheduled"
  | "open"
  | "full"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface CourseIntake {
  id: string;
  courseId: string;
  season: IntakeSeason;
  year: number;
  startDate: Date;
  endDate: Date;
  capacity: number;
  status: IntakeStatus;
}

export interface CourseSession {
  id: string;
  intakeId: string;
  title: string;
  date: Date;
  startTime: string | null;
  endTime: string | null;
}
