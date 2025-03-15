import { TextStyle, ViewStyle } from 'react-native';
import { palette } from '../../../theme/colors';
import { shadows } from '../../../theme/shadows';

/**
 * Dialog size presets
 */
export type DialogSize = 'small' | 'medium' | 'large' | 'fullScreen';

export const dialogSizePresets: Record<DialogSize, ViewStyle> = {
  small: {
    width: '80%',
    maxWidth: 320,
  },
  medium: {
    width: '85%',
    maxWidth: 420,
  },
  large: {
    width: '90%',
    maxWidth: 520,
  },
  fullScreen: {
    width: '100%',
    height: '100%',
    margin: 0,
    borderRadius: 0,
  },
};

/**
 * Dialog variant presets
 */
export type DialogVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export const dialogVariantPresets: Record<
  DialogVariant,
  {
    header: ViewStyle;
    title: TextStyle;
    closeButton: ViewStyle;
    closeText: TextStyle;
  }
> = {
  default: {
    header: {
      backgroundColor: palette.white,
      borderBottomColor: palette.gray.light,
      borderBottomWidth: 1,
    },
    title: {
      color: palette.gray.darkest,
    },
    closeButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    closeText: {
      color: palette.gray.darkest,
    },
  },
  info: {
    header: {
      backgroundColor: palette.blue.primary,
    },
    title: {
      color: palette.white,
    },
    closeButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    closeText: {
      color: palette.white,
    },
  },
  success: {
    header: {
      backgroundColor: palette.green.success,
    },
    title: {
      color: palette.white,
    },
    closeButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    closeText: {
      color: palette.white,
    },
  },
  warning: {
    header: {
      backgroundColor: palette.yellow.warning,
    },
    title: {
      color: palette.white,
    },
    closeButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    closeText: {
      color: palette.white,
    },
  },
  error: {
    header: {
      backgroundColor: palette.red.error,
    },
    title: {
      color: palette.white,
    },
    closeButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    closeText: {
      color: palette.white,
    },
  },
};

/**
 * Default dialog styles
 */
export const dialogBaseStyles = {
  modal: {
    margin: 0,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  container: {
    backgroundColor: palette.white,
    borderRadius: 8,
    overflow: 'hidden' as const,
    ...shadows.medium,
  },
  header: {
    padding: 16,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  title: {
    fontSize: 18,
    fontWeight: '600' as const,
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  closeText: {
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: palette.gray.light,
    flexDirection: 'row' as const,
    justifyContent: 'flex-end' as const,
  },
};
