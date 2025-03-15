import { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import { CardSize, CardVariant } from './card.presets';

export interface CardProps extends ViewProps {
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
   * Whether the card is pressable
   */
  onPress?: () => void;

  /**
   * Optional testID for testing
   */
  testID?: string;
}
