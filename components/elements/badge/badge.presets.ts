import { TextStyle, ViewStyle } from 'react-native';
import { palette } from '../../../theme/colors';

/**
 * Badge variant presets
 */
export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline';

export const badgeVariantPresets: Record<BadgeVariant, ViewStyle> = {
  primary: {
    backgroundColor: palette.blue.primary,
  },
  secondary: {
    backgroundColor: palette.orange.primary,
  },
  success: {
    backgroundColor: palette.green.success,
  },
  warning: {
    backgroundColor: palette.yellow.warning,
  },
  error: {
    backgroundColor: palette.red.error,
  },
  info: {
    backgroundColor: palette.blue.accent,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.gray.medium,
  },
};

/**
 * Badge text color presets based on variant
 */
export const badgeTextVariantPresets: Record<BadgeVariant, TextStyle> = {
  primary: {
    color: palette.white,
  },
  secondary: {
    color: palette.white,
  },
  success: {
    color: palette.white,
  },
  warning: {
    color: palette.white,
  },
  error: {
    color: palette.white,
  },
  info: {
    color: palette.white,
  },
  outline: {
    color: palette.gray.dark,
  },
};

/**
 * Badge size presets
 */
export type BadgeSize = 'small' | 'medium' | 'large';

export const badgeSizePresets: Record<BadgeSize, ViewStyle> = {
  small: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  medium: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  large: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
};

/**
 * Badge text size presets based on badge size
 */
export const badgeTextSizePresets: Record<BadgeSize, TextStyle> = {
  small: {
    fontSize: 10,
  },
  medium: {
    fontSize: 12,
  },
  large: {
    fontSize: 14,
  },
};
