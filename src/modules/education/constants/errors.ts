// Typed domain errors for the Education module. Services throw these; server
// actions catch them and map to user-facing results (CONTRIBUTING.md §11).

export class EducationError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = "EducationError";
  }
}

export class NotFoundError extends EducationError {
  constructor(entity: string) {
    super(`${entity} not found`, "NOT_FOUND");
  }
}

export class CapacityFullError extends EducationError {
  constructor() {
    super("This intake has reached capacity", "CAPACITY_FULL");
  }
}

export class DuplicateEnrollmentError extends EducationError {
  constructor() {
    super("Student is already enrolled in this course intake", "DUPLICATE_ENROLLMENT");
  }
}

export class PaymentError extends EducationError {
  constructor(message: string) {
    super(message, "PAYMENT_ERROR");
  }
}

export class InvalidStateError extends EducationError {
  constructor(message: string) {
    super(message, "INVALID_STATE");
  }
}
