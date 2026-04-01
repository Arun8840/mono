import { Elysia } from "elysia"
import { createApplicationService } from "../service/application.service"

export const applicationPlugin = new Elysia({
  name: "application-service-plugin",
}).decorate("applicationService", createApplicationService())
