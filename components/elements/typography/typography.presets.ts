import { TextStyle } from 'react-native';
import { palette } from '../../../theme/colors';

/**
 * Typography variant presets
 */
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'button';

export const typographyVariantPresets: Record<TypographyVariant, TextStyle> = {
  h1: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 46,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 38,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 32,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
  },
  h5: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
};

/**
 * Typography color presets
 */
export type TypographyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'subtle'
  | 'muted'
  | 'error'
  | 'success'
  | 'warning'
  | 'white';

export const typographyColorPresets: Record<TypographyColor, TextStyle> = {
  default: {
    color: palette.gray.darkest,
  },
  primary: {
    color: palette.blue.primary,
  },
  secondary: {
    color: palette.orange.primary,
  },
  subtle: {
    color: palette.gray.dark,
  },
  muted: {
    color: palette.gray.medium,
  },
  error: {
    color: palette.red.error,
  },
  success: {
    color: palette.green.success,
  },
  warning: {
    color: palette.yellow.warning,
  },
  white: {
    color: palette.white,
  },
};
