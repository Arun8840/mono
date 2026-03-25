import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@repo/env";

export const db = drizzle(env.DATABASE_URL);
export * from "./schema/index";
