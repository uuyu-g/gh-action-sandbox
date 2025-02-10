import { readFileSync } from "fs";
import { resolve } from "path/posix";

const storybookDir = resolve(__dirname, "..", "storybook-static");
const data = JSON.parse(
  readFileSync(resolve(storybookDir, "index.json")).toString()
);
export const stories = Object.keys(data.entries).map((key) => data.entries[key]);
/**
 * スクリーンショットを撮影する際にマスクする要素たち
 * アニメーションがある要素はマスクして余計なdiffが出ないようにする
 */
export const maskElements = [
  ".vb-spinner",
  ".vb-loading",
  "[data-skeleton-element]",
  ".vb-discoveryIllust",
  ".vb-finishTaskIllust",
];
