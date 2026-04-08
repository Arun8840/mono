import { cn } from "@repo/ui/lib/utils"
import React from "react"

interface ResizeHandleProps {
  direction:
    | "bottomRight"
    | "bottomLeft"
    | "topLeft"
    | "topRight"
    | "top"
    | "bottom"
    | "left"
    | "right"
  className?: string
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  direction,
  className,
}) => {
  // Directional cursor mapping
  const cursor =
    direction === "bottomRight"
      ? "nwse-resize"
      : direction === "bottomLeft"
        ? "nesw-resize"
        : direction === "topLeft"
          ? "nwse-resize"
          : direction === "topRight"
            ? "nesw-resize"
            : "pointer"

  // Directional position mapping (for absolute placement, if needed)
  const positionMap: Record<string, string> = {
    top: "top-0.5 left-1/2 -translate-x-1/2",
    bottom: "bottom-0.5 left-1/2 -translate-x-1/2",
    left: "left-0.5 top-1/2 -translate-y-1/2",
    right: "right-0.5 top-1/2 -translate-y-1/2",
    bottomRight: "bottom-1.5 right-1.5",
    bottomLeft: "bottom-1.5 left-1.5",
    topLeft: "top-1.5 left-1.5",
    topRight: "top-1.5 right-1.5",
  }
  return (
    <div
      data-direction={direction}
      className={cn(
        "size-2 z-50 absolute group/resize flex items-center justify-center",
        positionMap[direction],
        className,
      )}
      style={{ cursor }}
    >
      <div className="size-1 rounded-full bg-primary group-hover/resize:bg-primary group-hover/resize:scale-125  shadow-sm" />
    </div>
  )
}

export default ResizeHandle
