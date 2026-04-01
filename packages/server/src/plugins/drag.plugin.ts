import { Elysia } from "elysia";
import { createDragItemService } from "../service/dragItem.service";

export const dragPlugin = new Elysia({ name: "plugin:drag" }).decorate(
  "dragItemService",
  createDragItemService(),
);
