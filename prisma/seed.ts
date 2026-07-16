import { prisma } from "@/shared/db/prismaClient";
import { programs, CATEGORIES } from "@/data/programs";
import type { CourseCategory } from "@/modules/education/types/course";

// One-time migration: the 15 real course records currently hard-coded in
// src/data/programs.ts → the Course table. Run with `npx prisma db seed`.
// After a successful seed + verification, src/data/programs.ts can be retired.

const CATEGORY_MAP: Record<string, CourseCategory> = {
  [CATEGORIES.INTRODUCTORY]: "Introductory",
  [CATEGORIES.PROFESSIONAL_DIPLOMA]: "ProfessionalDiploma",
  [CATEGORIES.CONTINUING_EDUCATION]: "ContinuingEducation",
};

async function seed(): Promise<void> {
  for (const program of programs) {
    await prisma.course.upsert({
      where: { slug: program.slug },
      update: {},
      create: {
        slug: program.slug,
        name: program.name,
        category: CATEGORY_MAP[program.category],
        theoryHours: program.hours.theory,
        practicalHours: program.hours.practical,
        totalHours: program.hours.total,
        priceGroup: program.pricing.group,
        priceSemiIndividual: program.pricing.semiIndividual,
        priceIndividual: program.pricing.individual,
        prerequisites: program.prerequisites,
        description: program.description,
        highlights: program.highlights,
        tag: program.tag,
        instructor: program.instructor,
        published: true,
      },
    });
  }
  // eslint-disable-next-line no-console
  console.log(`Seeded ${programs.length} courses.`);
}

seed()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
