import { relations } from "drizzle-orm"
import { text } from "drizzle-orm/pg-core"
import { timestamp } from "drizzle-orm/pg-core"
import { uuid } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"
import { user } from "./auth-schema"

export const appSchemaTable = pgTable("application", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  userId: text("userId")
    .references(() => user?.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const appSchemaTableRelations = relations(appSchemaTable, ({ one }) => {
  return {
    user: one(user, { fields: [appSchemaTable.userId], references: [user.id] }),
  }
})
