import { Elysia } from "elysia";
import { dragController } from "./controller";

export const app = new Elysia({ prefix: "/api" }).use(dragController);

export type App = typeof app;
