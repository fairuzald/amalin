import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextInput as RNTextInput, TextStyle, View, ViewStyle } from 'react-native';
import { palette } from '../../../themes/colors';
import { BaseInputProps } from './base.input.props';

export interface OTPInputProps extends Omit<BaseInputProps, 'label' | 'error' | 'helper'> {
  value: string;
  onChangeText: (text: string) => void;
  index: number;
  onCodeFilled?: (code: string) => void;
  onKeyPress?: (event: { nativeEvent: { key: string } }) => void;
}

export const OTPInput = forwardRef<RNTextInput, OTPInputProps>(
  (
    { value, onChangeText, index, disabled = false, inputStyle, inputContainerStyle, ...rest },
    ref
  ) => {
    const inputRef = useRef<RNTextInput>(null);

    // Forward the ref to parent component
    useImperativeHandle(ref, () => inputRef.current!);

    const containerStyles = [OTP_CONTAINER, inputContainerStyle];
    const textStyles = [OTP_INPUT_TEXT, inputStyle];

    return (
      <View style={containerStyles}>
        <RNTextInput
          ref={inputRef}
          style={textStyles}
          value={value}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          editable={!disabled}
          selectTextOnFocus
          {...rest}
        />
      </View>
    );
  }
);

const OTP_CONTAINER: ViewStyle = {
  width: 45,
  height: 50,
  borderWidth: 1,
  borderColor: palette.gray.medium,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 4,
  backgroundColor: 'white',
};

const OTP_INPUT_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  color: palette.gray.darkest,
};
