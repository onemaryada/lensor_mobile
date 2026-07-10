import {ViewStyle} from 'react-native';

export const shadows = {
  soft: {
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  } satisfies ViewStyle,
  medium: {
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  } satisfies ViewStyle,
  primaryGlow: {
    shadowColor: '#4F46E5',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  } satisfies ViewStyle,
} as const;
