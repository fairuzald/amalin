import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface BaseInputProps {
  /**
   * Variant of the input
   * @default outlined
   */
  variant?: 'outlined' | 'filled' | 'unstyled';

  /**
   * Size of the input
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Input label
   */
  label?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display when there's no error
   */
  helper?: string;

  /**
   * Additional container style
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Label style
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Input container style
   */
  inputContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Text input style
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Left icon component
   */
  leftIcon?: ReactNode;

  /**
   * Right icon component
   */
  rightIcon?: ReactNode;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Test ID for testing
   */
  testID?: string;

  /**
   * Callback for text change
   */
  onChangeText?: (text: string) => void;

  /**
   * Input focus callback
   */
  onFocus?: (e: any) => void;

  /**
   * Input blur callback
   */
  onBlur?: (e: any) => void;
}
