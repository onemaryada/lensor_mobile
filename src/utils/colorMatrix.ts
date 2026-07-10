import type {Adjustments} from '@/types/editor';

/**
 * Skia color matrices are row-major 4x5 (RGBA in, RGBA out) with the
 * translation column expressed in the 0..1 color range.
 */
export type ColorMatrix = number[];

export const IDENTITY_MATRIX: ColorMatrix = [
  1, 0, 0, 0, 0,
  0, 1, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 1, 0,
];

/** Concatenate two 4x5 color matrices (applies `a` after `b`). */
export const concatColorMatrices = (a: ColorMatrix, b: ColorMatrix): ColorMatrix => {
  'worklet';
  const result = new Array<number>(20).fill(0);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) {
        sum += a[row * 5 + k] * b[k * 5 + col];
      }
      if (col === 4) {
        sum += a[row * 5 + 4];
      }
      result[row * 5 + col] = sum;
    }
  }
  return result;
};

const LUMA_R = 0.2126;
const LUMA_G = 0.7152;
const LUMA_B = 0.0722;

const saturationMatrix = (sat: number): ColorMatrix => {
  'worklet';
  const inv = 1 - sat;
  const r = inv * LUMA_R;
  const g = inv * LUMA_G;
  const b = inv * LUMA_B;
  return [
    r + sat, g, b, 0, 0,
    r, g + sat, b, 0, 0,
    r, g, b + sat, 0, 0,
    0, 0, 0, 1, 0,
  ];
};

/**
 * Builds a single combined 4x5 color matrix from adjustment values.
 * All adjustment inputs are in slider space (-100..100 or 0..100).
 */
export const buildColorMatrix = (adjustments: Adjustments): ColorMatrix => {
  'worklet';
  const brightness = (adjustments.brightness / 100) * 0.35;
  const contrastAmount = (adjustments.contrast / 100) * 0.6;
  const exposureScale = Math.pow(2, (adjustments.exposure / 100) * 1.2);
  const warmth = (adjustments.warmth / 100) * 0.18;
  const grayscale = adjustments.grayscale / 100;
  const saturation = Math.max(0, 1 + adjustments.saturation / 100) * (1 - grayscale);

  const contrastScale = 1 + contrastAmount;
  const contrastOffset = 0.5 * (1 - contrastScale);

  let matrix: ColorMatrix = saturationMatrix(saturation);

  const toneMatrix: ColorMatrix = [
    contrastScale * exposureScale, 0, 0, 0, contrastOffset + brightness + warmth,
    0, contrastScale * exposureScale, 0, 0, contrastOffset + brightness,
    0, 0, contrastScale * exposureScale, 0, contrastOffset + brightness - warmth,
    0, 0, 0, 1, 0,
  ];

  matrix = concatColorMatrices(toneMatrix, matrix);
  return matrix;
};

/** Maps blur slider (0..100) to a Skia blur sigma for a given render width. */
export const blurSigmaForWidth = (blur: number, renderWidth: number, baseWidth: number): number => {
  'worklet';
  const baseSigma = (blur / 100) * 10;
  if (baseSigma === 0 || baseWidth === 0) {
    return 0;
  }
  return baseSigma * (renderWidth / baseWidth);
};

/** Maps sharpen slider (0..100) to the runtime-shader strength uniform. */
export const sharpenStrength = (sharpen: number): number => {
  'worklet';
  return (sharpen / 100) * 1.6;
};
