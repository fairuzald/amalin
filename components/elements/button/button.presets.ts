import { TextStyle, ViewStyle } from 'react-native';
import { palette } from '../../../theme/colors';

/**
 * Button variant presets
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export const buttonVariantPresets: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: palette.blue.primary,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: palette.orange.primary,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.blue.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  danger: {
    backgroundColor: palette.red.error,
    borderWidth: 0,
  },
};

/**
 * Button text color presets based on variant
 */
export const buttonTextVariantPresets: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: palette.white,
  },
  secondary: {
    color: palette.white,
  },
  outline: {
    color: palette.blue.primary,
  },
  ghost: {
    color: palette.blue.primary,
  },
  danger: {
    color: palette.white,
  },
};

/**
 * Button size presets
 */
export type ButtonSize = 'small' | 'medium' | 'large';

export const buttonSizePresets: Record<ButtonSize, ViewStyle> = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 32,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 44,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
};

/**
 * Button text size presets based on button size
 */
export const buttonTextSizePresets: Record<ButtonSize, TextStyle> = {
  small: {
    fontSize: 12,
  },
  medium: {
    fontSize: 14,
  },
  large: {
    fontSize: 16,
  },
};

/**
 * Other button visual state presets
 */
export const buttonStatePresets = {
  disabled: {
    opacity: 0.6,
  },
  loading: {
    opacity: 0.8,
  },
};
