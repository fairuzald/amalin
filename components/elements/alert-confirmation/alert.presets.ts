import { palette } from '@/theme/colors';
import shadows from '@/theme/shadows';
import { ViewStyle } from 'react-native';
import { AlertButtonStyle, AlertType } from './alert.props';

/**
 * Alert variant presets based on type
 */
export const alertTypePresets: Record<
  AlertType,
  {
    title: { color: string };
    container: ViewStyle;
  }
> = {
  default: {
    title: { color: palette.gray.darkest },
    container: {},
  },
  info: {
    title: { color: palette.blue.primary },
    container: {},
  },
  success: {
    title: { color: palette.green.success },
    container: {},
  },
  warning: {
    title: { color: palette.yellow.warning },
    container: {},
  },
  error: {
    title: { color: palette.red.error },
    container: {},
  },
};

export const alertButtonPresets: Record<AlertButtonStyle, string> = {
  default: 'primary',
  cancel: 'outline',
  destructive: 'danger',
};

/**
 * Alert base styles
 */
export const alertBaseStyles = {
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  alertContainer: {
    width: '80%' as const,
    maxWidth: 320 as const,
    backgroundColor: 'white' as const,
    borderRadius: 12 as const,
    overflow: 'hidden' as const,
    ...shadows.medium,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    textAlign: 'center' as const,
  },
  messageContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: palette.gray.light,
    flexDirection: 'row' as const,
  },
  buttonContainerVertical: {
    flexDirection: 'column' as const,
  },
  buttonHorizontal: {
    flex: 1,
    borderRadius: 0,
    justifyContent: 'center' as const,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: palette.gray.light,
  },
  buttonVertical: {
    borderRadius: 0,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: palette.gray.light,
  },
};
