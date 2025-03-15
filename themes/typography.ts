import { Platform } from 'react-native';

export const fontFamily = {
  // Default system fonts
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  semiBold: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
};

export const fontSize = {
  xxs: 10,
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
};

/**
 * Font weights
 */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

/**
 * Line heights
 */
export const lineHeight = {
  xs: 16,
  s: 20,
  m: 24,
  l: 28,
  xl: 32,
  xxl: 38,
  xxxl: 46,
};

export default {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
};
