import {StyleSheet} from 'react-native';
import {colors, spacing, typography} from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    height: 56,
    gap: spacing.sm,
  },
  title: {
    ...typography.h3,
    flex: 1,
  },
  darkTitle: {
    color: colors.editorText,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  darkIconButton: {
    backgroundColor: colors.editorSurface,
    borderColor: colors.editorBorder,
  },
  spacer: {
    width: 40,
  },
});
