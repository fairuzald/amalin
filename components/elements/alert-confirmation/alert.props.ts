import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'default';

export interface AlertButton {
  /**
   * Button text
   */
  text: string;

  /**
   * Style of the button
   */
  style?: 'default' | 'cancel' | 'destructive';

  /**
   * Function to call when button is pressed
   */
  onPress: () => void;

  /**
   * Custom style for the button
   */
  buttonStyle?: StyleProp<ViewStyle>;

  /**
   * Whether the button is loading
   */
  loading?: boolean;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
}

export interface AlertProps {
  /**
   * Whether alert is visible
   */
  visible: boolean;

  /**
   * Alert title
   */
  title: string;

  /**
   * Alert message (can be string or component)
   */
  message: string | ReactNode;

  /**
   * Array of buttons to display
   */
  buttons?: AlertButton[];

  /**
   * Type of alert (affects colors)
   */
  type?: AlertType;

  /**
   * Whether alert can be dismissed by tapping outside
   */
  dismissable?: boolean;

  /**
   * Function to call when alert is dismissed
   */
  onDismiss?: () => void;

  /**
   * Custom style for the alert container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional test ID
   */
  testID?: string;
}

/**
 * Alert button style presets
 */
export type AlertButtonStyle = 'default' | 'cancel' | 'destructive';
