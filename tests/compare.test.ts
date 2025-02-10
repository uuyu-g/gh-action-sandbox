import { expect, test } from "@playwright/test";
import { maskElements, stories } from "./stories";

test.describe.parallel("compare", () => {
  stories.forEach((story) => {
    test(`compare ${story.title}: ${story.name}`, async ({ page }) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${story.id}`, {
        waitUntil: "networkidle",
      });
      await expect(page).toHaveScreenshot(`${story.id}.png`, {
        fullPage: true,
        animations: "disabled",
        mask: maskElements.map((maskElement) => page.locator(maskElement)),
      });
    });
  });
});
