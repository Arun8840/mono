import { PageTypes } from "@/types/app.type"
import { componentType } from "@/types/global"

export const initialAppState = {
  page: {} as PageTypes,
  selectedComponentId: null as string | null,
  addComponent: (component: componentType) => {},
  updateComponent: (id: string, updates: Partial<componentType>) => {},
  removeComponent: (id: string) => {},
  setComponents: (components: componentType[]) => {},
  clearPage: () => {},
  setSelectedComponent: (id: string | null) => {},
}
