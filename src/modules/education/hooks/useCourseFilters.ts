"use client";

import { useMemo, useState } from "react";
import type { CourseCategory, PublicCourse } from "@/modules/education/types/course";

// Client-side filtering for /academy/programs. State/derivation only — no UI,
// no data fetching (CONTRIBUTING.md §6). Courses arrive as a prop from the server.

interface UseCourseFiltersResult {
  activeCategory: CourseCategory | "all";
  setActiveCategory: (category: CourseCategory | "all") => void;
  filteredCourses: PublicCourse[];
}

export function useCourseFilters(courses: PublicCourse[]): UseCourseFiltersResult {
  const [activeCategory, setActiveCategory] = useState<CourseCategory | "all">("all");

  const filteredCourses = useMemo(() => {
    if (activeCategory === "all") return courses;
    return courses.filter((course) => course.category === activeCategory);
  }, [courses, activeCategory]);

  return { activeCategory, setActiveCategory, filteredCourses };
}
