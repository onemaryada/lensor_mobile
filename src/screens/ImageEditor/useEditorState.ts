import {useCallback, useState} from 'react';
import {useSharedValue, type SharedValue} from 'react-native-reanimated';
import {DEFAULT_ADJUSTMENTS} from '@/constants/editor';
import type {AdjustmentKey, Adjustments, FilterPreset} from '@/types/editor';

export interface EditorState {
  /** UI-thread copy driving the Skia preview at 60fps. */
  adjustmentsSV: SharedValue<Adjustments>;
  /** JS-thread mirror used for labels, export, and memoized UI. */
  adjustments: Adjustments;
  selectedPresetId: string;
  isDirty: boolean;
  setAdjustment: (key: AdjustmentKey, value: number) => void;
  applyPreset: (preset: FilterPreset) => void;
  reset: () => void;
}

export const useEditorState = (): EditorState => {
  const adjustmentsSV = useSharedValue<Adjustments>({...DEFAULT_ADJUSTMENTS});
  const [adjustments, setAdjustments] = useState<Adjustments>({...DEFAULT_ADJUSTMENTS});
  const [selectedPresetId, setSelectedPresetId] = useState('original');

  const setAdjustment = useCallback(
    (key: AdjustmentKey, value: number) => {
      setAdjustments(previous => {
        const next = {...previous, [key]: value};
        adjustmentsSV.value = next;
        return next;
      });
    },
    [adjustmentsSV],
  );

  const applyPreset = useCallback(
    (preset: FilterPreset) => {
      const next: Adjustments = {...DEFAULT_ADJUSTMENTS, ...preset.adjustments};
      setSelectedPresetId(preset.id);
      setAdjustments(next);
      adjustmentsSV.value = next;
    },
    [adjustmentsSV],
  );

  const reset = useCallback(() => {
    setSelectedPresetId('original');
    setAdjustments({...DEFAULT_ADJUSTMENTS});
    adjustmentsSV.value = {...DEFAULT_ADJUSTMENTS};
  }, [adjustmentsSV]);

  const isDirty =
    selectedPresetId !== 'original' ||
    (Object.keys(DEFAULT_ADJUSTMENTS) as AdjustmentKey[]).some(
      key => adjustments[key] !== DEFAULT_ADJUSTMENTS[key],
    );

  return {adjustmentsSV, adjustments, selectedPresetId, isDirty, setAdjustment, applyPreset, reset};
};
