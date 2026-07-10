import React, {memo, useEffect, useState} from 'react';
import {View, type LayoutChangeEvent} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {styles, THUMB_SIZE} from './styles';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  /** Runs on the UI thread on every frame while dragging (must be a worklet). */
  onLiveChange?: (value: number) => void;
  /** Runs on the JS thread when the gesture ends. */
  onChangeEnd?: (value: number) => void;
  accessibilityLabel?: string;
}

const clamp = (value: number, lower: number, upper: number): number => {
  'worklet';
  return Math.min(Math.max(value, lower), upper);
};

/** Reanimated-driven slider that never blocks the JS thread while dragging. */
const SliderComponent = ({min, max, value, onLiveChange, onChangeEnd, accessibilityLabel}: SliderProps) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const progress = useSharedValue(max === min ? 0 : (value - min) / (max - min));
  const isDragging = useSharedValue(false);

  useEffect(() => {
    if (!isDragging.value) {
      progress.value = withTiming(max === min ? 0 : (value - min) / (max - min), {duration: 160});
    }
  }, [value, min, max, progress, isDragging]);

  const gesture = Gesture.Pan()
    .hitSlop({top: 12, bottom: 12, left: 8, right: 8})
    .onBegin(event => {
      isDragging.value = true;
      if (trackWidth > 0) {
        progress.value = clamp(event.x / trackWidth, 0, 1);
        if (onLiveChange) {
          onLiveChange(min + progress.value * (max - min));
        }
      }
    })
    .onUpdate(event => {
      if (trackWidth > 0) {
        progress.value = clamp(event.x / trackWidth, 0, 1);
        if (onLiveChange) {
          onLiveChange(min + progress.value * (max - min));
        }
      }
    })
    .onFinalize(() => {
      isDragging.value = false;
      const finalValue = Math.round(min + progress.value * (max - min));
      if (onChangeEnd) {
        runOnJS(onChangeEnd)(finalValue);
      }
    });

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: progress.value * Math.max(trackWidth - THUMB_SIZE, 0)},
      {scale: withTiming(isDragging.value ? 1.15 : 1, {duration: 120})},
    ],
  }));

  const onLayout = (event: LayoutChangeEvent) => setTrackWidth(event.nativeEvent.layout.width);

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={styles.container}
        onLayout={onLayout}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{min, max, now: value}}>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>
        <Animated.View style={[styles.thumb, thumbStyle]} pointerEvents="none" />
      </View>
    </GestureDetector>
  );
};

export const Slider = memo(SliderComponent);
