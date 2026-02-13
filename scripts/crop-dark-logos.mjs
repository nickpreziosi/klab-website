#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { svgPathBbox } from "svg-path-bbox";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGOS_DIR = path.join(__dirname, "../public/logos");

const FILES = [
  "krails-logo-dark.svg",
  "kena-logo-dark.svg",
  "ktalk-logo-dark.svg",
  "krisk-logo-dark.svg",
  "kabl-logo-dark.svg",
  "kcard-logo-dark.svg",
  "kbpm-logo-dark.svg",
  "kim-logo-dark.svg",
  "kaxis-logo-dark.svg",
  "kleads-logo-dark.svg",
  "kai-logo-dark.svg",
];

const VERTICAL_PADDING = 2;
const HORIZONTAL_PADDING = -1; // crop 1px from each side for flush edges
const HEIGHT = 124;

function getBBoxFromSvg(svgContent) {
  const pathRegex = /d="([^"]+)"/g;
  let match;
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  while ((match = pathRegex.exec(svgContent)) !== null) {
    try {
      const [px, py, qx, qy] = svgPathBbox(match[1]);
      minX = Math.min(minX, px);
      minY = Math.min(minY, py);
      maxX = Math.max(maxX, qx);
      maxY = Math.max(maxY, qy);
    } catch (e) {
      // skip invalid paths
    }
  }

  return { minX, minY, maxX, maxY };
}

for (const file of FILES) {
  const filepath = path.join(LOGOS_DIR, file);
  const content = fs.readFileSync(filepath, "utf8");
  const { minX, minY, maxX, maxY } = getBBoxFromSvg(content);
  const x = Math.floor(minX - HORIZONTAL_PADDING);
  const y = Math.floor(minY - VERTICAL_PADDING);
  const w = Math.ceil(maxX - minX + HORIZONTAL_PADDING * 2);
  const h = Math.ceil(maxY - minY + VERTICAL_PADDING * 2);
  const viewBox = `${x} ${y} ${w} ${h}`;
  const width = Math.round((w / h) * HEIGHT);
  console.log(`${file}: viewBox="${viewBox}" width="${width}" height="${HEIGHT}"`);
}
