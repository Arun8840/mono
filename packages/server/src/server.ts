import { treaty, Treaty } from "@elysiajs/eden";
import { app } from "./app";

type Api = Treaty.Create<typeof app>["api"];

export const server: Api = treaty(app).api;
