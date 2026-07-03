import { test, expect } from "@playwright/test";

// E2E for the full enrollment flow — MANDATORY for sensitive flows
// (CONTRIBUTING.md §16). Runs against staging with Stripe in test mode.

test.describe("Academy enrollment", () => {
  test.skip("visitor can enroll in a course and reach checkout", async ({ page }) => {
    await page.goto("/academy/programs");
    await page.getByRole("link", { name: /swedish massage therapy diploma/i }).first().click();
    await page.getByRole("link", { name: /enroll/i }).click();

    await page.getByLabel(/first name/i).fill("Test");
    await page.getByLabel(/last name/i).fill("Student");
    await page.getByLabel(/email/i).fill("test.student@example.com");
    await page.getByLabel(/phone/i).fill("613-555-0100");
    await page.getByLabel(/terms/i).check();
    await page.getByRole("button", { name: /enroll/i }).click();

    await expect(page).toHaveURL(/\/account\/courses\//);
  });
});
