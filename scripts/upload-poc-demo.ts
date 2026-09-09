import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { randomUUID } from "node:crypto";

loadEnv({ path: ".env.local" });
loadEnv();

const DEFAULT_VIDEO_PATH = "/Users/nicholaspreziosi/Downloads/K-RAILS - DEMO WEB V5.mp4";
const DEFAULT_POSTER_PATH = path.join(process.cwd(), "public/images/krails.webp");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mp87vpva";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-11-20";

const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN;

if (!token) {
  console.error(
    "Missing Sanity write token. Set SANITY_API_WRITE_TOKEN (Editor access) and re-run."
  );
  process.exit(1);
}

const videoPath = process.env.POC_VIDEO_PATH || process.env.POC_DEMO_VIDEO_PATH || DEFAULT_VIDEO_PATH;
const posterPath = process.env.POC_POSTER_PATH || process.env.POC_DEMO_POSTER_PATH || DEFAULT_POSTER_PATH;
// IDs with a "." are private in Sanity and will not show on the public site.
const documentId = process.env.POC_DOCUMENT_ID || randomUUID();
const downloadFilename = process.env.POC_DOWNLOAD_FILENAME;
const videoFilename = downloadFilename || path.basename(videoPath);

if (!existsSync(videoPath)) {
  console.error(`Video file not found: ${videoPath}`);
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function main() {
  console.log(`Uploading file: ${videoPath}`);
  const fileAsset = await client.assets.upload("file", createReadStream(videoPath), {
    filename: videoFilename,
    contentType: "video/mp4",
  });
  console.log(`Uploaded file ${fileAsset._id}`);

  let posterRef: { _type: "reference"; _ref: string } | undefined;
  if (existsSync(posterPath)) {
    console.log(`Uploading poster: ${posterPath}`);
    const imageAsset = await client.assets.upload("image", createReadStream(posterPath), {
      filename: path.basename(posterPath),
    });
    posterRef = { _type: "reference", _ref: imageAsset._id };
    console.log(`Uploaded poster ${imageAsset._id}`);
  }

  const patch: Record<string, unknown> = {
    original: {
      _type: "file",
      asset: { _type: "reference", _ref: fileAsset._id },
    },
  };
  if (posterRef) {
    patch.poster = {
      _type: "image",
      asset: posterRef,
    };
  }
  if (downloadFilename) {
    patch.downloadFilename = downloadFilename;
  }

  await client
    .transaction()
    .createIfNotExists({ _id: documentId, _type: "poc" })
    .patch(documentId, (p) => p.set(patch))
    .commit();

  console.log(`Patched POC document ${documentId}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
