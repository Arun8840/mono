import { Elysia } from "elysia";
import { createDragItemService } from "../service/dragItem.service";

export const dragPlugin = new Elysia({ name: "drag-service-plugin" }).decorate(
  "dragItemService",
  createDragItemService(),
);
