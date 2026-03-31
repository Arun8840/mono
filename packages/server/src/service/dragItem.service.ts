import { db, dragItemSchema } from "@repo/db";
import { CreateDragItemSchemaInput } from "@repo/validations";

export const createDragItemService = () => {
  return {
    getAll: async () => {
      const response = await db.select().from(dragItemSchema);
      return response;
    },
    create: async (data: CreateDragItemSchemaInput) => {
      const request = {
        name: data.name,
        type: data.type,
        componentType: data.componentType,
      };
      const response = await db.insert(dragItemSchema).values(request);

      return {
        message: "Drag item created successfully",
        data: response,
      };
    },
  };
};

export type DragItemService = ReturnType<typeof createDragItemService>;
