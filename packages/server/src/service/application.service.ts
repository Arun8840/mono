import {
  db,
  appSchemaTable,
  appPageSchemaTable,
  appComponentsSchemaTable,
  PositionType,
  assetSchemaTable,
} from "@repo/db"
import { and, eq } from "drizzle-orm"
import {
  ApplicationCreationModel,
  ApplicationDeleteModel,
  ApplicationUpdateModel,
  ComponentCreationModel,
  ComponentMoveModel,
  ComponentRemoveModel,
  ComponentUpdateModel,
  GetAssetModel,
  PageCreationModel,
  PageDeleteModel,
  PageUpdateModel,
  UpdateAssetModel,
  UploadAssetModel,
} from "../models/app.model"
import { status } from "elysia"

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

    // *FOR APPLICATION PAGE COMPONENTS
    getPageComponents: async (pageId: string) => {
      if (!pageId) {
        throw new Error("Invalid page data", {
          cause: {
            status: 400,
            message: "Invalid page data",
          },
        })
      }
      const response = await db.query.appPageSchemaTable.findFirst({
        where: (appComponents) => eq(appComponents.id, pageId),
        with: {
          components: true,
        },
      })

      if (!response) {
        throw new Error("No components found", {
          cause: {
            status: 404,
            message: "No components found",
          },
        })
      }
      return {
        status: 200,
        message: "Components fetched successfully",
        data: response,
      }
    },
    createPageComponent: async (newComponent: ComponentCreationModel) => {
      if (
        !newComponent?.name ||
        !newComponent?.applicationId ||
        !newComponent?.pageId
      ) {
        throw new Error("Invalid component data", {
          cause: {
            status: 400,
            message: "Invalid component data",
          },
        })
      }
      const request = {
        name: newComponent.name,
        type: newComponent.type,
        applicationId: newComponent.applicationId,
        pageId: newComponent.pageId,
        styles: newComponent.styles || {},
        position: (newComponent.position || {
          x: 0,
          y: 0,
          w: 100,
          h: 100,
        }) as PositionType,
        properties: newComponent.properties,
      }
      const [response] = await db
        .insert(appComponentsSchemaTable)
        .values(request)
        .returning()

      if (!response) {
        throw new Error("Failed to create component", {
          cause: {
            status: 500,
            message: "Failed to create component",
          },
        })
      }
      return {
        message: "Component created successfully",
        data: response,
      }
    },
    removePageComponent: async (component: ComponentRemoveModel) => {
      if (
        !component?.componentId ||
        !component?.pageId ||
        !component?.applicationId
      ) {
        throw new Error("Invalid component data", {
          cause: {
            status: 400,
            message: "Invalid component data",
          },
        })
      }
      const [response] = await db
        .delete(appComponentsSchemaTable)
        .where(
          and(
            eq(appComponentsSchemaTable.id, component.componentId),
            eq(appComponentsSchemaTable.pageId, component.pageId),
            eq(appComponentsSchemaTable.applicationId, component.applicationId),
          ),
        )
        .returning()

      if (!response) {
        throw new Error("Failed to delete component", {
          cause: {
            status: 500,
            message: "Failed to delete component",
          },
        })
      }
      return {
        message: "Component deleted successfully",
        data: response,
      }
    },
    updatePageComponent: async (component: ComponentUpdateModel) => {
      if (
        !component?.id ||
        !component?.name ||
        !component?.applicationId ||
        !component?.pageId
      ) {
        throw new Error("Invalid component data", {
          cause: {
            status: 400,
            message: "Invalid component data",
          },
        })
      }
      const [response] = await db
        .update(appComponentsSchemaTable)
        .set({
          name: component.name,
          properties: component.properties,
          position: component.position,
          styles: component.styles,
        })
        .where(
          and(
            eq(appComponentsSchemaTable.id, component.id),
            eq(appComponentsSchemaTable.pageId, component.pageId),
          ),
        )
        .returning()

      if (!response) {
        throw new Error("Failed to update component", {
          cause: {
            status: 500,
            message: "Failed to update component",
          },
        })
      }
      return {
        message: "Component updated successfully",
        data: response,
      }
    },
    movePageComponent: async (component: ComponentMoveModel) => {
      if (
        !component?.componentId ||
        !component?.pageId ||
        !component?.applicationId
      ) {
        throw new Error("Invalid component data", {
          cause: {
            status: 400,
            message: "Invalid component data",
          },
        })
      }
      const [response] = await db
        .update(appComponentsSchemaTable)
        .set({
          position: component.position,
        })
        .where(
          and(
            eq(appComponentsSchemaTable.id, component.componentId),
            eq(appComponentsSchemaTable.pageId, component.pageId),
            eq(appComponentsSchemaTable.applicationId, component.applicationId),
          ),
        )
        .returning()

      if (!response) {
        throw new Error("Failed to move component", {
          cause: {
            status: 500,
            message: "Failed to move component",
          },
        })
      }
      return {
        message: "Component moved successfully",
        data: response,
      }
    },

    //* FOR COMPONENT ASSETS
    getComponentAsset: async (asset: GetAssetModel) => {
      if (!asset?.assetId || !asset?.componentId) {
        throw new Error("Invalid component data", {
          cause: {
            status: 400,
            message: "Invalid asset data",
          },
        })
      }

      const [response] = await db
        .select()
        .from(assetSchemaTable)
        .where(
          and(
            eq(assetSchemaTable?.id, asset?.assetId),
            eq(assetSchemaTable?.componentId, asset?.componentId),
          ),
        )
        .limit(1)

      if (!response) {
        throw new Error("Asset data not found", {
          cause: {
            status: 404,
            message: "Asset not found",
          },
        })
      }

      return {
        status: 200,
        data: response,
        message: "Asset retrieved successfully",
      }
    },
    uploadAsset: async (asset: UploadAssetModel) => {
      if (!asset?.src || !asset?.componentId) {
        throw new Error("Invalid component data", {
          cause: {
            status: 400,
            message: "Invalid asset data",
          },
        })
      }

      const [response] = await db
        .insert(assetSchemaTable)
        .values(asset)
        .returning()

      return {
        status: 200,
        data: response,
        message: "Asset uploaded successfully",
      }
    },
    removeAsset: async (asset: GetAssetModel) => {
      if (!asset?.assetId || !asset?.componentId) {
        throw new Error("Invalid component data", {
          cause: {
            status: 400,
            message: "Invalid asset data",
          },
        })
      }

      const [response] = await db
        .delete(assetSchemaTable)
        .where(
          and(
            eq(assetSchemaTable.id, asset?.assetId),
            eq(assetSchemaTable.componentId, asset?.componentId),
          ),
        )
        .returning()

      return {
        status: 200,
        data: response,
        message: "Asset uploaded successfully",
      }
    },
    // updateAsset: async (asset: UpdateAssetModel) => {
    //   if (!asset?.assetId || !asset?.componentId) {
    //     throw new Error("Invalid component data", {
    //       cause: {
    //         status: 400,
    //         message: "Invalid asset data",
    //       },
    //     })
    //   }

    //   const [response] = await db
    //     .update(assetSchemaTable)
    //     .set({
    //       src: asset?.src,
    //     })
    //     .where(
    //       and(
    //         eq(assetSchemaTable.id, asset?.assetId),
    //         eq(assetSchemaTable?.componentId, asset?.componentId),
    //       ),
    //     )
    //     .returning()

    //   return {
    //     status: 200,
    //     data: response,
    //     message: "Asset uploaded successfully",
    //   }
    // },
  }
}

export type ApplicationService = ReturnType<typeof createApplicationService>
