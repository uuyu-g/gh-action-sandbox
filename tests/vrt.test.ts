import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "@playwright/test";

const storybookDir = resolve(__dirname, "..", "storybook-static");
const data = JSON.parse(
  readFileSync(resolve(storybookDir, "index.json")).toString()
);

const stories = Object.keys(data.entries).map((key) => data.entries[key]);

const SNAPSHOT_DIR =
  process.env["SNAPSHOT_DIR"] ?? resolve(__dirname, "..", "snapshots");

/**
 * スクリーンショットを撮影する際にマスクする要素たち
 * アニメーションがある要素はマスクして余計なdiffが出ないようにする
 */
const maskElements = [
  ".vb-spinner",
  ".vb-loading",
  "[data-skeleton-element]",
  ".vb-discoveryIllust",
  ".vb-finishTaskIllust",
];

test.describe.parallel("visual regression test", () => {
  stories.forEach((story) => {
    test(`snapshot ${story.title}: ${story.name}`, async ({ page }) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${story.id}`, {
        waitUntil: "networkidle",
      });
      await page.screenshot({
        path: `${SNAPSHOT_DIR}/${story.id}.png`,
        fullPage: true,
        animations: "disabled",
        mask: maskElements.map((maskElement) => page.locator(maskElement)),
      });
    });
  });
});
