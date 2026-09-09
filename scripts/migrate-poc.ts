import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv();

// Sanity treats IDs with a "." as private paths — they are invisible without a token.
const PRIVATE_ID = "poc.k-rails-gov-portuguese";
const LEGACY_ID = "pocDemo";
const PUBLIC_ID = "k-rails-gov-portuguese";
const DOWNLOAD_FILENAME = "k-rails-gov-poc-portuguese.mp4";

const LOCALIZATIONS = [
  {
    _key: "en",
    language: "en",
    title: "K Rails Government POC - Portuguese",
    description: "Government proof-of-concept demonstration of K Rails (Portuguese).",
  },
  {
    _key: "es",
    language: "es",
    title: "POC gubernamental de K Rails — Portugués",
    description: "Demostración de prueba de concepto gubernamental de K Rails (portugués).",
  },
  {
    _key: "pt",
    language: "pt",
    title: "POC governamental do K Rails — Português",
    description: "Demonstração de prova de conceito governamental do K Rails (português).",
  },
  {
    _key: "ar",
    language: "ar",
    title: "إثبات المفهوم الحكومي لـ K Rails — البرتغالية",
    description: "عرض إثبات المفهوم الحكومي لنظام K Rails (بالبرتغالية).",
  },
];

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

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function publicFields(doc: Record<string, unknown>) {
  const {
    _id: _existingId,
    _type: _existingType,
    _rev: _rev,
    _updatedAt: _updatedAt,
    _createdAt: _createdAt,
    ...rest
  } = doc;

  return {
    ...rest,
    _id: PUBLIC_ID,
    _type: "poc",
    downloadFilename: DOWNLOAD_FILENAME,
    order: typeof rest.order === "number" ? rest.order : 0,
    localizations: LOCALIZATIONS,
  };
}

async function main() {
  const existingPublic = await client.getDocument(PUBLIC_ID);
  const privateDoc = await client.getDocument(PRIVATE_ID);
  const legacyDoc = await client.getDocument(LEGACY_ID);
  const source = existingPublic ?? privateDoc ?? legacyDoc;

  if (!source) {
    console.error(`No POC document found to migrate (${PUBLIC_ID}, ${PRIVATE_ID}, or ${LEGACY_ID}).`);
    process.exit(1);
  }

  const nextDoc = publicFields(source as Record<string, unknown>);
  const tx = client.transaction().createOrReplace(nextDoc);

  if (privateDoc) {
    tx.delete(PRIVATE_ID);
  }
  if (legacyDoc) {
    tx.delete(LEGACY_ID);
  }

  await tx.commit();
  console.log(`Published ${PUBLIC_ID} with en/es/pt/ar localizations (public document ID, no ".").`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
