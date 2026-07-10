export interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sharpen: number;
  warmth: number;
  exposure: number;
  vignette: number;
  grayscale: number;
}

export type AdjustmentKey = keyof Adjustments;

export interface AdjustmentConfig {
  key: AdjustmentKey;
  label: string;
  icon: string;
  min: number;
  max: number;
}

export interface FilterPreset {
  id: string;
  name: string;
  adjustments: Partial<Adjustments>;
  /** Optional 4x5 color matrix tint applied on top of adjustments. */
  tint?: number[];
}

export interface PickedImage {
  uri: string;
  width: number;
  height: number;
  fileName?: string;
}
