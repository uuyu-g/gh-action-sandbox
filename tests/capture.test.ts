import { test } from "@playwright/test";
import { stories, maskElements } from "./stories";

test.describe.parallel("capture", () => {
  stories.forEach((story) => {
    test(`snapshot ${story.title}: ${story.name}`, async ({
      page,
    }, testInfo) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${story.id}`, {
        waitUntil: "networkidle",
      });
      await page.screenshot({
        path: testInfo.snapshotPath(`${story.id}.png`),
        fullPage: true,
        animations: "disabled",
        mask: maskElements.map((maskElement) => page.locator(maskElement)),
      });
    });
  });
});
