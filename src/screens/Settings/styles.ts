import {StyleSheet} from 'react-native';
import {colors, radius, shadows, spacing, typography} from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  screenTitle: {
    ...typography.h1,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  groupLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  group: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadows.soft,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 15,
    gap: spacing.md,
  },
  rowPressed: {
    backgroundColor: colors.background,
  },
  rowIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
  },
  rowLabel: {
    ...typography.subtitle,
    flex: 1,
  },
  rowValue: {
    ...typography.caption,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 38 + spacing.md,
  },
  footer: {
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  footerText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
});
