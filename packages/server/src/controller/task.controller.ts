import { Elysia, t } from "elysia"
import { taskPlugin } from "../plugins"
import { authPlugin } from "../plugins/auth.plugin"

export const taskController = new Elysia()
  .use(taskPlugin)
  .use(authPlugin)
  .group("/tasks", (app) =>
    app.get("/", ({ taskService }) => taskService.getAll(), {
      auth: true,
    }),
  )
