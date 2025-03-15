import React from 'react';
import { TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { InputSize, InputVariant } from './input.presets';

export interface InputProps extends TextInputProps {
  /**
   * Input variant
   */
  variant?: InputVariant;

  /**
   * Input size
   */
  size?: InputSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Helper text
   */
  helper?: string;

  /**
   * Additional styling for the container
   */
  containerStyle?: ViewStyle;

  /**
   * Additional styling for the label
   */
  labelStyle?: TextStyle;

  /**
   * Additional styling for the input container
   */
  inputContainerStyle?: ViewStyle;

  /**
   * Additional styling for the input
   */
  inputStyle?: TextStyle;

  /**
   * Optional left icon
   */
  leftIcon?: React.ReactNode;

  /**
   * Optional right icon
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Optional testID for testing
   */
  testID?: string;
}
