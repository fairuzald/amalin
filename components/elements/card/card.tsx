import React from 'react';
import { View } from 'react-native';
import { cardSizePresets, cardVariantPresets } from './card.presets';
import { CardProps } from './card.props';

export function Card({ children, variant = 'default', size = 'medium', style, testID }: CardProps) {
  const cardStyles = [cardVariantPresets[variant], cardSizePresets[size], style];

  return (
    <View style={cardStyles} testID={testID}>
      {children}
    </View>
  );
}
