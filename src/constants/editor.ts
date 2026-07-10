import type {AdjustmentConfig, Adjustments, FilterPreset} from '@/types/editor';

export const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  sharpen: 0,
  warmth: 0,
  exposure: 0,
  vignette: 0,
  grayscale: 0,
};

export const ADJUSTMENT_CONFIGS: AdjustmentConfig[] = [
  {key: 'brightness', label: 'Brightness', icon: 'brightness-6', min: -100, max: 100},
  {key: 'contrast', label: 'Contrast', icon: 'contrast-circle', min: -100, max: 100},
  {key: 'saturation', label: 'Saturation', icon: 'palette', min: -100, max: 100},
  {key: 'blur', label: 'Blur', icon: 'blur', min: 0, max: 100},
  {key: 'sharpen', label: 'Sharpen', icon: 'details', min: 0, max: 100},
  {key: 'warmth', label: 'Warmth', icon: 'thermometer', min: -100, max: 100},
  {key: 'exposure', label: 'Exposure', icon: 'white-balance-sunny', min: -100, max: 100},
  {key: 'vignette', label: 'Vignette', icon: 'circle-slice-8', min: 0, max: 100},
  {key: 'grayscale', label: 'Grayscale', icon: 'invert-colors', min: 0, max: 100},
];

export const FILTER_PRESETS: FilterPreset[] = [
  {id: 'original', name: 'Original', adjustments: {}},
  {
    id: 'vintage',
    name: 'Vintage',
    adjustments: {warmth: 35, saturation: -25, contrast: -8, vignette: 35},
  },
  {id: 'cool', name: 'Cool', adjustments: {warmth: -45, saturation: 8, brightness: 4}},
  {id: 'warm', name: 'Warm', adjustments: {warmth: 45, brightness: 6, saturation: 6}},
  {id: 'mono', name: 'Mono', adjustments: {grayscale: 100, contrast: 8}},
  {id: 'noir', name: 'Noir', adjustments: {grayscale: 100, contrast: 40, vignette: 45}},
  {
    id: 'retro',
    name: 'Retro',
    adjustments: {warmth: 25, contrast: 18, saturation: -18, vignette: 20},
  },
  {id: 'fade', name: 'Fade', adjustments: {contrast: -28, brightness: 12, saturation: -20}},
  {id: 'dream', name: 'Dream', adjustments: {blur: 10, brightness: 8, saturation: 12}},
  {id: 'bright', name: 'Bright', adjustments: {brightness: 18, exposure: 16, saturation: 10}},
  {
    id: 'hdr',
    name: 'HDR',
    adjustments: {contrast: 32, saturation: 26, sharpen: 45, exposure: 6},
  },
];

export const MAX_EXPORT_DIMENSION = 4096;
export const EXPORT_JPEG_QUALITY = 95;
