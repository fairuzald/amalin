import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import { palette } from '../../../theme/colors';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ShowToastParams {
  type: ToastType;
  text1?: string;
  text2?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  onShow?: () => void;
  onHide?: () => void;
}

// Custom toast component styled according to our design system
const renderToast = ({ type, text1, text2, props }: ToastConfigParams<any>) => {
  const styles = getStylesForType(type as ToastType);

  return (
    <View style={[baseStyles.container, styles.container]}>
      <View style={baseStyles.contentContainer}>
        {text1 && <Text style={[baseStyles.text1, styles.text]}>{text1}</Text>}
        {text2 && <Text style={[baseStyles.text2, styles.text]}>{text2}</Text>}
      </View>
    </View>
  );
};

// Get the styles based on toast type
const getStylesForType = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        container: {
          backgroundColor: palette.green.success,
        },
        text: {
          color: '#FFFFFF',
        },
      };
    case 'error':
      return {
        container: {
          backgroundColor: palette.red.error,
        },
        text: {
          color: '#FFFFFF',
        },
      };
    case 'info':
      return {
        container: {
          backgroundColor: palette.blue.primary,
        },
        text: {
          color: '#FFFFFF',
        },
      };
    case 'warning':
      return {
        container: {
          backgroundColor: palette.yellow.warning,
        },
        text: {
          color: '#FFFFFF',
        },
      };
    default:
      return {
        container: {
          backgroundColor: palette.gray.medium,
        },
        text: {
          color: '#FFFFFF',
        },
      };
  }
};

// Base styles for the toast
const baseStyles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  contentContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  text2: {
    fontSize: 14,
  },
});

// Toast config
export const toastConfig: ToastConfig = {
  success: props => renderToast({ ...props, type: 'success' }),
  error: props => renderToast({ ...props, type: 'error' }),
  info: props => renderToast({ ...props, type: 'info' }),
  warning: props => renderToast({ ...props, type: 'warning' }),
};

// Toast component that renders at the root level
export const ToastProvider = () => {
  return <Toast config={toastConfig} />;
};

// Helper to show toast messages with our design system styling
export const showToast = ({
  type,
  text1,
  text2,
  position = 'top',
  visibilityTime = 4000,
  autoHide = true,
  topOffset = 40,
  bottomOffset = 40,
  onShow,
  onHide,
}: ShowToastParams) => {
  Toast.show({
    type,
    text1,
    text2,
    position,
    visibilityTime,
    autoHide,
    topOffset,
    bottomOffset,
    onShow,
    onHide,
  });
};

// Helper to hide toast messages
export const hideToast = () => {
  Toast.hide();
};
