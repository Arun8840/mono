export const COLS = 240
export const ROW_HEIGHT = 10

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
