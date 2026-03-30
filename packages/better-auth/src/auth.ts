import { betterAuth } from "better-auth"
import { drizzleAdapter } from "@better-auth/drizzle-adapter"
import { env } from "@repo/env"
import { db } from "@repo/db"
import * as schema from "@repo/db/schema"

export const auth = betterAuth({
  baseUrl: env.NEXT_PUBLIC_APP_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [env.NEXT_PUBLIC_APP_URL, "http://localhost:3001"],
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
