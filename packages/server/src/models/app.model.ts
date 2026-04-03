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

// * APPLICATION PAGE COMPONENTS MODEL
export const componentCreationModel = t.Object({
  name: t.String({ minLength: 1, error: "Name is required" }),
  applicationId: t.String({
    minLength: 1,
    error: "Application ID is required",
  }),
  pageId: t.String({
    minLength: 1,
    error: "Page ID is required",
  }),
  styles: t.Optional(t.Object({})),
  position: t.Optional(
    t.Object({
      x: t.Number(),
      y: t.Number(),
      w: t.Number(),
      h: t.Number(),
    }),
  ),
  properties: t.Optional(
    t.Object({
      content: t.String(),
      href: t.Optional(t.String()),
      src: t.Optional(t.String()),
      alt: t.Optional(t.String()),
    }),
  ),
})

export const componentRemoveModel = t.Object({
  appId: t.String({ minLength: 1, error: "Application ID is required" }),
  pageId: t.String({ minLength: 1, error: "Page ID is required" }),
  componentId: t.String({ minLength: 1, error: "Component ID is required" }),
})

export const componentUpdateModel = t.Object({
  id: t.String({ minLength: 1, error: "ID is required" }),
  name: t.String({ minLength: 1, error: "Name is required" }),
  applicationId: t.String({
    minLength: 1,
    error: "Application ID is required",
  }),
  pageId: t.String({
    minLength: 1,
    error: "Page ID is required",
  }),
  styles: t.Optional(t.Object({})),
  position: t.Optional(
    t.Object({
      x: t.Number(),
      y: t.Number(),
      w: t.Number(),
      h: t.Number(),
    }),
  ),
  properties: t.Optional(
    t.Object({
      content: t.String(),
      href: t.Optional(t.String()),
      src: t.Optional(t.String()),
      alt: t.Optional(t.String()),
    }),
  ),
})

export const componentMoveModel = t.Object({
  componentId: t.String({ minLength: 1, error: "Component ID is required" }),
  appId: t.String({
    minLength: 1,
    error: "Application ID is required",
  }),
  pageId: t.String({
    minLength: 1,
    error: "Page ID is required",
  }),
  position: t.Object({
    x: t.Number(),
    y: t.Number(),
    w: t.Number(),
    h: t.Number(),
  }),
})

export type ApplicationCreationModel = Static<typeof applicationCreationModel>
export type ApplicationUpdateModel = Static<typeof applicationUpdateModel>
export type ApplicationDeleteModel = Static<typeof applicationDeleteModel>
export type PageCreationModel = Static<typeof pageCreationModel>
export type PageUpdateModel = Static<typeof pageUpdateModel>
export type PageDeleteModel = Static<typeof pageDeleteModel>
export type ComponentCreationModel = Static<typeof componentCreationModel>
export type ComponentRemoveModel = Static<typeof componentRemoveModel>
export type ComponentUpdateModel = Static<typeof componentUpdateModel>
export type ComponentMoveModel = Static<typeof componentMoveModel>
