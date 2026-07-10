import React, {memo, useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Slider} from '@/components/Slider';
import {ADJUSTMENT_CONFIGS} from '@/constants/editor';
import {colors, radius, spacing, typography} from '@/theme';
import type {AdjustmentKey, Adjustments} from '@/types/editor';
import type {SharedValue} from 'react-native-reanimated';

interface AdjustPanelProps {
  adjustments: Adjustments;
  adjustmentsSV: SharedValue<Adjustments>;
  onChangeEnd: (key: AdjustmentKey, value: number) => void;
}

/** Horizontal tool chips + a slider for the active adjustment. */
const AdjustPanelComponent = ({adjustments, adjustmentsSV, onChangeEnd}: AdjustPanelProps) => {
  const [activeKey, setActiveKey] = useState<AdjustmentKey>('brightness');
  const activeConfig = useMemo(
    () => ADJUSTMENT_CONFIGS.find(config => config.key === activeKey)!,
    [activeKey],
  );

  return (
    <Animated.View entering={FadeInDown.duration(240)} style={styles.container}>
      <View style={styles.sliderRow}>
        <Text style={styles.valueLabel}>{activeConfig.label}</Text>
        <Text style={styles.value}>{adjustments[activeKey]}</Text>
      </View>
      <Slider
        min={activeConfig.min}
        max={activeConfig.max}
        value={adjustments[activeKey]}
        accessibilityLabel={`${activeConfig.label} slider`}
        onLiveChange={value => {
          'worklet';
          adjustmentsSV.value = {...adjustmentsSV.value, [activeKey]: value};
        }}
        onChangeEnd={value => onChangeEnd(activeKey, value)}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}>
        {ADJUSTMENT_CONFIGS.map(config => {
          const isActive = config.key === activeKey;
          const isEdited = adjustments[config.key] !== 0;
          return (
            <Pressable
              key={config.key}
              accessibilityRole="button"
              accessibilityLabel={config.label}
              accessibilityState={{selected: isActive}}
              onPress={() => setActiveKey(config.key)}
              style={[styles.chip, isActive && styles.chipActive]}>
              <Icon
                name={config.icon}
                size={20}
                color={isActive ? colors.white : colors.editorTextMuted}
              />
              <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
                {config.label}
              </Text>
              {isEdited ? <View style={styles.editedDot} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  sliderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueLabel: {
    ...typography.caption,
    color: colors.editorTextMuted,
  },
  value: {
    ...typography.subtitle,
    color: colors.editorText,
    fontVariant: ['tabular-nums'],
  },
  chips: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.button,
    backgroundColor: colors.editorSurface,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipLabel: {
    ...typography.caption,
    color: colors.editorTextMuted,
  },
  chipLabelActive: {
    color: colors.white,
  },
  editedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
});

export const AdjustPanel = memo(AdjustPanelComponent);
