import { relations } from "drizzle-orm"
import { jsonb, text } from "drizzle-orm/pg-core"
import { timestamp } from "drizzle-orm/pg-core"
import { uuid } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"
import { user } from "./auth-schema"
import { index } from "drizzle-orm/pg-core"

export type ComponentStyle = {
  backgroundColor?: string | null
  padding?: number | null
  margin?: number | null
  border?: string | null
  borderRadius?: number | null
  boxShadow?: string | null
  opacity?: number | null
  cursor?: string | null
  transition?: string | null
}
export type PositionType = {
  x: number
  y: number
  w: number
  h: number
}

export type PropertiesTypes = {
  content?: string | null
  href?: string | null
  src?: string | null
  alt?: string | null
}
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

// * FOR APPLICATION PAGES
export const appPageSchemaTable = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  applicationId: uuid("applicationId")
    .references(() => appSchemaTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  styles: jsonb("styles")
    .$type<{
      background?: string
      padding?: string | null
    }>()
    .default({
      background: "#000000",
      padding: null,
    }),
})

// * FOR APPLICATION COMPONENTS

export const appComponentsSchemaTable = pgTable(
  "components",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    applicationId: uuid("applicationId")
      .references(() => appSchemaTable.id, { onDelete: "cascade" })
      .notNull(),
    pageId: uuid("pageId")
      .references(() => appPageSchemaTable.id, { onDelete: "cascade" })
      .notNull(),
    styles: jsonb("styles").$type<ComponentStyle>(),
    position: jsonb("position").$type<PositionType>().notNull(),
    properties: jsonb("properties").$type<PropertiesTypes>(),
  },
  (table) => {
    return {
      pageIdIdx: index("page_id_idx").on(table.pageId),
      applicationIdIdx: index("application_id_idx").on(table.applicationId),
    }
  },
)

// * RELATIONS

export const appSchemaTableRelations = relations(appSchemaTable, ({ one }) => {
  return {
    user: one(user, { fields: [appSchemaTable.userId], references: [user.id] }),
  }
})
export const appPageRelations = relations(
  appPageSchemaTable,
  ({ one, many }) => ({
    application: one(appSchemaTable, {
      fields: [appPageSchemaTable.applicationId],
      references: [appSchemaTable.id],
    }),
    components: many(appComponentsSchemaTable),
  }),
)
export const componentsRelations = relations(
  appComponentsSchemaTable,
  ({ one }) => ({
    appPage: one(appPageSchemaTable, {
      fields: [appComponentsSchemaTable.pageId],
      references: [appPageSchemaTable.id],
    }),
  }),
)
