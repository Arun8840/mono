import { treaty } from "@elysiajs/eden"
import { app } from "./app"

type Api = ReturnType<typeof treaty<typeof app>>["api"]

export const server: Api = treaty(app).api
