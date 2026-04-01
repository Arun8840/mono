import Elysia from "elysia"
import { authPlugin } from "../plugins/auth.plugin"
import { User } from "@repo/better-auth/server"
import { createApplicationSchema } from "@repo/validations"
import { applicationPlugin } from "../plugins/application.plugin"
import {
  deleteApplicationSchema,
  udpateApplicationSchema,
} from "@repo/validations/application.schema"

const checkAuth = (user: User) => {
  if (!user) {
    throw new Error("Unauthorized", {
      cause: {
        status: 401,
        message: "Unauthorized",
      },
    })
  }
}
export const applicationController = new Elysia()
  .use(authPlugin)
  .use(applicationPlugin)
  .group("/app", (app) =>
    app
      .get(
        "/",
        ({ applicationService, user }) => {
          checkAuth(user)
          return applicationService.getAll(user?.id)
        },
        {
          auth: true,
        },
      )
      .post(
        "/create",
        ({ applicationService, body, user }) => {
          checkAuth(user)
          return applicationService.create(body, user.id)
        },
        {
          auth: true,
          body: createApplicationSchema,
        },
      )
      .post(
        "/remove",
        ({ applicationService, body, user }) => {
          checkAuth(user)
          return applicationService.remove(body?.appId)
        },
        {
          auth: true,
          body: deleteApplicationSchema,
        },
      )
      .post(
        "/update",
        ({ applicationService, body, user }) => {
          checkAuth(user)
          return applicationService.update(body)
        },
        {
          auth: true,
          body: udpateApplicationSchema,
        },
      ),
  )
