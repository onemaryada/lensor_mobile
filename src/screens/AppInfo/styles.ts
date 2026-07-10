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
    gap: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadows.medium,
  },
  logoGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  appName: {
    ...typography.h1,
  },
  appTagline: {
    ...typography.caption,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    ...shadows.soft,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  rowLabel: {
    ...typography.subtitle,
  },
  rowValue: {
    ...typography.body,
    lineHeight: 20,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  librariesTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.card,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
});
