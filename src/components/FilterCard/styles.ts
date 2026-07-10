import {StyleSheet} from 'react-native';
import {colors, spacing, typography} from '@/theme';

export const THUMB_SIZE = 64;

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
    width: THUMB_SIZE + spacing.md,
  },
  thumbWrapper: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: colors.editorSurface,
  },
  selected: {
    borderColor: colors.accent,
  },
  canvas: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
  },
  name: {
    ...typography.caption,
    color: colors.editorTextMuted,
    fontSize: 12,
  },
  nameSelected: {
    color: colors.editorText,
    fontWeight: typography.weights.semiBold,
  },
});
