import {StyleSheet} from 'react-native';
import {colors, spacing, typography} from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    ...typography.display,
    fontSize: 48,
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  brandAccent: {
    color: colors.primary,
  },
  tagline: {
    ...typography.caption,
    marginTop: spacing.sm,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: colors.textTertiary,
  },
});
