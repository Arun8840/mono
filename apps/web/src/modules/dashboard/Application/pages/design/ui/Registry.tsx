import { Skeleton } from "@repo/ui/components"
import dynamic from "next/dynamic"

const skeletonClass = "w-20 h-20"
export const ComponentRegistry = {
  Heading: dynamic(() => import("./dropped-components/Heading"), {
    loading: () => <Skeleton className={skeletonClass} />,
  }),
  Button: dynamic(() => import("./dropped-components/Button"), {
    loading: () => <Skeleton className={skeletonClass} />,
  }),
}
