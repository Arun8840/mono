import React from "react"
import DroppedComponentWrapper from "../component-wrapper"
import { ComponentWrapperProps } from "@/types/comp.wrapper.types"

export interface HeadingProps extends ComponentWrapperProps {}
const Heading: React.FC<HeadingProps> = ({ value, dimensions }) => {
  return (
    <DroppedComponentWrapper
      value={value}
      dimensions={dimensions}
      toolbar={<>editor</>}
    >
      <h1>Heading</h1>
    </DroppedComponentWrapper>
  )
}

export default Heading
