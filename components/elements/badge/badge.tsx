import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Typography } from '../typography';
import {
  badgeSizePresets,
  badgeTextSizePresets,
  badgeTextVariantPresets,
  badgeVariantPresets,
} from './badge.presets';
import { BadgeProps } from './badge.props';

export function Badge({
  text,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  icon,
  pill = false,
  testID,
}: BadgeProps) {
  const badgeStyles = [
    badgeVariantPresets[variant],
    badgeSizePresets[size],
    pill && PILL_STYLE,
    style,
  ];

  const textStyles = StyleSheet.flatten([
    BASE_TEXT,
    badgeTextVariantPresets[variant],
    badgeTextSizePresets[size],
    textStyle,
  ]);

  return (
    <View style={badgeStyles} testID={testID}>
      {icon && <View style={ICON_CONTAINER}>{icon}</View>}
      <Typography style={textStyles}>{text}</Typography>
    </View>
  );
}

const BASE_TEXT: TextStyle = {
  fontWeight: '500',
  textAlign: 'center',
};

const ICON_CONTAINER: ViewStyle = {
  marginRight: 4,
};

const PILL_STYLE: ViewStyle = {
  borderRadius: 999,
};
