import { pgEnum } from "drizzle-orm/pg-core"
import { pgTable, text, uuid } from "drizzle-orm/pg-core"

export const typeEnum = pgEnum("type", ["group", "component"])

export const dragItemSchema = pgTable("dragItems", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  componentType: text("componentType").notNull(),
  type: typeEnum("type").notNull(),
})
