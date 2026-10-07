import {
  ClipboardCheck,
  Heading,
  Image,
  ParagraphBulletsPoint01FreeIcons,
} from "@hugeicons/core-free-icons"
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
  Paragraph: dynamic(() => import("./dropped-components/Paragraph"), {
    loading: () => <Skeleton className={skeletonClass} />,
  }),
  Image: dynamic(() => import("./dropped-components/Comp-Image"), {
    loading: () => <Skeleton className={skeletonClass} />,
  }),
}

export const ComponentRegistryIcons = {
  Heading: Heading,
  Button: ClipboardCheck,
  Paragraph: ParagraphBulletsPoint01FreeIcons,
  Image: Image,
}
