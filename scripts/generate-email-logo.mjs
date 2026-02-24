#!/usr/bin/env node
/**
 * Converts the light logo SVG to PNG for email (Gmail/Outlook block SVG in img).
 * Run: node scripts/generate-email-logo.mjs
 * Output: public/logos/klab-logo-dark-text.png
 */
import sharp from "sharp";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public/logos/klab-logo-dark-text.svg");
const pngPath = join(root, "public/logos/klab-logo-dark-text.png");

if (!existsSync(svgPath)) {
  console.error("Missing:", svgPath);
  process.exit(1);
}

const svg = readFileSync(svgPath);
await sharp(svg)
  .resize(360) // 2x the 180px display size for retina
  .png()
  .toFile(pngPath);

console.log("Wrote", pngPath);
