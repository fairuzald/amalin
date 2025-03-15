import { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import { ButtonSize, ButtonVariant } from './button.presets';

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Text to display inside the button
   */
  title: string;

  /**
   * Button visual variant
   */
  variant?: ButtonVariant;

  /**
   * Button size
   */
  size?: ButtonSize;

  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;

  /**
   * Additional styling for the button container
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Additional styling for the button text
   */
  textStyle?: TextStyle;

  /**
   * Optional icon to display before the text
   */
  leftIcon?: React.ReactNode;

  /**
   * Optional icon to display after the text
   */
  rightIcon?: React.ReactNode;

  /**
   * Space between icon and text
   */
  iconSpacing?: number;

  /**
   * Whether to apply shadow to the button
   */
  withShadow?: boolean;

  /**
   * Optional testID for testing
   */
  testID?: string;
}
