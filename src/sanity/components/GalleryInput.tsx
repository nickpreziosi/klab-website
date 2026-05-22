"use client";

import { useCallback, useRef, useState } from "react";
import { set, PatchEvent, useClient } from "sanity";
import type { ArrayOfObjectsInputProps } from "sanity";

function deriveAltText(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function randomKey(): string {
  return Math.random().toString(36).slice(2, 14);
}

export function GalleryInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: "2025-11-20" });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList) => {
      if (!files.length) return;
      setUploading(true);
      setProgress({ done: 0, total: files.length });

      const uploads = Array.from(files).map(async (file) => {
        const asset = await client.assets.upload("image", file, { filename: file.name });
        return {
          _type: "image" as const,
          _key: randomKey(),
          asset: { _type: "reference" as const, _ref: asset._id },
          caption: "",
          alt: deriveAltText(file.name),
        };
      });

      const settled = await Promise.allSettled(uploads);
      const newItems = settled
        .filter((r): r is PromiseFulfilledResult<(typeof uploads)[0] extends Promise<infer T> ? T : never> => r.status === "fulfilled")
        .map((r) => r.value);

      const failed = settled.filter((r) => r.status === "rejected").length;
      if (failed > 0) console.warn(`${failed} image(s) failed to upload`);

      // Track progress as uploads complete
      let done = 0;
      settled.forEach(() => setProgress({ done: ++done, total: files.length }));

      if (newItems.length > 0) {
        const current = (props.value ?? []) as typeof newItems;
        props.onChange(PatchEvent.from(set([...current, ...newItems])));
      }

      setUploading(false);
      setProgress(null);
    },
    [client, props],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (!uploading) handleFiles(e.dataTransfer.files);
    },
    [handleFiles, uploading],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(e.target.files);
      e.target.value = "";
    },
    [handleFiles],
  );

  return (
    <div>
      {props.renderDefault(props)}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => !uploading && fileInputRef.current?.click()}
        style={{
          marginTop: 12,
          border: `2px dashed ${dragOver ? "#0091ff" : "#555"}`,
          borderRadius: 8,
          padding: "20px 16px",
          textAlign: "center" as const,
          cursor: uploading ? "not-allowed" : "pointer",
          opacity: uploading ? 0.7 : 1,
          transition: "border-color 0.15s, opacity 0.15s",
          userSelect: "none" as const,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileInput}
        />
        {uploading && progress ? (
          <p style={{ margin: 0, fontSize: 13 }}>
            Uploading {progress.done} / {progress.total} images…
          </p>
        ) : (
          <>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>
              Drop images here or click to select multiple
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 11, opacity: 0.6 }}>
              Alt text will be auto-filled from each filename
            </p>
          </>
        )}
      </div>
    </div>
  );
}
