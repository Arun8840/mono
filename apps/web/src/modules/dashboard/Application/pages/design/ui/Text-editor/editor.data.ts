import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "@hugeicons/core-free-icons"

export const headings = [
  { level: 1, icon: Heading1 },
  { level: 2, icon: Heading2 },
  { level: 3, icon: Heading3 },
  { level: 4, icon: Heading4 },
  { level: 5, icon: Heading5 },
  { level: 6, icon: Heading6 },
]
export const colors = [
  { name: "Default", value: "inherit" },
  { name: "Primary", value: "var(--primary)" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#22c55e" },
  { name: "Orange", value: "#f97316" },
  { name: "Purple", value: "#a855f7" },
]
export const fontWeightOptions = [
  { label: "Thin", value: "100" },
  { label: "Extra Light", value: "200" },
  { label: "Light", value: "300" },
  { label: "Normal", value: "400" },
  { label: "Medium", value: "500" },
  { label: "Semi Bold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "Extra Bold", value: "800" },
  { label: "Black", value: "900" },
]

export const lineHeightOptions = [
  { label: "Default", value: null },
  { label: "Single (1)", value: "1" },
  { label: "Snug (1.25)", value: "1.25" },
  { label: "Normal (1.5)", value: "1.5" },
  { label: "Relaxed (1.75)", value: "1.75" },
  { label: "Double (2)", value: "2" },
] as const

export const textAligner = [
  { label: "Left", value: "left", icon: AlignLeft },
  { label: "Center", value: "center", icon: AlignCenter },
  { label: "Right", value: "right", icon: AlignRight },
  { label: "Justify", value: "justify", icon: AlignJustify },
]
