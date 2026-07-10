import {Skia} from '@shopify/react-native-skia';

/**
 * Unsharp-mask sharpening as an SkSL runtime effect. `strength` of 0 is a
 * no-op so the filter can stay mounted while inactive.
 */
export const SHARPEN_EFFECT = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform float strength;

half4 main(float2 xy) {
  half4 center = image.eval(xy);
  if (strength <= 0.001) {
    return center;
  }
  half4 blurred = (
    image.eval(xy + float2(-1.0, 0.0)) +
    image.eval(xy + float2(1.0, 0.0)) +
    image.eval(xy + float2(0.0, -1.0)) +
    image.eval(xy + float2(0.0, 1.0))
  ) * 0.25;
  half3 sharpened = center.rgb + (center.rgb - blurred.rgb) * strength;
  return half4(clamp(sharpened, 0.0, 1.0), center.a);
}
`)!;
