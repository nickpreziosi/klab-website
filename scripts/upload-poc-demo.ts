import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";
import { POC_DEMO_DOCUMENT_ID } from "../src/sanity/schemaTypes/pocDemoType";

loadEnv({ path: ".env.local" });
loadEnv();

const DEFAULT_VIDEO_PATH = "/Users/nicholaspreziosi/Downloads/K-RAILS - DEMO WEB V5.mp4";
const DEFAULT_POSTER_PATH = path.join(process.cwd(), "public/images/krails.webp");
const VIDEO_FILENAME = "k-rails-demo-web-v5.mp4";

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

const videoPath = process.env.POC_DEMO_VIDEO_PATH || DEFAULT_VIDEO_PATH;
const posterPath = process.env.POC_DEMO_POSTER_PATH || DEFAULT_POSTER_PATH;

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
  console.log(`Uploading video: ${videoPath}`);
  const fileAsset = await client.assets.upload("file", createReadStream(videoPath), {
    filename: VIDEO_FILENAME,
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

  await client
    .transaction()
    .createIfNotExists({ _id: POC_DEMO_DOCUMENT_ID, _type: "pocDemo" })
    .patch(POC_DEMO_DOCUMENT_ID, (p) => p.set(patch))
    .commit();

  console.log(`Patched singleton ${POC_DEMO_DOCUMENT_ID}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
