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
    gap: spacing.md,
  },
  updatedAt: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadows.soft,
  },
  sectionTitle: {
    ...typography.h3,
  },
  sectionBody: {
    ...typography.body,
  },
});
