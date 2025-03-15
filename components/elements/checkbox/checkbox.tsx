import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { palette } from '../../../themes/colors';
import { Typography } from '../typography';
import { checkboxSizePresets, checkboxVariantPresets } from './checkbox.presets';
import { CheckboxProps } from './checkbox.props';

export function Checkbox({
  checked,
  onPress,
  size = 'medium',
  variant = 'primary',
  label,
  style,
  checkboxStyle,
  labelStyle,
  checkedIcon,
  disabled = false,
  labelPosition = 'right',
  testID,
}: CheckboxProps) {
  const checkboxStyles = [
    BASE_CHECKBOX,
    checkboxSizePresets[size],
    {
      borderColor: checked ? checkboxVariantPresets[variant].borderColor : palette.gray.medium,
      backgroundColor: checked ? checkboxVariantPresets[variant].backgroundColor : 'transparent',
    },
    disabled && DISABLED_STYLE,
    checkboxStyle,
  ];

  const renderCheckIcon = () => {
    if (!checked) return null;

    if (checkedIcon) {
      return checkedIcon;
    }

    return (
      <View style={CHECKMARK_CONTAINER}>
        <View style={[CHECKMARK, CHECKMARK_LEFT]} />
        <View style={[CHECKMARK, CHECKMARK_RIGHT]} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[BASE_CONTAINER, labelPosition === 'left' && REVERSE_CONTAINER, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testID}
    >
      <View style={checkboxStyles}>{renderCheckIcon()}</View>

      {label && (
        <Typography style={StyleSheet.flatten([BASE_LABEL, disabled && DISABLED_TEXT, labelStyle])}>
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
}

const BASE_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const REVERSE_CONTAINER: ViewStyle = {
  flexDirection: 'row-reverse',
  justifyContent: 'flex-end',
};

const BASE_CHECKBOX: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  overflow: 'hidden',
};

const BASE_LABEL: TextStyle = {
  marginLeft: 8,
  marginRight: 0,
  fontSize: 14,
  color: palette.gray.darkest,
};

const DISABLED_STYLE: ViewStyle = {
  opacity: 0.5,
};

const DISABLED_TEXT: TextStyle = {
  color: palette.gray.medium,
};

const CHECKMARK_CONTAINER: ViewStyle = {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

const CHECKMARK: ViewStyle = {
  position: 'absolute',
  backgroundColor: palette.white,
};

const CHECKMARK_LEFT: ViewStyle = {
  height: '40%',
  width: 2,
  left: '37%',
  bottom: '40%',
  transform: [{ rotate: '45deg' }],
};

const CHECKMARK_RIGHT: ViewStyle = {
  height: '70%',
  width: 2,
  left: '55%',
  bottom: '30%',
  transform: [{ rotate: '-45deg' }],
};
