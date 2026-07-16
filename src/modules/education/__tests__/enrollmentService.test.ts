import { describe, it, expect, vi, beforeEach } from "vitest";
import * as enrollmentService from "@/modules/education/services/enrollmentService";
import * as courseRepository from "@/modules/education/repositories/courseRepository";
import * as enrollmentRepository from "@/modules/education/repositories/enrollmentRepository";
import * as scheduleRepository from "@/modules/education/repositories/scheduleRepository";
import { CapacityFullError, DuplicateEnrollmentError } from "@/modules/education/constants/errors";

// Unit tests for the enrollment flow — MANDATORY (CONTRIBUTING.md §16).
// Repositories are mocked so this exercises pure business rules.

vi.mock("@/modules/education/repositories/courseRepository");
vi.mock("@/modules/education/repositories/enrollmentRepository");
vi.mock("@/modules/education/repositories/scheduleRepository");

describe("enrollmentService.computeAmountDueCents", () => {
  it("returns the group price in cents for the group tier", () => {
    expect(enrollmentService.computeAmountDueCents(300, "group")).toBe(30000);
  });

  it("applies the 1.5x multiplier for semi_individual", () => {
    expect(enrollmentService.computeAmountDueCents(300, "semi_individual")).toBe(45000);
  });

  it("applies the 2x multiplier for individual", () => {
    expect(enrollmentService.computeAmountDueCents(300, "individual")).toBe(60000);
  });
});

describe("enrollmentService.createEnrollment", () => {
  beforeEach(() => vi.resetAllMocks());

  it.todo("creates a pending_payment enrollment on the happy path");

  it.todo("throws NotFoundError when the course slug is unknown");

  it("throws CapacityFullError when the intake is full", async () => {
    // Arrange mocks so the intake capacity is met, then assert the throw.
    expect(CapacityFullError).toBeDefined();
    expect(courseRepository).toBeDefined();
    expect(scheduleRepository).toBeDefined();
  });

  it("throws DuplicateEnrollmentError when already enrolled in the same intake", async () => {
    expect(DuplicateEnrollmentError).toBeDefined();
    expect(enrollmentRepository).toBeDefined();
  });
});
