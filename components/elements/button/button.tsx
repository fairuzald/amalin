import shadows from '@/themes/shadows';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { palette } from '../../../themes/colors';
import { Typography } from '../typography';
import {
  buttonSizePresets,
  buttonStatePresets,
  buttonTextSizePresets,
  buttonTextVariantPresets,
  buttonVariantPresets,
} from './button.presets';
import { ButtonProps } from './button.props';

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  iconSpacing = 8,
  withShadow = false,
  onPress,
  testID,
  ...rest
}: ButtonProps) {
  const buttonStyles = [
    BASE_BUTTON,
    buttonVariantPresets[variant],
    buttonSizePresets[size],
    (disabled || loading) && buttonStatePresets.disabled,
    withShadow && shadows.medium,
    style,
  ];

  const textStyles = StyleSheet.flatten([
    BASE_TEXT,
    buttonTextVariantPresets[variant],
    buttonTextSizePresets[size],
    textStyle,
  ]);

  const loaderColor =
    variant === 'outline' || variant === 'ghost' ? palette.blue.primary : palette.white;

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={loaderColor} size="small" />
      ) : (
        <>
          {leftIcon && <View style={{ marginRight: iconSpacing }}>{leftIcon}</View>}
          <Typography style={textStyles}>{title}</Typography>
          {rightIcon && <View style={{ marginLeft: iconSpacing }}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
}

const BASE_BUTTON: ViewStyle = {
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  overflow: 'hidden',
};

const BASE_TEXT: TextStyle = {
  fontWeight: '600',
  textAlign: 'center',
};
