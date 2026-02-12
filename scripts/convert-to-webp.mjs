#!/usr/bin/env node
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

async function findJpegFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findJpegFiles(fullPath)));
    } else if (/\.(jpg|jpeg)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertToWebp(inputPath) {
  const outputPath = inputPath.replace(/\.(jpg|jpeg)$/i, ".webp");
  await sharp(inputPath)
    .webp({ quality: 85 })
    .toFile(outputPath);
  console.log(`Converted: ${inputPath} -> ${outputPath}`);
  return { input: inputPath, output: outputPath };
}

async function main() {
  const jpegFiles = await findJpegFiles(publicDir);
  if (jpegFiles.length === 0) {
    console.log("No JPG/JPEG files found in public directory");
    return;
  }
  console.log(`Found ${jpegFiles.length} JPG/JPEG files to convert\n`);
  for (const file of jpegFiles) {
    await convertToWebp(file);
  }
  console.log(`\nDone! Converted ${jpegFiles.length} files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
