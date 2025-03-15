import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { typographyColorPresets, typographyVariantPresets } from './typography.presets';
import { TypographyProps } from './typography.props';

export function Typography({
  children,
  variant = 'body',
  color = 'default',
  style,
  numberOfLines,
  center = false,
  right = false,
  testID,
  ...rest
}: TypographyProps) {
  const textStyles = StyleSheet.flatten([
    typographyVariantPresets[variant],
    typographyColorPresets[color],
    center && { textAlign: 'center' as const },
    right && { textAlign: 'right' as const },
    style,
  ]);

  return (
    <Text style={textStyles} numberOfLines={numberOfLines} testID={testID} {...rest}>
      {children}
    </Text>
  );
}
