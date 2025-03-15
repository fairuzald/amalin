import { ViewStyle } from 'react-native';
import { palette } from '../../../theme/colors';

/**
 * Checkbox size presets
 */
export type CheckboxSize = 'small' | 'medium' | 'large';

export const checkboxSizePresets: Record<CheckboxSize, ViewStyle> = {
  small: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  medium: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  large: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
};

/**
 * Checkbox variant presets
 */
export type CheckboxVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export const checkboxVariantPresets: Record<
  CheckboxVariant,
  { backgroundColor: string; borderColor: string }
> = {
  primary: {
    backgroundColor: palette.blue.primary,
    borderColor: palette.blue.primary,
  },
  secondary: {
    backgroundColor: palette.orange.primary,
    borderColor: palette.orange.primary,
  },
  success: {
    backgroundColor: palette.green.success,
    borderColor: palette.green.success,
  },
  warning: {
    backgroundColor: palette.yellow.warning,
    borderColor: palette.yellow.warning,
  },
  error: {
    backgroundColor: palette.red.error,
    borderColor: palette.red.error,
  },
};
