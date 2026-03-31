import { treaty } from "@elysiajs/eden";
import { env } from "@repo/env";
import { App } from "./app";

const domain =
  typeof window === "undefined"
    ? (env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001")
    : window.location.origin;

type Api = ReturnType<typeof treaty<App>>["api"];

export const client: Api = treaty<App>(domain).api;
