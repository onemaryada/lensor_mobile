import {Skia, TileMode, ImageFormat, type SkImage, type SkImageFilter} from '@shopify/react-native-skia';
import {EXPORT_JPEG_QUALITY, MAX_EXPORT_DIMENSION} from '@/constants/editor';
import {buildColorMatrix, sharpenStrength} from '@/utils/colorMatrix';
import type {Adjustments} from '@/types/editor';
import {SHARPEN_EFFECT} from './sharpenShader';

/** Blur slider (0..100) mapped to a sigma proportional to the render width. */
export const blurSigma = (blur: number, width: number): number => {
  'worklet';
  return (blur / 100) * width * 0.02;
};

/**
 * Re-renders the original full-resolution image through the same filter
 * pipeline as the on-screen preview and returns a base64-encoded JPEG.
 */
export const renderExportBase64 = (image: SkImage, adjustments: Adjustments): string => {
  const sourceWidth = image.width();
  const sourceHeight = image.height();
  const downscale = Math.min(1, MAX_EXPORT_DIMENSION / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * downscale));
  const height = Math.max(1, Math.round(sourceHeight * downscale));

  const surface = Skia.Surface.MakeOffscreen(width, height);
  if (!surface) {
    throw new Error('Could not allocate an export surface');
  }
  const canvas = surface.getCanvas();

  const paint = Skia.Paint();
  paint.setColorFilter(Skia.ColorFilter.MakeMatrix(buildColorMatrix(adjustments)));

  let imageFilter: SkImageFilter | null = null;
  const sigma = blurSigma(adjustments.blur, width);
  if (sigma > 0) {
    imageFilter = Skia.ImageFilter.MakeBlur(sigma, sigma, TileMode.Clamp, null);
  }
  const strength = sharpenStrength(adjustments.sharpen);
  if (strength > 0 && SHARPEN_EFFECT) {
    const builder = Skia.RuntimeShaderBuilder(SHARPEN_EFFECT);
    builder.setUniform('strength', [strength]);
    const sharpenFilter = Skia.ImageFilter.MakeRuntimeShader(builder, null, null);
    imageFilter = imageFilter
      ? Skia.ImageFilter.MakeCompose(sharpenFilter, imageFilter)
      : sharpenFilter;
  }
  if (imageFilter) {
    paint.setImageFilter(imageFilter);
  }

  canvas.drawImageRect(
    image,
    {x: 0, y: 0, width: sourceWidth, height: sourceHeight},
    {x: 0, y: 0, width, height},
    paint,
  );

  const vignette = adjustments.vignette / 100;
  if (vignette > 0) {
    const vignettePaint = Skia.Paint();
    vignettePaint.setShader(
      Skia.Shader.MakeRadialGradient(
        {x: width / 2, y: height / 2},
        Math.hypot(width, height) / 2,
        [Skia.Color('rgba(0,0,0,0)'), Skia.Color(`rgba(0,0,0,${(0.85 * vignette).toFixed(3)})`)],
        [0.45, 1],
        TileMode.Clamp,
      ),
    );
    canvas.drawRect({x: 0, y: 0, width, height}, vignettePaint);
  }

  const snapshot = surface.makeImageSnapshot();
  const base64 = snapshot.encodeToBase64(ImageFormat.JPEG, EXPORT_JPEG_QUALITY);
  if (!base64) {
    throw new Error('Failed to encode the exported image');
  }
  return base64;
};

/** Builds a small square center-cropped thumbnail used by filter previews. */
export const makeThumbnail = (image: SkImage, size = 128): SkImage | null => {
  const surface = Skia.Surface.MakeOffscreen(size, size);
  if (!surface) {
    return null;
  }
  const canvas = surface.getCanvas();
  const side = Math.min(image.width(), image.height());
  const srcX = (image.width() - side) / 2;
  const srcY = (image.height() - side) / 2;
  canvas.drawImageRect(
    image,
    {x: srcX, y: srcY, width: side, height: side},
    {x: 0, y: 0, width: size, height: size},
    Skia.Paint(),
  );
  return surface.makeImageSnapshot();
};
