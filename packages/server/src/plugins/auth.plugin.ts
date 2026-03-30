import { Elysia, status } from "elysia";
import { auth } from "@repo/better-auth/server";

export const authPlugin = new Elysia({ name: "auth-plugin" })
  .mount("/api/auth", auth.handler)
  .macro({
    auth: {
      async resolve({ request }) {
        const session = await auth.api.getSession({
          headers: request.headers,
        });

        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
