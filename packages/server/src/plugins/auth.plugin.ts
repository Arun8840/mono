import { Elysia } from "elysia";
import { auth } from "@repo/better-auth/server";

export const authPlugin = new Elysia({ name: "plugin:auth" })
  .mount("/api/auth", auth.handler)
  .macro({
    auth: {
      async resolve({ request, set }) {
        const session = await auth.api.getSession({
          headers: request.headers,
        });

        if (!session?.user) {
          set.status = 401;
          throw new Error("Unauthorized");
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
