import { TextStyle, ViewStyle } from 'react-native';
import { palette } from '../../../themes/colors';

/**
 * Input variant presets
 */
export type InputVariant = 'outlined' | 'filled' | 'underlined';

export const inputContainerVariantPresets: Record<InputVariant, ViewStyle> = {
  outlined: {
    borderWidth: 1,
    borderColor: palette.gray.light,
    borderRadius: 12,
    backgroundColor: palette.white,
  },
  filled: {
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: palette.gray.lightest,
  },
  underlined: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: palette.gray.light,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
};

/**
 * Input size presets
 */
export type InputSize = 'small' | 'medium' | 'large';

export const inputSizePresets: Record<InputSize, ViewStyle> = {
  small: {
    minHeight: 36,
  },
  medium: {
    minHeight: 48,
  },
  large: {
    minHeight: 56,
  },
};

/**
 * Input text size presets
 */
export const inputTextSizePresets: Record<InputSize, TextStyle> = {
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },
};

/**
 * Input state presets
 */
export const inputStatePresets = {
  focused: {
    borderColor: palette.blue.primary,
  },
  error: {
    borderColor: palette.red.error,
  },
  disabled: {
    opacity: 0.6,
  },
};
