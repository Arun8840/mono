import { db, appSchemaTable } from "@repo/db";
import { eq } from "drizzle-orm";
import {
  ApplicationCreationModel,
  ApplicationDeleteModel,
  ApplicationUpdateModel,
} from "../models/app.model";

export const createApplicationService = () => {
  return {
    getAll: async (userId: string) => {
      const response = await db
        .select({
          id: appSchemaTable.id,
          title: appSchemaTable.title,
        })
        .from(appSchemaTable)
        .where(eq(appSchemaTable.userId, userId));

      if (!response) {
        throw new Error("No applications found", {
          cause: {
            status: 404,
            message: "No applications found",
          },
        });
      }
      return response;
    },
    create: async (data: ApplicationCreationModel, userId: string) => {
      if (!data?.title) {
        throw new Error("Invalid application data", {
          cause: {
            status: 400,
            message: "Invalid application data",
          },
        });
      }
      const request = {
        id: crypto.randomUUID(),
        userId: userId,
        title: data.title,
        description: data.description,
      };
      const response = await db.insert(appSchemaTable).values(request);

      if (!response) {
        throw new Error("Failed to create application", {
          cause: {
            status: 500,
            message: "Failed to create application",
          },
        });
      }
      return {
        message: "Application created successfully",
        data: response,
      };
    },
    remove: async (data: ApplicationDeleteModel) => {
      if (!data?.appId) {
        throw new Error("Invalid application data", {
          cause: {
            status: 400,
            message: "Invalid application data",
          },
        });
      }
      const response = await db
        .delete(appSchemaTable)
        .where(eq(appSchemaTable.id, data.appId));

      if (!response) {
        throw new Error("Failed to delete application", {
          cause: {
            status: 500,
            message: "Failed to delete application",
          },
        });
      }
      return {
        message: "Application deleted successfully",
        data: response,
      };
    },
    update: async (data: ApplicationUpdateModel) => {
      if (!data?.id || !data?.title || !data?.description) {
        throw new Error("Invalid application data", {
          cause: {
            status: 400,
            message: "Invalid application data",
          },
        });
      }
      const response = await db
        .update(appSchemaTable)
        .set(data)
        .where(eq(appSchemaTable.id, data.id));

      if (!response) {
        throw new Error("Failed to update application", {
          cause: {
            status: 500,
            message: "Failed to update application",
          },
        });
      }
      return {
        message: "Application updated successfully",
        data: response,
      };
    },
  };
};

export type ApplicationService = ReturnType<typeof createApplicationService>;
