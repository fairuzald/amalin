import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { CheckboxSize, CheckboxVariant } from './checkbox.presets';

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;

  /**
   * Function to call when checkbox is pressed
   */
  onPress: () => void;

  /**
   * Size of the checkbox
   */
  size?: CheckboxSize;

  /**
   * Color variant of the checkbox
   */
  variant?: CheckboxVariant;

  /**
   * Label text to display
   */
  label?: string;

  /**
   * Additional styling for the checkbox container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional styling for the checkbox box
   */
  checkboxStyle?: StyleProp<ViewStyle>;

  /**
   * Additional styling for the label
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Custom icon to display when checked (defaults to checkmark)
   */
  checkedIcon?: React.ReactNode;

  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;

  /**
   * Label position relative to checkbox
   */
  labelPosition?: 'left' | 'right';

  /**
   * Optional testID for testing
   */
  testID?: string;
}
