import Elysia from "elysia";
import { User } from "@repo/better-auth/server";
import { dragItemCreationModel } from "../models/drag.model";
import { authPlugin, dragPlugin } from "../plugins";

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
export const dragController = new Elysia()
  .use(authPlugin)
  .use(dragPlugin)
  .group("/dragItems", (app) =>
    app
      .get(
        "/",
        ({ dragItemService, user }) => {
          checkAuth(user);
          return dragItemService.getAll();
        },
        {
          auth: true,
        },
      )
      .post(
        "/create",
        ({ dragItemService, body, user }) => {
          checkAuth(user);
          return dragItemService.create(body);
        },
        {
          auth: true,
          body: dragItemCreationModel,
        },
      ),
  );
