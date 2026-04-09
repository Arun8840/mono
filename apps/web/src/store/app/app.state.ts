import { PageTypes } from "@/types/app.type"
import { componentType } from "@/types/global"

export const initialAppState = {
  page: {} as PageTypes,
  selectedComponent: null as componentType | null,
}
