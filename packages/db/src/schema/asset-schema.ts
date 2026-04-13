import { timestamp } from "drizzle-orm/pg-core"
import { uuid } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"
import { appComponentsSchemaTable } from "./app-schema"
import { relations } from "drizzle-orm"
import { text } from "drizzle-orm/pg-core"

export const assetSchemaTable = pgTable("assets", {
  id: uuid("id")
    .primaryKey()
    .references(() => appComponentsSchemaTable.id, { onDelete: "cascade" })
    .notNull(),
  componentId: uuid("componentId").notNull(),
  applicationId: uuid("applicationId").notNull(),
  src: text("src").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const assetsRelations = relations(assetSchemaTable, ({ one }) => ({
  appPage: one(appComponentsSchemaTable, {
    fields: [assetSchemaTable.componentId],
    references: [appComponentsSchemaTable.id],
  }),
}))
