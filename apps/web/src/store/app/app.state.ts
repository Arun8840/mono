import { PageTypes } from "@/types/app.type"
import { componentType } from "@/types/global"

export const initialAppState = {
  page: {} as PageTypes,
  addComponent: (component: componentType) => {},
  updateComponent: (id: string, updates: Partial<componentType>) => {},
  removeComponent: (id: string) => {},
  setComponents: (components: componentType[]) => {},
  clearPage: () => {},
}
