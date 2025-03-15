import { ReactNode } from 'react';
import { TextProps, TextStyle } from 'react-native';
import { TypographyColor, TypographyVariant } from './typography.presets';

export interface TypographyProps extends TextProps {
  /**
   * Text content to display
   */
  children: ReactNode;

  /**
   * Typography variant
   */
  variant?: TypographyVariant;

  /**
   * Text color
   */
  color?: TypographyColor;

  /**
   * Additional styling for the text
   */
  style?: TextStyle | TextStyle[];

  /**
   * Number of lines before truncating
   */
  numberOfLines?: number;

  /**
   * Whether text should be centered
   */
  center?: boolean;

  /**
   * Whether text should be right-aligned
   */
  right?: boolean;

  /**
   * Optional testID for testing
   */
  testID?: string;
}
