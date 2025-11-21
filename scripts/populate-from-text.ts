/**
 * Script to populate Sanity with articles from a text/RTFD document
 *
 * Usage: npx tsx scripts/populate-from-text.ts <path-to-file>
 *
 * Supports:
 * - .txt files
 * - .rtf files
 * - .rtfd bundles (extracts TXT.rtf from the bundle)
 *
 * Format: Supports metadata fields like:
 * title: Article Title
 * date: October 6, 2025
 * image: (embedded in RTFD or URL)
 * body: (content with formatting preserved)
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env
try {
  const envPath = path.join(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, "utf-8");
    envFile.split("\n").forEach((line) => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (error) {
  // Ignore errors loading .env
}

// Check for API token
if (!process.env.SANITY_API_TOKEN) {
  console.error("\n❌ Error: SANITY_API_TOKEN is not set!");
  process.exit(1);
}

// Sanity client configuration
const client = createClient({
  projectId: "mp87vpva",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

function generateKey(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Helper function to parse RTF and extract formatted content
function parseRtfWithFormatting(rtf: string): {
  metadata: { [key: string]: string };
  body: Array<{ text: string; marks: string[] }[]>;
} {
  const metadata: { [key: string]: string } = {};
  const body: Array<{ text: string; marks: string[] }[]> = [];

  // Remove header definitions
  rtf = rtf.replace(/\{[^}]*\\fonttbl[^}]*\}/gi, "");
  rtf = rtf.replace(/\{[^}]*\\colortbl[^}]*\}/gi, "");
  rtf = rtf.replace(/\{[^}]*\\stylesheet[^}]*\}/gi, "");
  rtf = rtf.replace(/\{[^}]*\\NeXTGraphic[^}]*\}/gi, "");

  // Convert RTF escapes first
  rtf = rtf.replace(/\\'93/g, '"');
  rtf = rtf.replace(/\\'94/g, '"');
  rtf = rtf.replace(/\\'92/g, "'");
  rtf = rtf.replace(/\\'a0/g, " ");
  rtf = rtf.replace(/\\uc\d+\\u\d+\s*/g, "");

  let inBody = false;
  let currentParagraph: { text: string; marks: string[] }[] = [];
  let currentSpan = { text: "", marks: [] as string[] };
  let isBold = false;
  let isItalic = false;

  // Process character by character to track formatting
  let i = 0;
  let currentField = "";
  let currentFieldValue = "";

  while (i < rtf.length) {
    // Check for field markers (title:, date:, body:, etc.)
    const fieldMatch = rtf.substring(i).match(/^(title|date|image|author|category|excerpt|body):\s*/i);
    if (fieldMatch && !inBody) {
      // Save previous field
      if (currentField && currentFieldValue) {
        metadata[currentField.toLowerCase()] = currentFieldValue.trim();
      }

      currentField = fieldMatch[1].toLowerCase();
      currentFieldValue = "";
      i += fieldMatch[0].length;

      if (currentField === "body") {
        inBody = true;
        currentField = "";
      }
      continue;
    }

    if (!inBody) {
      // Collect metadata value
      if (rtf[i] === '\\') {
        // Skip RTF control sequences in metadata
        while (i + 1 < rtf.length && /[a-z0-9]/.test(rtf[i + 1])) {
          i++;
        }
        i++;
        continue;
      } else if (rtf[i] === '{' || rtf[i] === '}') {
        i++;
        continue;
      } else if (/[A-Za-z0-9\s.,;:!?'"()\-$]/.test(rtf[i])) {
        currentFieldValue += rtf[i];
      }
      i++;
      continue;
    }

    // Parse body with formatting
    // Check for formatting markers
    if (rtf.substring(i).match(/^\\f4\\i\\b|^\\b\\i\\f4/)) {
      // Bold + Italic
      if (currentSpan.text) {
        if (isBold) currentSpan.marks.push("strong");
        if (isItalic) currentSpan.marks.push("em");
        currentParagraph.push({ ...currentSpan });
        currentSpan = { text: "", marks: [] };
      }
      isBold = true;
      isItalic = true;
      i += 6;
      continue;
    } else if (rtf.substring(i).match(/^\\b\s|^\\b\\i|^\\b0/)) {
      // Bold start or end
      if (rtf.substring(i).match(/^\\b0/)) {
        // Bold end
        if (currentSpan.text) {
          if (isBold) currentSpan.marks.push("strong");
          if (isItalic) currentSpan.marks.push("em");
          currentParagraph.push({ ...currentSpan });
          currentSpan = { text: "", marks: [] };
        }
        isBold = false;
        i += 3;
      } else {
        // Bold start
        if (currentSpan.text) {
          if (isBold) currentSpan.marks.push("strong");
          if (isItalic) currentSpan.marks.push("em");
          currentParagraph.push({ ...currentSpan });
          currentSpan = { text: "", marks: [] };
        }
        isBold = true;
        i += 2;
      }
      continue;
    } else if (rtf.substring(i).match(/^\\i\s|^\\i0/)) {
      // Italic start or end
      if (rtf.substring(i).match(/^\\i0/)) {
        // Italic end
        if (currentSpan.text) {
          if (isBold) currentSpan.marks.push("strong");
          if (isItalic) currentSpan.marks.push("em");
          currentParagraph.push({ ...currentSpan });
          currentSpan = { text: "", marks: [] };
        }
        isItalic = false;
        i += 3;
      } else {
        // Italic start
        if (currentSpan.text) {
          if (isBold) currentSpan.marks.push("strong");
          if (isItalic) currentSpan.marks.push("em");
          currentParagraph.push({ ...currentSpan });
          currentSpan = { text: "", marks: [] };
        }
        isItalic = true;
        i += 2;
      }
      continue;
    } else if (rtf.substring(i).match(/^\\i0\\b0|^\\b0\\i0/)) {
      // Formatting end
      if (currentSpan.text) {
        if (isBold) currentSpan.marks.push("strong");
        if (isItalic) currentSpan.marks.push("em");
        currentParagraph.push({ ...currentSpan });
        currentSpan = { text: "", marks: [] };
      }
      isBold = false;
      isItalic = false;
      i += 6;
      continue;
    } else if (rtf.substring(i).match(/^\\par\s*/i)) {
      // Paragraph break
      if (currentSpan.text) {
        if (isBold) currentSpan.marks.push("strong");
        if (isItalic) currentSpan.marks.push("em");
        currentParagraph.push({ ...currentSpan });
        currentSpan = { text: "", marks: [] };
      }
      if (currentParagraph.length > 0) {
        body.push([...currentParagraph]);
        currentParagraph = [];
      }
      isBold = false;
      isItalic = false;
      i += 4;
      continue;
    } else if (rtf[i] === '\\') {
      // Skip other control sequences
      while (i + 1 < rtf.length && /[a-z0-9]/.test(rtf[i + 1])) {
        i++;
      }
      i++;
      continue;
    } else if (rtf[i] === '{' || rtf[i] === '}') {
      i++;
      continue;
    } else if (/[A-Za-z0-9\s.,;:!?'"()\-$%]/.test(rtf[i])) {
      // Filter out common RTF artifacts that might slip through
      const remaining = rtf.substring(i);
      if (remaining.match(/^(deftab|tightenfactor|expnd|kerning|fs|cf|marg|view|sl|partighten)\d+/i)) {
        // Skip RTF control words
        while (i < rtf.length && /[a-z0-9]/.test(rtf[i])) i++;
        continue;
      }
      // Skip standalone 'd' that's likely an artifact
      if (rtf[i] === 'd' && (i === 0 || /\s/.test(rtf[i-1])) && (i+1 >= rtf.length || /\s/.test(rtf[i+1]))) {
        i++;
        continue;
      }
      currentSpan.text += rtf[i];
    }
    i++;
  }

  // Save last span and paragraph
  if (inBody) {
    if (currentSpan.text) {
      if (isBold) currentSpan.marks.push("strong");
      if (isItalic) currentSpan.marks.push("em");
      currentParagraph.push({ ...currentSpan });
    }
    if (currentParagraph.length > 0) {
      body.push([...currentParagraph]);
    }
  } else if (currentField && currentFieldValue) {
    metadata[currentField.toLowerCase()] = currentFieldValue.trim();
  }

  // Clean metadata
  Object.keys(metadata).forEach(key => {
    metadata[key] = metadata[key]
      .replace(/\\[a-z]+\d*\s*/gi, " ")
      .replace(/[{}]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  });

  return { metadata, body };
}

// Convert parsed RTF body to Portable Text blocks
function rtfBodyToPortableText(rtfBody: Array<{ text: string; marks: string[] }[]>): any[] {
  const blocks: any[] = [];

  for (const paragraph of rtfBody) {
    if (paragraph.length === 0) continue;

    // Filter out RTF artifacts from spans
    const cleanedParagraph = paragraph
      .map(span => ({
        ...span,
        text: span.text
          .replace(/\b(deftab|tightenfactor|expnd|kerning|fs|cf|marg|view|sl|partighten)\d+\b/gi, "")
          .replace(/\b\d+\s*d\s*\b/gi, "") // Remove "720 d" patterns
          .replace(/^\s*d\s*$/g, "") // Remove standalone "d"
          .replace(/\s+b\s+(?=[A-Z])/g, " ") // Remove stray "b" before capitalized words
          .replace(/^\s*b\s+/g, "") // Remove leading "b"
          .trim()
      }))
      .filter(span => span.text.length > 0);

    if (cleanedParagraph.length === 0) continue;

    // Combine spans with same formatting and add proper spacing
    const children: any[] = [];
    let currentText = "";
    let currentMarks: string[] = [];

    for (let i = 0; i < cleanedParagraph.length; i++) {
      const span = cleanedParagraph[i];
      const marksKey = span.marks.sort().join(",");
      const currentMarksKey = currentMarks.sort().join(",");
      const isFirstSpan = i === 0;
      const isLastSpan = i === cleanedParagraph.length - 1;
      const hasFormatting = span.marks.length > 0;
      const prevHasFormatting = currentMarks.length > 0;

      if (marksKey === currentMarksKey && currentMarksKey !== "") {
        // Same formatting - merge
        currentText += span.text;
      } else {
        // Different formatting - save current and start new
        if (currentText.trim()) {
          children.push({
            _type: "span",
            text: currentText,
            marks: currentMarks.length > 0 ? currentMarks : [],
          });
        }
        currentText = span.text;
        currentMarks = [...span.marks];
      }

      // Handle spacing around formatted text
      // If we're switching formatting or have formatted text, ensure proper spacing
      if (i < cleanedParagraph.length - 1) {
        const nextSpan = cleanedParagraph[i + 1];
        const nextHasFormatting = nextSpan.marks.length > 0;
        const currentHasFormatting = currentMarks.length > 0;

        // If current span has formatting and next doesn't (or vice versa), need space
        if ((currentHasFormatting && !nextHasFormatting) || (!currentHasFormatting && nextHasFormatting)) {
          // Ensure space after current text
          if (!currentText.match(/\s$/)) {
            currentText += " ";
          }
        }
      }
    }

    // Add remaining text
    if (currentText.trim()) {
      children.push({
        _type: "span",
        text: currentText,
        marks: currentMarks.length > 0 ? currentMarks : [],
      });
    }

    // Post-process: ensure proper spacing between children
    const finalChildren: any[] = [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const isFirst = i === 0;
      const isLast = i === children.length - 1;
      const hasFormatting = child.marks.length > 0;
      const prevChild = i > 0 ? finalChildren[finalChildren.length - 1] : null;
      const nextChild = i < children.length - 1 ? children[i + 1] : null;

      // Clean up the text (remove leading/trailing spaces at paragraph boundaries)
      let cleanText = child.text.trim(); // Start with trimmed text

      // Remove leading space from first child (should already be trimmed, but be safe)
      if (isFirst) {
        cleanText = cleanText.replace(/^\s+/, "");
      }

      // Handle spacing: last child should NEVER have trailing space
      if (isLast) {
        // Always remove trailing space from last child - be aggressive
        cleanText = cleanText.replace(/\s+$/, "");
      } else {
        // For non-last children, ensure proper spacing between formatted/unformatted
        if (nextChild) {
          const nextHasFormatting = nextChild.marks.length > 0;
          if ((hasFormatting && !nextHasFormatting) || (!hasFormatting && nextHasFormatting)) {
            // Need space between - ensure it's at the end of this child
            if (!cleanText.match(/\s$/)) {
              cleanText += " ";
            }
          } else {
            // Same formatting type - remove trailing space
            cleanText = cleanText.replace(/\s+$/, "");
          }
        }
      }

      // Add space before if needed (not at start, and transitioning to/from formatting)
      if (!isFirst && prevChild) {
        const prevHasFormatting = prevChild.marks.length > 0;
        if ((hasFormatting && !prevHasFormatting) || (!hasFormatting && prevHasFormatting)) {
          // Need space between - check if previous child already has it
          if (!prevChild.text.match(/\s$/)) {
            // Add space to previous child if it's plain text, otherwise create spacer
            if (prevChild.marks.length === 0) {
              prevChild.text += " ";
            } else {
              // Insert spacer before current child
              finalChildren.push({
                _type: "span",
                text: " ",
                marks: [],
              });
            }
          }
        }
      }

      if (cleanText.length > 0) {
        finalChildren.push({
          _type: "span",
          text: cleanText,
          marks: child.marks,
        });
      }
    }

    // Final pass: ensure last child has no trailing space (safety check)
    if (finalChildren.length > 0) {
      const lastChild = finalChildren[finalChildren.length - 1];
      lastChild.text = lastChild.text.replace(/\s+$/, "");
    }

    // Filter out empty or whitespace-only children
    const validChildren = finalChildren.filter(child => child.text.trim().length > 0);

    if (validChildren.length > 0) {
      blocks.push({
        _type: "block",
        _key: generateKey(),
        style: "normal",
        children: validChildren,
        markDefs: [],
      });
    }
  }

  return blocks.length > 0 ? blocks : [
    {
      _type: "block",
      _key: generateKey(),
      style: "normal",
      children: [{ _type: "span", text: "", marks: [] }],
      markDefs: [],
    },
  ];
}

// Helper function to upload image to Sanity
async function uploadImageToSanity(imageUrl: string): Promise<string | null> {
  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!response.ok) {
      console.warn(`  Failed to fetch image: ${imageUrl}`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const filename = imageUrl.split("/").pop()?.split("?")[0] || "image.jpg";

    const asset = await client.assets.upload("image", Buffer.from(buffer), {
      filename: filename,
    });

    return asset._id;
  } catch (error: any) {
    console.warn(`  Error uploading image: ${error.message || error}`);
    return null;
  }
}

// Helper function to parse markdown to Portable Text
function parseMarkdownToPortableText(text: string): any {
  const children: any[] = [];
  let currentText = "";
  let i = 0;
  const linkDefs: any[] = [];
  let linkCounter = 0;

  // URL pattern (http, https, www)
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

  while (i < text.length) {
    // Check for markdown bold **text**
    if (text.substring(i).match(/^\*\*/)) {
      // Save current text if any
      if (currentText) {
        children.push({
          _type: "span",
          text: currentText,
          marks: [],
        });
        currentText = "";
      }

      // Find closing **
      const endBold = text.indexOf("**", i + 2);
      if (endBold !== -1) {
        const boldText = text.substring(i + 2, endBold);
        children.push({
          _type: "span",
          text: boldText,
          marks: ["strong"],
        });
        i = endBold + 2;
      } else {
        // No closing **, treat as regular text
        currentText += text[i];
        i++;
      }
    } else {
      // Check for URLs - improved pattern to capture full URLs
      const remaining = text.substring(i);
      // Match full URLs (http/https or www.) - stop at whitespace or sentence-ending punctuation
      const urlMatch = remaining.match(/^(https?:\/\/[^\s]+|www\.[^\s.]+(?:\.[^\s.]+)*)/i);

      if (urlMatch) {
        const url = urlMatch[0];

        // Save current text if any
        if (currentText) {
          children.push({
            _type: "span",
            text: currentText,
            marks: [],
          });
          currentText = "";
        }

        // Normalize URL
        let normalizedUrl = url;
        // Add https:// if it starts with www.
        if (normalizedUrl.toLowerCase().startsWith("www.")) {
          normalizedUrl = "https://" + normalizedUrl;
        }
        // Remove trailing punctuation that might have been included (but keep .com, .org, etc.)
        // Only remove if it's clearly sentence-ending punctuation after a space or at end
        normalizedUrl = normalizedUrl.replace(/[.,;:!?()]+$/, "");

        // Create link mark
        const linkKey = `link${linkCounter++}`;
        linkDefs.push({
          _key: linkKey,
          _type: "link",
          href: normalizedUrl,
        });

        // Add URL as link span (use original URL text, but clean trailing punctuation)
        const urlText = url.replace(/[.,;:!?()]+$/, "");
        children.push({
          _type: "span",
          text: urlText,
          marks: [linkKey],
        });

        i += url.length;
      } else {
        currentText += text[i];
        i++;
      }
    }
  }

  // Add remaining text
  if (currentText) {
    children.push({
      _type: "span",
      text: currentText,
      marks: [],
    });
  }

  // Combine consecutive spans with same marks
  const finalChildren: any[] = [];
  let currentSpan = { text: "", marks: [] as string[] };

  for (const child of children) {
    const marksKey = child.marks.sort().join(",");
    const currentMarksKey = currentSpan.marks.sort().join(",");

    if (marksKey === currentMarksKey) {
      currentSpan.text += child.text;
    } else {
      if (currentSpan.text) {
        finalChildren.push({
          _type: "span",
          text: currentSpan.text,
          marks: currentSpan.marks,
        });
      }
      currentSpan = { text: child.text, marks: child.marks };
    }
  }

  if (currentSpan.text) {
    finalChildren.push({
      _type: "span",
      text: currentSpan.text,
      marks: currentSpan.marks,
    });
  }

  // Add proper spacing between formatted and unformatted text
  const spacedChildren: any[] = [];
  for (let i = 0; i < finalChildren.length; i++) {
    const child = finalChildren[i];
    const isFirst = i === 0;
    const isLast = i === finalChildren.length - 1;
    const hasFormatting = child.marks.length > 0;
    const prevChild = i > 0 ? finalChildren[i - 1] : null;
    const nextChild = i < finalChildren.length - 1 ? finalChildren[i + 1] : null;

    let text = child.text;

    // Add space before if transitioning to/from formatting
    if (!isFirst && prevChild) {
      const prevHasFormatting = prevChild.marks.length > 0;
      if ((hasFormatting && !prevHasFormatting) || (!hasFormatting && prevHasFormatting)) {
        if (!prevChild.text.match(/\s$/)) {
          if (prevChild.marks.length === 0) {
            spacedChildren[spacedChildren.length - 1].text += " ";
          } else {
            spacedChildren.push({
              _type: "span",
              text: " ",
              marks: [],
            });
          }
        }
      }
    }

    // Add space after if transitioning to/from formatting (but not at end)
    if (!isLast && nextChild) {
      const nextHasFormatting = nextChild.marks.length > 0;
      if ((hasFormatting && !nextHasFormatting) || (!hasFormatting && nextHasFormatting)) {
        if (!text.match(/\s$/)) {
          text += " ";
        }
      }
    }

    // Remove trailing space from last child
    if (isLast) {
      text = text.replace(/\s+$/, "");
    }

    if (text.length > 0) {
      spacedChildren.push({
        _type: "span",
        text: text,
        marks: child.marks,
      });
    }
  }

  return {
    _type: "block",
    _key: generateKey(),
    style: "normal",
    children: spacedChildren.length > 0 ? spacedChildren : [{ _type: "span", text: "", marks: [] }],
    markDefs: linkDefs,
  };
}

// Helper function to calculate read time
function calculateReadTime(text: string): string {
  const words = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

async function populateFromText(filePath: string) {
  try {
    let content = "";
    let imagePathInBundle: string | undefined;

    // Handle RTFD bundles (macOS)
    if (filePath.endsWith(".rtfd")) {
      const txtRtfPath = path.join(filePath, "TXT.rtf");
      const txtPath = path.join(filePath, "TXT.txt");

      // Look for images in the bundle
      const files = fs.readdirSync(filePath);
      const imageFile = files.find(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
      if (imageFile) {
        imagePathInBundle = path.join(filePath, imageFile);
      }

      if (fs.existsSync(txtRtfPath)) {
        content = fs.readFileSync(txtRtfPath, "utf-8");
      } else if (fs.existsSync(txtPath)) {
        content = fs.readFileSync(txtPath, "utf-8");
      } else {
        console.error(`Could not find TXT.rtf or TXT.txt in RTFD bundle.`);
        console.error(`Available files: ${files.join(", ")}`);
        return;
      }
    } else if (filePath.endsWith(".rtf")) {
      content = fs.readFileSync(filePath, "utf-8");
    } else {
      content = fs.readFileSync(filePath, "utf-8");
    }

    console.log(`Parsing article from: ${filePath}\n`);

    // Parse RTF with formatting
    let metadata: { [key: string]: string } = {};
    let bodyBlocks: any[] = [];

    if (filePath.endsWith(".rtf") || filePath.endsWith(".rtfd")) {
      const parsed = parseRtfWithFormatting(content);
      metadata = parsed.metadata;
      bodyBlocks = rtfBodyToPortableText(parsed.body);
    } else {
      // Plain text parsing with markdown support
      const lines = content.split("\n");
      let inBody = false;
      const bodyLines: string[] = [];
      let currentField: string | null = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const fieldMatch = line.match(/^(title|date|published at|image url|image caption|author|category|excerpt|read time|embedlink|body):\s*(.*)$/i);

        if (fieldMatch) {
          const fieldName = fieldMatch[1].toLowerCase().replace(/\s+/g, "");
          const fieldValue = fieldMatch[2].trim();

          if (fieldName === "body") {
            inBody = true;
            currentField = null;
          } else {
            // Handle field name variations
            let normalizedField = fieldName;
            if (fieldName === "publishedat") normalizedField = "date";
            if (fieldName === "imageurl") normalizedField = "image";
            if (fieldName === "imagecaption") normalizedField = "imagecaption";
            if (fieldName === "embedlink") normalizedField = "embedlink";

            if (fieldValue && fieldValue !== "(none – video article)" && fieldValue !== "(none)") {
              metadata[normalizedField] = fieldValue;
            } else if (fieldValue === "(none – video article)" || fieldValue === "(none)") {
              // Explicitly skip - no value
              currentField = null;
            } else {
              // Field with no value on same line - next line(s) contain value
              currentField = normalizedField;
            }
          }
        } else if (currentField && !inBody) {
          // Continue metadata value on next line
          const trimmed = line.trim();
          if (trimmed && trimmed !== "(none – video article)" && trimmed !== "(none)") {
            metadata[currentField] = (metadata[currentField] || "") + (metadata[currentField] ? " " : "") + trimmed;
          } else {
            // Empty line or "(none)" ends the field
            currentField = null;
          }
        } else if (inBody) {
          bodyLines.push(line);
        }
      }

      // Convert plain text body to blocks with markdown parsing
      const bodyText = bodyLines.join("\n\n");
      const paragraphs = bodyText.split(/\n\n+/).filter(p => p.trim());
      bodyBlocks = paragraphs.map(para => parseMarkdownToPortableText(para.trim()));
    }

    const title = metadata.title || metadata.Title;
    if (!title) {
      console.error("Could not extract title from document. Please ensure 'title:' field is present.");
      return;
    }

    // Clean up metadata values (remove extra whitespace)
    Object.keys(metadata).forEach(key => {
      if (typeof metadata[key] === 'string') {
        metadata[key] = metadata[key].trim();
      }
    });

    console.log(`Title: ${title}`);
    console.log(`Body blocks: ${bodyBlocks.length}\n`);

    // Upload image if provided
    let imageStructure: any = undefined;
    const imageUrl = metadata.image || metadata.Image || metadata.imageurl || metadata["image url"];
    const imageCaption = metadata.imagecaption || metadata["image caption"] || metadata.ImageCaption;

    if (imagePathInBundle) {
      console.log(`Uploading image from bundle: ${imagePathInBundle}`);
      try {
        const imageBuffer = fs.readFileSync(imagePathInBundle);
        const filename = path.basename(imagePathInBundle);
        const asset = await client.assets.upload("image", imageBuffer, {
          filename: filename,
        });
        imageStructure = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        };
        if (imageCaption) {
          imageStructure.caption = imageCaption;
        }
        console.log(`✓ Image uploaded from bundle\n`);
      } catch (error: any) {
        console.warn(`  ⚠ Failed to upload image from bundle: ${error.message || error}\n`);
      }
    } else if (imageUrl) {
      console.log(`Uploading image: ${imageUrl}`);
      const assetId = await uploadImageToSanity(imageUrl);
      if (assetId) {
        imageStructure = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: assetId,
          },
        };
        if (imageCaption) {
          imageStructure.caption = imageCaption;
        }
        console.log(`✓ Image uploaded\n`);
      }
    }

    // Parse date
    let publishedAt = metadata.date || metadata.Date || metadata.publishedAt || metadata.PublishedAt;
    if (publishedAt) {
      // Try to parse date
      const dateMatch = publishedAt.match(/(\d{4})-(\d{2})-(\d{2})/) ||
                        publishedAt.match(/(October|November|December|January|February|March|April|May|June|July|August|September)\s+(\d{1,2}),?\s+(\d{4})/i);
      if (dateMatch) {
        try {
          const date = new Date(publishedAt);
          if (!isNaN(date.getTime())) {
            publishedAt = date.toISOString();
          }
        } catch (e) {
          // Use current date as fallback
          publishedAt = new Date().toISOString();
        }
      } else {
        publishedAt = new Date().toISOString();
      }
    } else {
      publishedAt = new Date().toISOString();
    }

    // Calculate read time from body text
    const bodyText = bodyBlocks.map(block =>
      block.children.map((child: any) => child.text).join("")
    ).join(" ");
    const readTime = calculateReadTime(bodyText);

    // Extract excerpt from first paragraph
    let excerpt = metadata.excerpt || metadata.Excerpt;
    if (!excerpt && bodyBlocks.length > 0) {
      const firstBlock = bodyBlocks[0];
      const firstParagraphText = firstBlock.children
        .map((child: any) => child.text)
        .join("")
        .trim();
      excerpt = firstParagraphText;
    }

    // Determine author - check metadata first, then look for closing/signature patterns only
    let author = metadata.author || metadata.Author;
    if (!author) {
      // Look for author only in closing/signature patterns (not in quotes)
      // Patterns that indicate a closing or signature:
      const closingPatterns = [
        /(?:Sincerely|Best regards|Regards|Thank you|Thanks|Yours truly|Respectfully),?\s*[-—]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
        /(?:Sincerely|Best regards|Regards|Thank you|Thanks|Yours truly|Respectfully),?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
        /^[-—]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*$/m, // Standalone signature line
        /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*[-—]\s*(?:CEO|Founder|President|Director|Manager|Lead|Head)/i, // Name followed by dash and title (signature style)
      ];

      // Only check the last portion of the body text (where closings typically appear)
      const lastPortion = bodyText.substring(Math.max(0, bodyText.length - 500));

      for (const pattern of closingPatterns) {
        const match = lastPortion.match(pattern);
        if (match && match[1]) {
          const potentialAuthor = match[1].trim();
          // Validate it looks like a name (2-4 words, capitalized properly)
          if (potentialAuthor.split(/\s+/).length <= 4 && potentialAuthor.match(/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+$/)) {
            author = potentialAuthor;
            break;
          }
        }
      }
    }

    // Default to "KEO World" if no author found
    if (!author || author.trim().length === 0) {
      author = "KEO World";
    }

    // Create article
    const article: any = {
      _type: "article",
      title: title.trim(),
      slug: {
        _type: "slug",
        current: title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      },
      publishedAt: publishedAt,
      excerpt: excerpt || "",
      category: metadata.category || metadata.Category || "Company Updates",
      readTime: readTime,
      body: bodyBlocks,
      ...(imageStructure && { image: imageStructure }),
      ...(metadata.embedlink && metadata.embedlink.trim() ? { embedLink: metadata.embedlink.trim() } : {}),
      author: author.trim(),
      ...(metadata.authorrole || metadata["author role"] ? { authorRole: (metadata.authorrole || metadata["author role"]).trim() } : {}),
    };

    const created = await client.create(article);
    console.log(`✓ Article created: ${created._id}`);
    console.log(`  Slug: ${article.slug.current}`);
    console.log(`  Date: ${article.publishedAt}`);
    console.log(`  Body blocks: ${bodyBlocks.length}`);
    console.log(`  Read time: ${readTime}`);

  } catch (error: any) {
    console.error("Error:", error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

// Main
const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: npx tsx scripts/populate-from-text.ts <path-to-file>");
  console.error("\nSupported formats:");
  console.error("  - .txt files");
  console.error("  - .rtf files");
  console.error("  - .rtfd bundles (macOS)");
  console.error("\nFormat: Use fields like 'title:', 'date:', 'body:' etc.");
  process.exit(1);
}

populateFromText(filePath).catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
