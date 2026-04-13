import React from "react"
import DroppedComponentWrapper from "../component-wrapper"
import { ComponentWrapperProps } from "@/types/comp.wrapper.types"

export interface ImageComponentProps extends ComponentWrapperProps {}
const ImageComponent: React.FC<ImageComponentProps> = ({
  value,
  dimensions,
  isPreview,
}) => {
  const { properties } = value

  const currentImage = properties?.src
  return (
    <DroppedComponentWrapper
      value={value}
      dimensions={dimensions}
      isPreview={isPreview}
    >
      <div className="size-full">
        <img
          src={currentImage}
          alt={`Image_${value?.id}`}
          className="size-full object-contain"
          loading="lazy"
        />
      </div>
    </DroppedComponentWrapper>
  )
}

export default React.memo(ImageComponent)
