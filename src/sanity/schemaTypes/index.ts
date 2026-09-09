import { type SchemaTypeDefinition } from "sanity";
import { articleType } from "./articleType";
import { internationalArticleType } from "./internationalArticleType";
import { pocType } from "./pocType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [articleType, internationalArticleType, pocType],
};
