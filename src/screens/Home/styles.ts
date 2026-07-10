import {StyleSheet} from 'react-native';
import {colors, radius, shadows, spacing, typography} from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  greeting: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: colors.textTertiary,
  },
  brand: {
    ...typography.display,
    marginTop: spacing.xs,
  },
  brandAccent: {
    color: colors.primary,
  },
  heroCard: {
    marginTop: spacing.xl,
    borderRadius: radius.card * 1.4,
    overflow: 'hidden',
    ...shadows.medium,
  },
  heroGradient: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  heroIconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    ...typography.h2,
    color: colors.white,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  selectButton: {
    alignSelf: 'stretch',
  },
  featuresRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  featureCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.soft,
  },
  featureLabel: {
    ...typography.caption,
    textAlign: 'center',
  },
});
