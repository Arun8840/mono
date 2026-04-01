import { treaty, Treaty } from "@elysiajs/eden";
import type { App } from "./app";
import { authClient } from "@repo/better-auth";

const domain =
  typeof window === "undefined"
    ? (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001")
    : window.location.origin;

export const client: Treaty.Create<App>["api"] = treaty<App>(domain, {
  fetcher: async (url, options) => {
    const response = await fetch(url, options);
    if (response.status === 401) {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/auth/login";
          },
        },
      });
    }
    return response;
  },
}).api;
