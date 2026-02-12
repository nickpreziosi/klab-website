#!/usr/bin/env node
import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
// Cursor stores project assets in ~/.cursor/projects/<project-id>/assets
const assetsDir = join(projectRoot, "..", "..", ".cursor", "projects", "Users-nicholaspreziosi-repos-klab-website", "assets");
const outputDir = join(projectRoot, "public", "images");

const CONFIGS = [
  {
    input: "landing-bg-orange-2-58d17f0f-47bb-4719-9509-acc911852d70.png",
    output: "landing-bg-orange-2.webp",
    resize: null,
  },
  {
    input: "landing-bg-orange-d327d67a-efb1-4f67-b0de-0ff9a196bad0.png",
    output: "landing-bg-orange.webp",
    resize: null,
  },
  {
    input: "landing-bg-wave-3404a542-28db-46ec-8837-7024612a154c.png",
    output: "landing-bg-wave.webp",
    resize: { width: 1024 },
  },
];

async function main() {
  for (const { input, output, resize } of CONFIGS) {
    const inputPath = join(assetsDir, input);
    const outputPath = join(outputDir, output);
    let pipeline = sharp(inputPath);
    if (resize?.width) {
      pipeline = pipeline.resize(resize.width);
    }
    await pipeline.webp({ quality: 85 }).toFile(outputPath);
    console.log(`Converted${resize?.width ? ` (resized to ${resize.width}px wide)` : ""}: ${input} -> ${output}`);
  }
  console.log("\nDone!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
