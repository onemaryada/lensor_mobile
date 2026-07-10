import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import type {SkImage} from '@shopify/react-native-skia';
import {FilterCard} from '@/components/FilterCard';
import {FILTER_PRESETS} from '@/constants/editor';
import {spacing} from '@/theme';
import type {FilterPreset} from '@/types/editor';

interface FilterPanelProps {
  thumbnail: SkImage | null;
  selectedPresetId: string;
  onSelect: (preset: FilterPreset) => void;
}

/** Horizontal strip of tappable preset filter previews. */
const FilterPanelComponent = ({thumbnail, selectedPresetId, onSelect}: FilterPanelProps) => {
  const renderItem = useCallback(
    ({item}: {item: FilterPreset}) => (
      <FilterCard
        preset={item}
        thumbnail={thumbnail}
        selected={item.id === selectedPresetId}
        onPress={onSelect}
      />
    ),
    [thumbnail, selectedPresetId, onSelect],
  );

  return (
    <Animated.View entering={FadeInDown.duration(240)}>
      <FlatList
        data={FILTER_PRESETS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        initialNumToRender={6}
        windowSize={5}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
});

export const FilterPanel = memo(FilterPanelComponent);
