export const COLS = 12;
export const ROW_HEIGHT = 4;

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
