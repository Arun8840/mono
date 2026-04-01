import { relations } from "drizzle-orm"
import { text } from "drizzle-orm/pg-core"
import { timestamp } from "drizzle-orm/pg-core"
import { uuid } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"
import { user } from "./auth-schema"
import { json } from "drizzle-orm/pg-core"

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

// * FOR APPLICATION PAGES
export const appPageSchemaTable = pgTable("pages", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  applicationId: text("applicationId")
    .references(() => appSchemaTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  styles: json("styles")
    .$type<{
      background?: string
      padding?: string | null
    }>()
    .default({
      background: "#000000",
      padding: null,
    }),
})

export const appPageRelations = relations(
  appPageSchemaTable,
  ({ one, many }) => ({
    application: one(appSchemaTable, {
      fields: [appPageSchemaTable.applicationId],
      references: [appSchemaTable.id],
    }),
    // components: many(components),
  }),
)
