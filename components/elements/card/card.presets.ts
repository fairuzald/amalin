import { ViewStyle } from 'react-native';
import { palette } from '../../../themes/colors';
import { shadows } from '../../../themes/shadows';

/**
 * Card variant presets
 */
export type CardVariant = 'default' | 'outlined' | 'elevated';

export const cardVariantPresets: Record<CardVariant, ViewStyle> = {
  default: {
    backgroundColor: palette.white,
    borderRadius: 16,
    padding: 16,
  },
  outlined: {
    backgroundColor: palette.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.gray.light,
  },
  elevated: {
    backgroundColor: palette.white,
    borderRadius: 16,
    padding: 16,
    ...shadows.small,
  },
};

/**
 * Card size presets
 */
export type CardSize = 'small' | 'medium' | 'large';

export const cardSizePresets: Record<CardSize, ViewStyle> = {
  small: {
    padding: 12,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 24,
  },
};
