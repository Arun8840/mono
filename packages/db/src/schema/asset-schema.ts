import { timestamp } from "drizzle-orm/pg-core"
import { uuid } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"
import { appComponentsSchemaTable } from "./app-schema"
import { relations } from "drizzle-orm"
import { text } from "drizzle-orm/pg-core"

export const assetSchemaTable = pgTable("assets", {
  id: uuid("id").primaryKey(),
  src: text("src").notNull(),
  componentId: uuid("componentId")
    .references(() => appComponentsSchemaTable.id, { onDelete: "cascade" })
    .notNull(),
  applicationId: uuid("applicationId").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const assetsRelations = relations(assetSchemaTable, ({ one }) => ({
  component: one(appComponentsSchemaTable, {
    fields: [assetSchemaTable.id],
    references: [appComponentsSchemaTable.id],
  }),
}))
