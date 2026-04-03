import { CSSProperties } from "react"

export interface DragItems {
  accept?: string
  label?: string
  id?: string
  name?: string
  type?: string
  position?: { w: number; h: number }
  options?: { content?: string }
  style?: Record<string, string | number>
  assetId?: string
  componentType?: string
}

export interface PositionType {
  x: number
  y: number
  w: number
  h: number
}

export interface PropertiesTypes {
  content: string
  href?: string
  src?: string
  alt?: string
}
export interface componentType {
  pageId: string
  name: string
  type: string
  id?: string
  applicationId: string
  styles?: CSSProperties
  position: PositionType
  properties?: PropertiesTypes
}
