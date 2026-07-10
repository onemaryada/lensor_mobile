import React, {memo, useMemo} from 'react';
import {Pressable, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {Canvas, ColorMatrix, Image as SkiaImage, type SkImage} from '@shopify/react-native-skia';
import {DEFAULT_ADJUSTMENTS} from '@/constants/editor';
import {usePressScale} from '@/hooks/usePressScale';
import {buildColorMatrix} from '@/utils/colorMatrix';
import type {FilterPreset} from '@/types/editor';
import {styles, THUMB_SIZE} from './styles';

interface FilterCardProps {
  preset: FilterPreset;
  thumbnail: SkImage | null;
  selected: boolean;
  onPress: (preset: FilterPreset) => void;
}

/** Tappable preset filter thumbnail with a live Skia preview. */
const FilterCardComponent = ({preset, thumbnail, selected, onPress}: FilterCardProps) => {
  const {animatedStyle, onPressIn, onPressOut} = usePressScale(0.92);

  const matrix = useMemo(
    () => buildColorMatrix({...DEFAULT_ADJUSTMENTS, ...preset.adjustments}),
    [preset],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${preset.name} filter`}
      accessibilityState={{selected}}
      onPress={() => onPress(preset)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.container}>
      <Animated.View style={[styles.thumbWrapper, selected && styles.selected, animatedStyle]}>
        {thumbnail ? (
          <Canvas style={styles.canvas}>
            <SkiaImage image={thumbnail} x={0} y={0} width={THUMB_SIZE} height={THUMB_SIZE} fit="cover">
              <ColorMatrix matrix={matrix} />
            </SkiaImage>
          </Canvas>
        ) : null}
      </Animated.View>
      <Text style={[styles.name, selected && styles.nameSelected]} numberOfLines={1}>
        {preset.name}
      </Text>
    </Pressable>
  );
};

export const FilterCard = memo(FilterCardComponent);
