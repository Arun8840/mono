import { pgEnum } from "drizzle-orm/pg-core";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const typeEnum = pgEnum("type", ["group", "component"]);
export const componentTypeEnum = pgEnum("componentType", [
  "input",
  "button",
  "asset",
  "text",
]);
export const dragItemSchema = pgTable("dragItems", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  componentType: componentTypeEnum("componentType").notNull(),
  type: typeEnum("type").notNull(),
});
