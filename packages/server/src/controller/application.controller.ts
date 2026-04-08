import Elysia, { t } from "elysia"
import { authPlugin } from "../plugins/auth.plugin"
import { applicationPlugin } from "../plugins/application.plugin"

import {
  applicationCreationModel,
  applicationDeleteModel,
  applicationUpdateModel,
  componentCreationModel,
  componentMoveModel,
  componentRemoveModel,
  componentUpdateModel,
  pageCreationModel,
  pageDeleteModel,
  pageUpdateModel,
} from "../models/app.model"

export const applicationController = new Elysia()
  .use(authPlugin)
  .use(applicationPlugin)
  .group("/app", (app) =>
    app
      .get(
        "/",
        ({ applicationService, user }) => {
          return applicationService.getAll(user?.id)
        },
        {
          auth: true,
        },
      )
      .post(
        "/create",
        ({ applicationService, body, user }) => {
          return applicationService.create(body, user!.id)
        },
        {
          auth: true,
          body: applicationCreationModel,
        },
      )
      .post(
        "/remove",
        ({ applicationService, body, user }) => {
          return applicationService.remove({ appId: body.appId })
        },
        {
          auth: true,
          body: applicationDeleteModel,
        },
      )
      .post(
        "/update",
        ({ applicationService, body, user }) => {
          return applicationService.update(body)
        },
        {
          auth: true,
          body: applicationUpdateModel,
        },
      ),
  )
  .group("/app/pages", (pages) =>
    pages
      .get(
        "/:appId",
        ({ applicationService, params }) => {
          if (!params.appId) {
            throw new Error("Application ID is required")
          }
          return applicationService.getAllPages(params.appId)
        },
        {
          auth: true,
          body: t.Object({
            appId: t.String(),
          }),
        },
      )
      .post(
        "/create",
        ({ applicationService, body }) => {
          return applicationService.createPage(body)
        },
        {
          auth: true,
          body: pageCreationModel,
        },
      )
      .post(
        "/remove",
        ({ applicationService, body }) => {
          return applicationService.removePage(body)
        },
        {
          auth: true,
          body: pageDeleteModel,
        },
      )
      .post(
        "/update",
        ({ applicationService, body }) => {
          return applicationService.updatePage(body)
        },
        {
          auth: true,
          body: pageUpdateModel,
        },
      ),
  )
  .group("/app/pages/component", (component) =>
    component
      .get(
        "/:pageId",
        ({ applicationService, params }) => {
          const { pageId } = params
          if (!pageId) {
            throw new Error("Page ID is required")
          }

          return applicationService.getPageComponents(pageId)
        },
        {
          auth: true,
          params: t.Object({
            pageId: t.String(),
          }),
        },
      )
      .post(
        "/page/component/create",
        ({ applicationService, body }) => {
          return applicationService.createPageComponent(body)
        },
        {
          auth: true,
          body: componentCreationModel,
        },
      )
      .post(
        "/page/component/update",
        ({ applicationService, body }) => {
          return applicationService.updatePageComponent(body)
        },
        {
          auth: true,
          body: componentUpdateModel,
        },
      )
      .post(
        "/page/component/remove",
        ({ applicationService, body }) => {
          return applicationService.removePageComponent(body)
        },
        {
          auth: true,
          body: componentRemoveModel,
        },
      )
      .post(
        "/page/component/move",
        ({ applicationService, body }) => {
          return applicationService.movePageComponent(body)
        },
        {
          auth: true,
          body: componentMoveModel,
        },
      ),
  )
