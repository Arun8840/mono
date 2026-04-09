import { CSSProperties } from "react"
export interface PositionType {
  x: number
  y: number
  w: number
  h: number
}

export interface PropertiesTypes {
  content: string
  href: string
  src: string
  alt: string
}

export type FillType = "solid" | "linear-gradient" | "image"
export interface ThemePropertyTypes extends CSSProperties {
  gradient: boolean
  backgroundType: FillType
  gradientColors?: string[]
  gradientDirection?: string
  backgroundImage?: string
}
export interface componentType {
  pageId: string
  name: string
  type: string
  id: string
  applicationId: string
  styles?: Partial<ThemePropertyTypes>
  position: PositionType
  properties?: Partial<PropertiesTypes>
}

export interface DragItemTypes extends componentType {
  id: string
  componentType: string
  accept: string
}

export interface MoveComponentRequest {
  applicationId: string
  pageId: string
  componentId: string
  position: PositionType
}
