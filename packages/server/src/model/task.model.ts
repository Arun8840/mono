import { t } from "elysia"

// This is your "Schema" and "Type" combined
export const UserModel = t.Object({
  id: t.Number(),
  name: t.String(),
  email: t.String({ format: "email" }),
  role: t.Union([t.Literal("admin"), t.Literal("user")]),
})

export type User = typeof UserModel.static
