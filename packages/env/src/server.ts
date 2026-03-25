import { z } from "zod";

export const serverSchema = {
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),
};
