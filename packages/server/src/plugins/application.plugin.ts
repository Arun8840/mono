import { Elysia } from "elysia";
import { createApplicationService } from "../service/application.service";

export const applicationPlugin = new Elysia({
  name: "plugin:application",
}).decorate("applicationService", createApplicationService());
