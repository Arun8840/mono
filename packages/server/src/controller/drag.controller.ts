import Elysia from "elysia";
import { authPlugin } from "../plugins/auth.plugin";
import { dragPlugin } from "../plugins/drag.plugin";
import { User } from "@repo/better-auth/server";
import { dragItemCreateSchema } from "@repo/validations";

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
          body: dragItemCreateSchema,
        },
      ),
  );
