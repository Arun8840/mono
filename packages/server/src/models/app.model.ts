import { t } from "elysia";
import type { Static } from "@sinclair/typebox";

export const applicationCreationModel = t.Object({
  title: t.String(),
  description: t.String(),
});
export const applicationUpdateModel = t.Object({
  id: t.String(),
  title: t.String(),
  description: t.String(),
});
export const applicationDeleteModel = t.Object({
  appId: t.String(),
});

export type ApplicationCreationModel = Static<typeof applicationCreationModel>;
export type ApplicationUpdateModel = Static<typeof applicationUpdateModel>;
export type ApplicationDeleteModel = Static<typeof applicationDeleteModel>;
