import { TextStyle, ViewStyle } from 'react-native';
import { palette } from '../../../themes/colors';

/**
 * Avatar size presets
 */
export type AvatarSize = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';

export const avatarSizePresets: Record<AvatarSize, ViewStyle> = {
  tiny: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  small: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  medium: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  large: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  xlarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
};

/**
 * Avatar text size presets based on avatar size
 */
export const avatarTextSizePresets: Record<AvatarSize, TextStyle> = {
  tiny: {
    fontSize: 10,
  },
  small: {
    fontSize: 12,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 24,
  },
  xlarge: {
    fontSize: 32,
  },
};

/**
 * Avatar background color presets
 */
export type AvatarColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gray';

export const avatarColorPresets: Record<AvatarColorVariant, ViewStyle> = {
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
  gray: {
    backgroundColor: palette.gray.medium,
  },
};
