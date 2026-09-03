import { type SchemaTypeDefinition } from "sanity";
import { articleType } from "./articleType";
import { internationalArticleType } from "./internationalArticleType";
import { pocDemoType } from "./pocDemoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [articleType, internationalArticleType, pocDemoType],
};
