import React from "react"
import {
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from "@repo/ui/components"
import { useFormContext } from "react-hook-form"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Box,
  LayersIcon,
  ColorPickerIcon,
  RadiusIcon,
  LayoutIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { componentType, FillType } from "@/types/global"
import { fillDataType } from "./property-data"

// ─── Constants ───────────────────────────────────────────────────────────────

const NUMBER_INPUT_STYLE =
  "h-7 text-[10px] pl-5 pr-1 border-none bg-transparent focus-visible:bg-background focus-visible:ring-1"

const TEXT_INPUT_STYLE =
  "h-8 text-xs font-mono bg-muted/30 focus-visible:bg-background transition-colors rounded"

const SHADOW_VALUES: Record<string, string> = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
}

const GRADIENT_ANGLES = [0, 45, 90, 135]

const SPACING_FIELDS = [
  { key: "paddingTop", icon: ArrowUp01Icon },
  { key: "paddingBottom", icon: ArrowDown01Icon },
  { key: "paddingLeft", icon: ArrowLeft01Icon },
  { key: "paddingRight", icon: ArrowRight01Icon },
] as const

const MARGIN_FIELDS = [
  { key: "marginTop", icon: ArrowUp01Icon },
  { key: "marginBottom", icon: ArrowDown01Icon },
  { key: "marginLeft", icon: ArrowLeft01Icon },
  { key: "marginRight", icon: ArrowRight01Icon },
] as const

//* ─── Helpers ─────────────────────────────────────────────────────────────────

const buildGradient = (angle: number, start: string, end: string) =>
  `linear-gradient(${angle}deg, ${start}, ${end})`

const parseGradient = (val?: string) => {
  const defaults = { angle: 90, start: "#ffffff", end: "#eeeeee" }
  if (!val) return defaults
  const match = val.match(
    /linear-gradient\((\d+)deg,\s*(#[0-9a-fA-F]{6}),\s*(#[0-9a-fA-F]{6})\)/,
  )
  return match
    ? { angle: parseInt(match[1] || "0", 10), start: match[2], end: match[3] }
    : defaults
}

const isGradient = (val?: string) =>
  typeof val === "string" && val.startsWith("linear-gradient")

const stripPx = (val: string | number) =>
  typeof val === "string" && val.endsWith("px")
    ? parseInt(val, 10)
    : (val ?? "")

//* ─── Sub-components ───────────────────────────────────────────────────────────

interface ColorRowProps {
  value: string
  placeholder: string
  onChange: (val: string) => void
}

const ColorRow = ({ value, placeholder, onChange }: ColorRowProps) => {
  const safeHex =
    value.startsWith("#") && value.length === 7 ? value : "#ffffff"

  return (
    <div className="flex gap-2 items-center">
      <input
        type="color"
        className="size-7 rounded-md shrink-0 cursor-pointer"
        value={safeHex}
        onInput={(e) => onChange((e.target as HTMLInputElement).value)}
      />
      <Input
        className={TEXT_INPUT_STYLE}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </div>
  )
}

interface SpacingGridProps {
  label: string
  fields: typeof SPACING_FIELDS | typeof MARGIN_FIELDS
  getVal: (key: string) => string | number
  onChange: (key: string, val: number) => void
}

const SpacingGrid = ({ label, fields, getVal, onChange }: SpacingGridProps) => (
  <div className="space-y-2 px-1">
    <div className="flex items-center justify-between">
      <Label className="text-[10px] text-muted-foreground font-medium">
        {label}
      </Label>
      <HugeiconsIcon
        icon={label === "Padding (px)" ? Box : LayoutIcon}
        className="h-3 w-3 text-muted-foreground/30"
      />
    </div>
    <div className="grid grid-cols-4 gap-1.5 bg-muted/20 p-1 rounded-md border border-border/50">
      {fields.map(({ key, icon }) => (
        <div key={key} className="relative group">
          <HugeiconsIcon
            icon={icon}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 text-muted-foreground/40 pointer-events-none group-focus-within:text-primary transition-colors"
          />
          <Input
            type="number"
            className={NUMBER_INPUT_STYLE}
            placeholder="0"
            value={getVal(key)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(key, parseInt(e.target.value, 10))
            }
          />
        </div>
      ))}
    </div>
  </div>
)

//* ─── Main Component ───────────────────────────────────────────────────────────

const AppearanceProperties = () => {
  const { setValue, watch, getValues } = useFormContext()
  const component = getValues() as componentType
  const styles = watch("styles")

  const initialFillType: FillType = isGradient(styles?.background)
    ? "linear-gradient"
    : "solid"

  const [fillType, setFillType] = React.useState<FillType>(initialFillType)

  const initialGradient = parseGradient(styles?.background)
  const [gradient, setGradient] = React.useState(initialGradient)

  //* ── DOM + form sync ──────────────────────────────────────────────────────

  const applyToDOM = (
    componentId: string,
    styleObj: Record<string, string>,
  ) => {
    const el = document.getElementById(componentId)?.querySelector(".prose")
    if (el instanceof HTMLElement) {
      Object.entries(styleObj).forEach(([k, v]) => {
        if (v) (el.style as any)[k] = v
      })
    }
  }

  const commitStyles = (updated: Record<string, any>) => {
    setValue("styles", updated)
    applyToDOM(component.id, updated)
  }

  const handleStyleChange = (key: string, value: string | number) => {
    const cssValue = typeof value === "number" ? `${value}px` : value
    const updated = { ...styles, [key]: cssValue }
    commitStyles(updated)
    return updated
  }

  //* ── Gradient ─────────────────────────────────────────────────────────────

  const applyGradient = (
    angle = gradient.angle || 0,
    start = gradient.start || "#ffffff",
    end = gradient.end || "#eeeeee",
  ) => {
    const bg = buildGradient(angle, start, end)
    commitStyles({ ...styles, background: bg })
  }

  const updateGradient = (patch: Partial<typeof gradient>) => {
    const next = { ...gradient, ...patch }
    setGradient(next)
    applyGradient(next.angle, next.start, next.end)
  }

  //* ── Fill type switch ──────────────────────────────────────────────────────
  const handleFillTypeChange = (value: FillType) => {
    setFillType(value)
    if (value === "linear-gradient") {
      commitStyles({
        ...styles,
        gradient: true,
        background: buildGradient(
          gradient.angle,
          gradient?.start || "#ffffff",
          gradient?.end || "#eeeeee",
        ),
      })
    } else {
      const { background, ...rest } = styles || {}
      commitStyles({
        ...rest,
        gradient: false,
        background: styles?.background || "#000000",
      })
    }
  }

  //* ── Helpers ───────────────────────────────────────────────────────────────

  const getStyleValue = (key: string) => stripPx((styles as any)?.[key])

  return (
    <div
      key={component.id}
      className="space-y-6 pb-4 divide-y divide-dashed divide-primary/50"
    >
      {/* //*── Appearance ─────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <HugeiconsIcon
            icon={ColorPickerIcon}
            className="h-3 w-3 text-primary"
          />
          <h4 className="text-[11px] uppercase font-bold text-foreground tracking-wider">
            Appearance
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-3 px-1">
          {/* Fill type */}
          <div className="space-y-1.5">
            <Label className="text-[10px] text-muted-foreground">
              Fill Type
            </Label>
            <div className="flex items-center gap-2">
              {fillDataType?.map((type, i) => (
                <Button
                  key={`${type.label}-${i}`}
                  aria-pressed={fillType === type.type}
                  size="icon-sm"
                  variant={fillType === type.type ? "default" : "outline"}
                  onClick={() => handleFillTypeChange(type.type as FillType)}
                >
                  <HugeiconsIcon icon={type.icon} />
                </Button>
              ))}
            </div>
          </div>

          {/* Solid color */}
          {fillType === "solid" && (
            <div className="space-y-1.5">
              <Label className="text-[10px] text-muted-foreground flex items-center justify-between">
                Color
                <span className="text-[9px] font-mono opacity-50">Hex</span>
              </Label>
              <ColorRow
                value={styles?.background || ""}
                placeholder="#FFFFFF"
                onChange={(val) => handleStyleChange("background", val)}
              />
            </div>
          )}

          {/* Linear gradient */}
          {fillType === "linear-gradient" && (
            <div className="space-y-2">
              <div
                className="h-2 w-full rounded-md border border-border/40"
                style={{
                  background: buildGradient(
                    gradient.angle,
                    gradient.start || "#ffffff",
                    gradient.end || "#eeeeee",
                  ),
                }}
              />

              {(
                [
                  {
                    label: "Start Color",
                    field: "start",
                    placeholder: "#ffffff",
                  },
                  { label: "End Color", field: "end", placeholder: "#eeeeee" },
                ] as const
              ).map(({ label, field, placeholder }) => (
                <div key={field} className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center justify-between">
                    {label}
                    <span className="text-[9px] font-mono opacity-50">Hex</span>
                  </Label>
                  <ColorRow
                    value={gradient?.[field] || ""}
                    placeholder={placeholder}
                    onChange={(val) => updateGradient({ [field]: val })}
                  />
                </div>
              ))}

              {/* Angle */}
              <div className="space-y-1.5">
                <Label className="text-[10px] text-muted-foreground flex items-center justify-between">
                  Angle
                  <span className="text-[9px] font-mono opacity-50">deg</span>
                </Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    min={0}
                    max={360}
                    className={TEXT_INPUT_STYLE}
                    placeholder="90"
                    value={gradient.angle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateGradient({
                        angle: parseInt(e.target.value, 10) || 0,
                      })
                    }
                  />
                  <div className="flex gap-1">
                    {GRADIENT_ANGLES.map((deg) => (
                      <button
                        key={deg}
                        type="button"
                        title={`${deg}°`}
                        className={`h-8 w-8 rounded text-[9px] font-mono border transition-colors ${
                          gradient.angle === deg
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted/30 border-border/40 hover:bg-muted/60 text-muted-foreground"
                        }`}
                        onClick={() => updateGradient({ angle: deg })}
                      >
                        {deg}°
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Radius + Shadow */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                <HugeiconsIcon icon={RadiusIcon} className="h-2.5 w-2.5" />
                Radius
              </Label>
              <Input
                type="number"
                className={TEXT_INPUT_STYLE}
                placeholder="0px"
                value={getStyleValue("borderRadius")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleStyleChange(
                    "borderRadius",
                    parseInt(e.target.value, 10),
                  )
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                <HugeiconsIcon icon={LayersIcon} className="h-2.5 w-2.5" />
                Shadow
              </Label>
              <Select
                value={component.styles?.boxShadow || "none"}
                onValueChange={(val) =>
                  handleStyleChange(
                    "boxShadow",
                    SHADOW_VALUES[val as keyof typeof SHADOW_VALUES] || "none",
                  )
                }
              >
                <SelectTrigger className="h-8 w-full text-xs bg-muted/30 shadow-none focus:ring-1 rounded">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="sm">Soft</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Elevated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* //* ── Spacing ─────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <HugeiconsIcon icon={LayoutIcon} className="h-3 w-3 text-primary" />
          <h4 className="text-[11px] uppercase font-bold text-foreground tracking-wider">
            Spacing
          </h4>
        </div>

        <SpacingGrid
          label="Padding (px)"
          fields={SPACING_FIELDS}
          getVal={getStyleValue}
          onChange={handleStyleChange}
        />

        <SpacingGrid
          label="Margin (px)"
          fields={MARGIN_FIELDS}
          getVal={getStyleValue}
          onChange={handleStyleChange}
        />
      </div>
    </div>
  )
}

export default AppearanceProperties
