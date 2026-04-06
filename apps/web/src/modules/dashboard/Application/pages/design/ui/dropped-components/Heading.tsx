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
      <div className="flex gap-2 flex-col">
        <small className="text-primary">x:{value?.position?.x}</small>
        <small className="text-yellow-300">y:{value?.position?.y}</small>
        <small className="text-green-300">w:{value?.position?.w}</small>
        <small className="text-red-300">h:{value?.position?.h}</small>
        <small className="text-blue-300">id:{value?.id}</small>
      </div>
    </DroppedComponentWrapper>
  )
}

export default Heading
