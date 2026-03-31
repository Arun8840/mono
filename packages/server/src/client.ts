import { treaty } from "@elysiajs/eden";
import { App } from "./app";

const domain =
  typeof window === "undefined"
    ? (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001")
    : window.location.origin;

export const client = treaty<App>(domain).api;
