import {StyleSheet} from 'react-native';
import {colors, radius, spacing, typography} from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.editorBackground,
  },
  canvasArea: {
    flex: 1,
  },
  hint: {
    ...typography.caption,
    color: colors.editorTextMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  panelArea: {
    minHeight: 148,
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.editorBorder,
    backgroundColor: colors.editorBackground,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.button,
    minWidth: 72,
  },
  actionButtonActive: {
    backgroundColor: colors.editorSurface,
  },
  actionLabel: {
    ...typography.caption,
    fontSize: 12,
    color: colors.editorTextMuted,
  },
  actionLabelActive: {
    color: colors.editorText,
  },
  saveLabel: {
    color: colors.accent,
  },
  centerFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  errorText: {
    ...typography.body,
    color: colors.editorTextMuted,
    textAlign: 'center',
  },
});
