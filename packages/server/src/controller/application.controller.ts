import Elysia from "elysia";
import { authPlugin } from "../plugins/auth.plugin";
import { User } from "@repo/better-auth/server";
import { applicationPlugin } from "../plugins/application.plugin";

import {
  applicationCreationModel,
  applicationDeleteModel,
  applicationUpdateModel,
} from "../models/app.model";

const checkAuth = (user: User) => {
  if (!user) {
    throw new Error("Unauthorized", {
      cause: {
        status: 401,
        message: "Unauthorized",
      },
    });
  }
};
export const applicationController = new Elysia()
  .use(authPlugin)
  .use(applicationPlugin)
  .group("/app", (app) =>
    app
      .get(
        "/",
        ({ applicationService, user }) => {
          return applicationService.getAll(user?.id);
        },
        {
          auth: true,
        },
      )
      .post(
        "/create",
        ({ applicationService, body, user }) => {
          return applicationService.create(body, user!.id);
        },
        {
          auth: true,
          body: applicationCreationModel,
        },
      )
      .post(
        "/remove",
        ({ applicationService, body, user }) => {
          return applicationService.remove({ appId: body.appId });
        },
        {
          auth: true,
          body: applicationDeleteModel,
        },
      )
      .post(
        "/update",
        ({ applicationService, body, user }) => {
          return applicationService.update(body);
        },
        {
          auth: true,
          body: applicationUpdateModel,
        },
      ),
  );
