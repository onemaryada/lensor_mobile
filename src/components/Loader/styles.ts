import {StyleSheet} from 'react-native';
import {colors, radius, shadows, spacing, typography} from '@/theme';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.medium,
  },
  label: {
    ...typography.subtitle,
  },
  inline: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
