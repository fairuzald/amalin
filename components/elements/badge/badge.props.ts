import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { BadgeSize, BadgeVariant } from './badge.presets';

export interface BadgeProps {
  /**
   * Badge text content
   */
  text: string;

  /**
   * Badge variant
   */
  variant?: BadgeVariant;

  /**
   * Badge size
   */
  size?: BadgeSize;

  /**
   * Additional styling for the badge container
   */
  style?: ViewStyle;

  /**
   * Additional styling for the badge text
   */
  textStyle?: TextStyle;

  /**
   * Optional icon to display before the text
   */
  icon?: React.ReactNode;

  /**
   * Make badge use pill shape (fully rounded corners)
   */
  pill?: boolean;

  /**
   * Optional testID for testing
   */
  testID?: string;
}
