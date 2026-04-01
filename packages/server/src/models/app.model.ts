import { t } from "elysia"
import type { Static } from "@sinclair/typebox"

export const applicationCreationModel = t.Object({
  title: t.String(),
  description: t.String(),
})
export const applicationUpdateModel = t.Object({
  id: t.String(),
  title: t.String(),
  description: t.String(),
})
export const applicationDeleteModel = t.Object({
  appId: t.String(),
})

// * APPLICATION PAGE MODEL
export const pageCreationModel = t.Object({
  title: t.String({ minLength: 1, error: "Title is required" }),
  description: t.Optional(t.String()),
  applicationId: t.String({
    minLength: 1,
    error: "Application ID is required",
  }),
  styles: t.Optional(t.Object({})),
})
export const pageDeleteModel = t.Object({
  appId: t.String({ minLength: 1, error: "Application ID is required" }),
  pageId: t.String({ minLength: 1, error: "Page ID is required" }),
})
export const pageUpdateModel = t.Object({
  id: t.String({ minLength: 1, error: "ID is required" }),
  title: t.String({ minLength: 1, error: "Title is required" }),
  description: t.Optional(t.String()),
  applicationId: t.String({
    minLength: 1,
    error: "Application ID is required",
  }),
  styles: t.Optional(t.Object({})),
})

export type ApplicationCreationModel = Static<typeof applicationCreationModel>
export type ApplicationUpdateModel = Static<typeof applicationUpdateModel>
export type ApplicationDeleteModel = Static<typeof applicationDeleteModel>
export type PageCreationModel = Static<typeof pageCreationModel>
export type PageUpdateModel = Static<typeof pageUpdateModel>
export type PageDeleteModel = Static<typeof pageDeleteModel>
