import { drizzle } from "drizzle-orm/neon-http"
import { env } from "@repo/env"
import * as schema from "./schema"

export const db = drizzle(env.DATABASE_URL, { schema })
export * from "./schema/index"
