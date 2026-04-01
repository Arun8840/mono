import { db, appSchemaTable, appPageSchemaTable } from "@repo/db"
import { and, eq } from "drizzle-orm"
import {
  ApplicationCreationModel,
  ApplicationDeleteModel,
  ApplicationUpdateModel,
  PageCreationModel,
  PageDeleteModel,
  PageUpdateModel,
} from "../models/app.model"

export const createApplicationService = () => {
  return {
    getAll: async (userId: string) => {
      const response = await db
        .select({
          id: appSchemaTable.id,
          title: appSchemaTable.title,
        })
        .from(appSchemaTable)
        .where(eq(appSchemaTable.userId, userId))

      if (!response) {
        throw new Error("No applications found", {
          cause: {
            status: 404,
            message: "No applications found",
          },
        })
      }
      return response
    },
    create: async (data: ApplicationCreationModel, userId: string) => {
      if (!data?.title) {
        throw new Error("Invalid application data", {
          cause: {
            status: 400,
            message: "Invalid application data",
          },
        })
      }
      const request = {
        id: crypto.randomUUID(),
        userId: userId,
        title: data.title,
        description: data.description,
      }
      const response = await db.insert(appSchemaTable).values(request)

      if (!response) {
        throw new Error("Failed to create application", {
          cause: {
            status: 500,
            message: "Failed to create application",
          },
        })
      }
      return {
        message: "Application created successfully",
        data: response,
      }
    },
    remove: async (data: ApplicationDeleteModel) => {
      if (!data?.appId) {
        throw new Error("Invalid application data", {
          cause: {
            status: 400,
            message: "Invalid application data",
          },
        })
      }
      const response = await db
        .delete(appSchemaTable)
        .where(eq(appSchemaTable.id, data.appId))

      if (!response) {
        throw new Error("Failed to delete application", {
          cause: {
            status: 500,
            message: "Failed to delete application",
          },
        })
      }
      return {
        message: "Application deleted successfully",
        data: response,
      }
    },
    update: async (data: ApplicationUpdateModel) => {
      if (!data?.id || !data?.title || !data?.description) {
        throw new Error("Invalid application data", {
          cause: {
            status: 400,
            message: "Invalid application data",
          },
        })
      }
      const response = await db
        .update(appSchemaTable)
        .set(data)
        .where(eq(appSchemaTable.id, data.id))

      if (!response) {
        throw new Error("Failed to update application", {
          cause: {
            status: 500,
            message: "Failed to update application",
          },
        })
      }
      return {
        message: "Application updated successfully",
        data: response,
      }
    },

    // * FOR APPLICATION PAGES SERVICES
    getAllPages: async (applicationId: string) => {
      const response = await db
        .select({
          id: appPageSchemaTable.id,
          title: appPageSchemaTable.title,
          applicationId: appPageSchemaTable.applicationId,
        })
        .from(appPageSchemaTable)
        .where(eq(appPageSchemaTable.applicationId, applicationId))

      if (!response) {
        throw new Error("No pages found", {
          cause: {
            status: 404,
            message: "No pages found",
          },
        })
      }
      return response
    },
    createPage: async (data: PageCreationModel) => {
      if (!data?.title || !data?.applicationId) {
        throw new Error("Invalid application data", {
          cause: {
            status: 400,
            message: "Invalid application data",
          },
        })
      }
      const request = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description ?? "",
        applicationId: data.applicationId,
        styles: data.styles,
      }
      const response = await db.insert(appPageSchemaTable).values(request)

      if (!response) {
        throw new Error("Failed to create page", {
          cause: {
            status: 500,
            message: "Failed to create page",
          },
        })
      }
      return {
        message: "Page created successfully",
        data: response,
      }
    },
    removePage: async (data: PageDeleteModel) => {
      if (!data?.pageId || !data?.appId) {
        throw new Error("Invalid page data", {
          cause: {
            status: 400,
            message: "Invalid page data",
          },
        })
      }
      const response = await db
        .delete(appPageSchemaTable)
        .where(
          and(
            eq(appPageSchemaTable.id, data.pageId),
            eq(appPageSchemaTable.applicationId, data.appId),
          ),
        )

      if (!response) {
        throw new Error("Failed to delete page", {
          cause: {
            status: 500,
            message: "Failed to delete page",
          },
        })
      }
      return {
        message: "Page deleted successfully",
        data: response,
      }
    },
    updatePage: async (data: PageUpdateModel) => {
      if (!data?.id || !data?.title || !data?.applicationId) {
        throw new Error("Invalid page data", {
          cause: {
            status: 400,
            message: "Invalid page data",
          },
        })
      }
      const response = await db
        .update(appPageSchemaTable)
        .set({
          title: data.title,
          description: data.description,
          applicationId: data.applicationId,
          styles: data.styles,
        })
        .where(
          and(
            eq(appPageSchemaTable.id, data.id),
            eq(appPageSchemaTable.applicationId, data.applicationId),
          ),
        )

      if (!response) {
        throw new Error("Failed to update page", {
          cause: {
            status: 500,
            message: "Failed to update page",
          },
        })
      }
      return {
        message: "Page updated successfully",
        data: response,
      }
    },
  }
}

export type ApplicationService = ReturnType<typeof createApplicationService>
