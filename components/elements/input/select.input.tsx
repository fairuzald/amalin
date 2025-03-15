import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

export interface SelectInputProps extends BaseInputProps {
  options: string[];
  onSelectOption?: (option: string) => void;
  value?: string;
  placeholder?: string;
}

export function SelectInput({
  variant = 'outlined',
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
  options = [],
  onSelectOption,
  onChangeText,
  value,
  placeholder,
}: SelectInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputLayout, setInputLayout] = useState({ width: 0, height: 0, x: 0, y: 0, pageY: 0 });
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleSelectOption = (option: string) => {
    onChangeText?.(option);
    onSelectOption?.(option);
    closeDropdown();
  };

  const handleLayout = (event: any) => {
    const { width, height, x, y } = event.nativeEvent.layout;

    // For Android/iOS we need to get the absolute position
    if (Platform.OS !== 'web') {
      event.target.measure(
        (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          setInputLayout({ width, height, x: pageX, y: pageY, pageY });
        }
      );
    } else {
      setInputLayout({ width, height, x, y, pageY: y });
    }
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

  // Calculate dropdown position
  const dropdownTop = inputLayout.pageY + inputLayout.height;
  const dropdownHeight = Math.min(44 * options.length + 20, 220);
  const dropdownBottom = dropdownTop + dropdownHeight;

  // Check if dropdown would go off screen
  const shouldShowAbove = dropdownBottom > windowHeight;

  // Position dropdown above input if it would go off screen
  const dropdownPosition = shouldShowAbove
    ? { bottom: windowHeight - inputLayout.pageY }
    : { top: dropdownTop };

  return (
    <View style={[BASE_CONTAINER, containerStyle]} testID={testID}>
      {label && (
        <Typography style={StyleSheet.flatten([BASE_LABEL, labelStyle])}>{label}</Typography>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleDropdown}
        disabled={disabled}
        onLayout={handleLayout}
      >
        <View style={containerStyles}>
          {leftIcon && <View style={ICON_CONTAINER}>{leftIcon}</View>}

          <View style={[textStyles, TOUCHABLE_INPUT]}>
            <Typography style={value ? {} : PLACEHOLDER_TEXT}>
              {value || placeholder || 'Select an option'}
            </Typography>
          </View>

          <View style={ICON_CONTAINER}>
            {rightIcon || (
              <Ionicons
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={palette.gray.dark}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {(error || helper) && <Typography style={helperTextStyle}>{error || helper}</Typography>}

      {/* Dropdown Modal */}
      <Modal transparent visible={isOpen} animationType="fade" onRequestClose={closeDropdown}>
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={MODAL_OVERLAY}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  DROPDOWN_CONTAINER,
                  {
                    width: inputLayout.width,
                    maxHeight: 220,
                    ...dropdownPosition,
                    left: inputLayout.x,
                  },
                ]}
              >
                <ScrollView
                  bounces={false}
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={DROPDOWN_SCROLL_CONTENT}
                >
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={`${option}-${index}`}
                      style={[
                        OPTION_ITEM,
                        value === option && OPTION_SELECTED,
                        index === options.length - 1 && OPTION_LAST,
                      ]}
                      onPress={() => handleSelectOption(option)}
                    >
                      <Typography style={value === option ? OPTION_TEXT_SELECTED : {}}>
                        {option}
                      </Typography>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const BASE_CONTAINER: ViewStyle = {
  marginBottom: 16,
  position: 'relative',
  zIndex: 1,
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

const TOUCHABLE_INPUT: ViewStyle = {
  justifyContent: 'center',
};

const PLACEHOLDER_TEXT: TextStyle = {
  color: palette.gray.medium,
};

const MODAL_OVERLAY: ViewStyle = {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
};

const DROPDOWN_CONTAINER: ViewStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor: palette.gray.light,
  borderRadius: 8,
  overflow: 'hidden',
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};

const DROPDOWN_SCROLL_CONTENT: ViewStyle = {
  paddingVertical: 8,
};

const OPTION_ITEM: ViewStyle = {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: palette.gray.lightest,
};

const OPTION_LAST: ViewStyle = {
  borderBottomWidth: 0,
};

const OPTION_SELECTED: ViewStyle = {
  backgroundColor: palette.blue.accent,
};

const OPTION_TEXT_SELECTED: TextStyle = {
  color: palette.blue.primary,
  fontWeight: '600',
};
