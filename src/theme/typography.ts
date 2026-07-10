import {TextStyle} from 'react-native';
import {colors} from './colors';

const fontWeights = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semiBold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extraBold: '800' as TextStyle['fontWeight'],
};

export const typography = {
  weights: fontWeights,
  display: {
    fontSize: 40,
    fontWeight: fontWeights.extraBold,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  } satisfies TextStyle,
  h1: {
    fontSize: 28,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    letterSpacing: 0.2,
  } satisfies TextStyle,
  h2: {
    fontSize: 22,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  } satisfies TextStyle,
  h3: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.textPrimary,
  } satisfies TextStyle,
  subtitle: {
    fontSize: 16,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
  } satisfies TextStyle,
  body: {
    fontSize: 15,
    fontWeight: fontWeights.regular,
    color: colors.textSecondary,
    lineHeight: 23,
  } satisfies TextStyle,
  caption: {
    fontSize: 13,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary,
  } satisfies TextStyle,
  button: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.white,
    letterSpacing: 0.3,
  } satisfies TextStyle,
} as const;
