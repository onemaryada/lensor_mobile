import {useCallback} from 'react';
import {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

const SPRING_CONFIG = {damping: 18, stiffness: 320, mass: 0.6};

/** Shared press-scale micro interaction used by buttons and cards. */
export const usePressScale = (pressedScale = 0.96) => {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: 1 + pressed.value * (pressedScale - 1)}],
  }));

  const onPressIn = useCallback(() => {
    pressed.value = withSpring(1, SPRING_CONFIG);
  }, [pressed]);

  const onPressOut = useCallback(() => {
    pressed.value = withSpring(0, SPRING_CONFIG);
  }, [pressed]);

  return {animatedStyle, onPressIn, onPressOut};
};
