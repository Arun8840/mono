import { Elysia } from "elysia"
import { applicationController, dragController } from "./controller"

export const app = new Elysia({ prefix: "/api" })
  .use(dragController)
  .use(applicationController)

export type App = typeof app
