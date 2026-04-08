import { componentType } from "./global"

export interface ComponentWrapperProps {
  value: componentType
  className?: string
  isPreview?: boolean
  dimensions: { colWidth: number; rowHeight: number }
}
