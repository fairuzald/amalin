import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { CardSize, CardVariant } from './card.presets';

export interface CardProps {
  /**
   * Card content
   */
  children: ReactNode;

  /**
   * Card variant
   */
  variant?: CardVariant;

  /**
   * Card size (affects padding)
   */
  size?: CardSize;

  /**
   * Additional styling for the card
   */
  style?: ViewStyle;

  /**
   * Whether the card is pressable
   */
  onPress?: () => void;

  /**
   * Optional testID for testing
   */
  testID?: string;
}
