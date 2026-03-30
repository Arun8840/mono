import { Elysia } from "elysia"
import { createTaskService } from "../service"

export const taskPlugin = new Elysia({ name: "task-service-plugin" }).decorate(
  "taskService",
  createTaskService(),
)
