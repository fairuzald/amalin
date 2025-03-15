import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { palette } from '../../../themes/colors';
import { Typography } from '../typography';
import { BaseInputProps } from './base.input.props';
import {
  inputContainerVariantPresets,
  inputSizePresets,
  inputStatePresets,
  inputTextSizePresets,
} from './input.presets';

export interface DateInputProps extends BaseInputProps {
  value?: string;
  placeholder?: string;
  format?: string;
  minDate?: string;
  maxDate?: string;
}

export function DateInput({
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
  onChangeText,
  value,
  placeholder,
  format = 'DD/MM/YYYY',
  minDate,
  maxDate,
}: DateInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || '');

  // Format YYYY-MM-DD to display format (DD/MM/YYYY by default)
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    try {
      const [year, month, day] = dateString.split('-');
      if (format === 'DD/MM/YYYY') {
        return `${day}/${month}/${year}`;
      } else if (format === 'MM/DD/YYYY') {
        return `${month}/${day}/${year}`;
      } else if (format === 'YYYY/MM/DD') {
        return `${year}/${month}/${day}`;
      }
      return dateString; // Return original if format not recognized
    } catch (e) {
      return dateString; // Return original on error
    }
  };

  // Convert display format back to YYYY-MM-DD for Calendar
  const parseDisplayDate = (displayDate: string): string => {
    if (!displayDate) return '';

    try {
      if (format === 'DD/MM/YYYY') {
        const [day, month, year] = displayDate.split('/');
        return `${year}-${month}-${day}`;
      } else if (format === 'MM/DD/YYYY') {
        const [month, day, year] = displayDate.split('/');
        return `${year}-${month}-${day}`;
      } else if (format === 'YYYY/MM/DD') {
        const [year, month, day] = displayDate.split('/');
        return `${year}-${month}-${day}`;
      }
      return displayDate; // Return original if format not recognized
    } catch (e) {
      return displayDate; // Return original on error
    }
  };

  const handleSelectDate = (date: DateData) => {
    const formattedDate = formatDate(date.dateString);
    setSelectedDate(formattedDate);
    onChangeText?.(formattedDate);
    setModalVisible(false);
    setIsFocused(false);
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

  // Create marked dates object for the calendar
  const markedDates: any = {};
  if (selectedDate) {
    const calendarDateStr = parseDisplayDate(selectedDate);
    markedDates[calendarDateStr] = { selected: true, selectedColor: palette.blue.primary };
  }

  return (
    <View style={[BASE_CONTAINER, containerStyle]} testID={testID}>
      {label && (
        <Typography style={StyleSheet.flatten([BASE_LABEL, labelStyle])}>{label}</Typography>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (!disabled) {
            setModalVisible(true);
            setIsFocused(true);
          }
        }}
      >
        <View style={containerStyles}>
          {leftIcon && <View style={ICON_CONTAINER}>{leftIcon}</View>}

          <View style={[textStyles, TOUCHABLE_INPUT]}>
            <Typography style={value ? {} : PLACEHOLDER_TEXT}>
              {value || placeholder || format}
            </Typography>
          </View>

          <View style={ICON_CONTAINER}>
            {rightIcon || <Ionicons name="calendar-outline" size={20} color={palette.gray.dark} />}
          </View>
        </View>
      </TouchableOpacity>

      {(error || helper) && <Typography style={helperTextStyle}>{error || helper}</Typography>}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsFocused(false);
        }}
      >
        <View style={MODAL_CONTAINER}>
          <View style={MODAL_CONTENT}>
            <View style={MODAL_HEADER}>
              <Typography variant="body" style={MODAL_TITLE}>
                {label || 'Select Date'}
              </Typography>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setIsFocused(false);
                }}
              >
                <Typography variant="body" color="primary">
                  Close
                </Typography>
              </TouchableOpacity>
            </View>

            <View style={CALENDAR_CONTAINER}>
              <Calendar
                current={selectedDate ? parseDisplayDate(selectedDate) : undefined}
                minDate={minDate}
                maxDate={maxDate}
                onDayPress={handleSelectDate}
                markedDates={markedDates}
                monthFormat={'MMMM yyyy'}
                hideExtraDays={true}
                firstDay={1}
                enableSwipeMonths={true}
                theme={{
                  selectedDayBackgroundColor: palette.blue.primary,
                  todayTextColor: palette.blue.primary,
                  arrowColor: palette.blue.primary,
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 14,
                  textDayStyle: { color: palette.gray.darkest },
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '500',
                }}
              />
            </View>

            <View style={BUTTON_CONTAINER}>
              <TouchableOpacity
                style={[BUTTON, BUTTON_CANCEL]}
                onPress={() => {
                  setModalVisible(false);
                  setIsFocused(false);
                }}
              >
                <Typography>Cancel</Typography>
              </TouchableOpacity>

              <TouchableOpacity
                style={[BUTTON, BUTTON_CONFIRM]}
                onPress={() => {
                  // Use the current selected date
                  if (selectedDate) {
                    onChangeText?.(selectedDate);
                  }
                  setModalVisible(false);
                  setIsFocused(false);
                }}
              >
                <Typography style={BUTTON_TEXT_CONFIRM}>Confirm</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

const TOUCHABLE_INPUT: ViewStyle = {
  justifyContent: 'center',
};

const PLACEHOLDER_TEXT: TextStyle = {
  color: palette.gray.medium,
};

const MODAL_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const MODAL_CONTENT: ViewStyle = {
  backgroundColor: 'white',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: 16,
  paddingBottom: 24,
  maxHeight: '80%',
};

const MODAL_HEADER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderBottomColor: palette.gray.light,
};

const MODAL_TITLE: TextStyle = {
  fontWeight: '600',
};

const CALENDAR_CONTAINER: ViewStyle = {
  padding: 8,
};

const BUTTON_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 8,
  marginTop: 16,
};

const BUTTON: ViewStyle = {
  flex: 1,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginHorizontal: 8,
};

const BUTTON_CANCEL: ViewStyle = {
  backgroundColor: palette.gray.light,
};

const BUTTON_CONFIRM: ViewStyle = {
  backgroundColor: palette.blue.primary,
};

const BUTTON_TEXT_CONFIRM: TextStyle = {
  color: 'white',
  fontWeight: '600',
};
