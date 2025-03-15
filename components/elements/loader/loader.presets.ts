import { palette } from '../../../themes/colors';

/**
 * Loader size presets
 */
export type LoaderSize = 'tiny' | 'small' | 'medium' | 'large';

export const loaderSizePresets: Record<LoaderSize, { size: number; containerSize: number }> = {
  tiny: {
    size: 16,
    containerSize: 20,
  },
  small: {
    size: 24,
    containerSize: 30,
  },
  medium: {
    size: 36,
    containerSize: 44,
  },
  large: {
    size: 48,
    containerSize: 56,
  },
};

/**
 * Loader color presets
 */
export type LoaderColorVariant = 'primary' | 'secondary' | 'white' | 'dark';

export const loaderColorPresets: Record<LoaderColorVariant, string> = {
  primary: palette.blue.primary,
  secondary: palette.orange.primary,
  white: palette.white,
  dark: palette.gray.darkest,
};
