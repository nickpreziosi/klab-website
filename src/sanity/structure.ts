import type { StructureResolver } from "sanity/structure";
import { POC_DEMO_DOCUMENT_ID } from "./schemaTypes/pocDemoType";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("POC demo")
        .id(POC_DEMO_DOCUMENT_ID)
        .child(S.document().schemaType("pocDemo").documentId(POC_DEMO_DOCUMENT_ID)),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "pocDemo"),
    ]);
