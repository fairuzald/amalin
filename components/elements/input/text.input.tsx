import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { palette } from '../../../themes/colors';
import { Typography } from '../typography';
import { BaseInputProps } from './base.input.props';
import {
  inputContainerVariantPresets,
  inputSizePresets,
  inputStatePresets,
  inputTextSizePresets,
} from './input.presets';

export interface TextInputProps extends BaseInputProps {
  secureTextEntry?: boolean;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onChangeText?: (text: string) => void;
  value?: string;
}

export function TextInput({
  variant = 'outlined' as 'outlined' | 'filled',
  size = 'medium',
  label,
  error,
  helper,
  containerStyle,
  labelStyle,
  inputContainerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  disabled = false,
  testID,
  onChangeText,
  value,
  onFocus,
  onBlur,
  ...rest
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    onChangeText?.(text);
  };

  const containerStyles = [
    BASE_VIEW_INPUT,
    inputContainerVariantPresets[variant as 'outlined' | 'filled'],
    inputSizePresets[size],
    isFocused && inputStatePresets.focused,
    error && inputStatePresets.error,
    disabled && inputStatePresets.disabled,
    inputContainerStyle,
  ];

  const textStyles = [BASE_INPUT, inputTextSizePresets[size], inputStyle];

  const helperTextStyle = StyleSheet.flatten([BASE_HELPER_TEXT, error ? ERROR_TEXT : null]);

  return (
    <View style={[BASE_CONTAINER, containerStyle]} testID={testID}>
      {label && (
        <Typography style={StyleSheet.flatten([BASE_LABEL, labelStyle])}>{label}</Typography>
      )}

      <View style={containerStyles}>
        {leftIcon && <View style={ICON_CONTAINER}>{leftIcon}</View>}

        <RNTextInput
          style={textStyles}
          placeholderTextColor={palette.gray.medium}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          value={value}
          editable={!disabled}
          {...rest}
        />

        {rightIcon && <View style={ICON_CONTAINER}>{rightIcon}</View>}
      </View>

      {(error || helper) && <Typography style={helperTextStyle}>{error || helper}</Typography>}
    </View>
  );
}

const BASE_CONTAINER: ViewStyle = {
  marginBottom: 16,
};

const BASE_LABEL: TextStyle = {
  fontSize: 14,
  fontWeight: '500',
  color: palette.gray.darkest,
  marginBottom: 8,
};

const BASE_INPUT: TextStyle = {
  flex: 1,
  color: palette.gray.darkest,
  paddingHorizontal: 16,
  paddingVertical: 12,
};

const BASE_VIEW_INPUT: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const ICON_CONTAINER: ViewStyle = {
  paddingHorizontal: 12,
  justifyContent: 'center',
  alignItems: 'center',
};

const BASE_HELPER_TEXT: TextStyle = {
  fontSize: 12,
  color: palette.gray.medium,
  marginTop: 4,
  marginLeft: 4,
};

const ERROR_TEXT: TextStyle = {
  color: palette.red.error,
};
