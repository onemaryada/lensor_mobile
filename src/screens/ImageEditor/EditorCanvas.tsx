import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import {
  Blur,
  Canvas,
  ColorMatrix,
  Group,
  Image as SkiaImage,
  RadialGradient,
  Rect,
  RuntimeShader,
  vec,
  type SkImage,
} from '@shopify/react-native-skia';
import {buildColorMatrix, sharpenStrength} from '@/utils/colorMatrix';
import type {Adjustments} from '@/types/editor';
import {blurSigma} from './exportImage';
import {SHARPEN_EFFECT} from './sharpenShader';

interface EditorCanvasProps {
  image: SkImage;
  adjustmentsSV: SharedValue<Adjustments>;
  canvasWidth: number;
  canvasHeight: number;
}

const SPRING = {damping: 20, stiffness: 200};
const MIN_SCALE = 0.5;
const MAX_SCALE = 6;

const clampWorklet = (value: number, lower: number, upper: number): number => {
  'worklet';
  return Math.min(Math.max(value, lower), upper);
};

/**
 * Skia-rendered preview. Adjustments stream in as a Reanimated shared value,
 * so slider drags never touch the JS thread and stay at 60fps. The wrapping
 * view supports pinch-to-zoom, drag, rotate, and double-tap to reset.
 */
const EditorCanvasComponent = ({image, adjustmentsSV, canvasWidth, canvasHeight}: EditorCanvasProps) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslate = useSharedValue({x: 0, y: 0});

  const pinch = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate(event => {
      scale.value = clampWorklet(savedScale.value * event.scale, MIN_SCALE, MAX_SCALE);
    });

  const rotate = Gesture.Rotation()
    .onStart(() => {
      savedRotation.value = rotation.value;
    })
    .onUpdate(event => {
      rotation.value = savedRotation.value + event.rotation;
    });

  const pan = Gesture.Pan()
    .minPointers(1)
    .maxPointers(2)
    .onStart(() => {
      savedTranslate.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(event => {
      translateX.value = savedTranslate.value.x + event.translationX;
      translateY.value = savedTranslate.value.y + event.translationY;
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withSpring(1, SPRING);
      rotation.value = withSpring(0, SPRING);
      translateX.value = withSpring(0, SPRING);
      translateY.value = withSpring(0, SPRING);
    });

  const composed = Gesture.Exclusive(
    Gesture.Simultaneous(pinch, rotate, pan),
    doubleTap,
  );

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
      {rotate: `${rotation.value}rad`},
    ],
  }));

  const matrix = useDerivedValue(() => buildColorMatrix(adjustmentsSV.value));
  const blur = useDerivedValue(() => blurSigma(adjustmentsSV.value.blur, canvasWidth));
  const sharpenUniforms = useDerivedValue(() => ({
    strength: sharpenStrength(adjustmentsSV.value.sharpen),
  }));
  const vignetteOpacity = useDerivedValue(() => (adjustmentsSV.value.vignette / 100) * 0.85);

  const canvasStyle = useMemo(
    () => [styles.canvas, {width: canvasWidth, height: canvasHeight}],
    [canvasWidth, canvasHeight],
  );

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composed}>
        <Animated.View style={transformStyle} accessible accessibilityLabel="Image preview. Pinch to zoom, drag to move, twist to rotate, double tap to reset.">
          <Canvas style={canvasStyle}>
            <SkiaImage
              image={image}
              x={0}
              y={0}
              width={canvasWidth}
              height={canvasHeight}
              fit="contain">
              <RuntimeShader source={SHARPEN_EFFECT} uniforms={sharpenUniforms} />
              <Blur blur={blur} mode="clamp" />
              <ColorMatrix matrix={matrix} />
            </SkiaImage>
            <Group opacity={vignetteOpacity}>
              <Rect x={0} y={0} width={canvasWidth} height={canvasHeight}>
                <RadialGradient
                  c={vec(canvasWidth / 2, canvasHeight / 2)}
                  r={Math.hypot(canvasWidth, canvasHeight) / 2}
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                  positions={[0.45, 1]}
                />
              </Rect>
            </Group>
          </Canvas>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  canvas: {
    backgroundColor: 'transparent',
  },
});

export const EditorCanvas = memo(EditorCanvasComponent);
