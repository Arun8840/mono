import { t } from "elysia";
import type { Static } from "@sinclair/typebox";

const typeEnum = t.Enum({
  group: "group",
  component: "component",
});
export const dragItemCreationModel = t.Object({
  name: t.String(),
  componentType: t.String(),
  type: typeEnum,
});

export type DragItemCreationModel = Static<typeof dragItemCreationModel>;
