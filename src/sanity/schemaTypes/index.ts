import { type SchemaTypeDefinition } from "sanity";
import { articleType } from "./articleType";
import { internationalArticleType } from "./internationalArticleType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [articleType, internationalArticleType],
};
