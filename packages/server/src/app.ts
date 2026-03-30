import { Elysia } from "elysia"
import { taskController } from "./controller/task.controller"

export const app = new Elysia({ prefix: "/api" }).use(taskController)

export type App = typeof app
