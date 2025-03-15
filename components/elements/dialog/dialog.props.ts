import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { DialogSize, DialogVariant } from './dialog.presets';

export interface DialogProps {
  /**
   * Dialog visibility
   */
  visible: boolean;

  /**
   * Function to call when dialog is dismissed
   */
  onDismiss: () => void;

  /**
   * Dialog title
   */
  title?: string;

  /**
   * Dialog content
   */
  children: React.ReactNode;

  /**
   * Dialog size
   */
  size?: DialogSize;

  /**
   * Dialog variant
   */
  variant?: DialogVariant;

  /**
   * Whether dialog can be dismissed by tapping outside
   */
  dismissable?: boolean;

  /**
   * Whether to hide close button in header
   */
  hideCloseButton?: boolean;

  /**
   * Custom footer content
   */
  footer?: React.ReactNode;

  /**
   * Additional styling for the dialog container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional styling for the dialog header
   */
  headerStyle?: StyleProp<ViewStyle>;

  /**
   * Additional styling for the dialog title
   */
  titleStyle?: StyleProp<TextStyle>;

  /**
   * Additional styling for the dialog content container
   */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   * Additional styling for the dialog footer
   */
  footerStyle?: StyleProp<ViewStyle>;

  /**
   * Animation type
   */
  animationType?: 'slide' | 'fade' | 'none';

  /**
   * Optional testID for testing
   */
  testID?: string;
}
