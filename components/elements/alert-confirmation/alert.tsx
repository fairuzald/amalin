import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { BackHandler, Modal, Platform, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from '../button';
import { Typography } from '../typography';
import { alertBaseStyles, alertButtonPresets, alertTypePresets } from './alert.presets';
import { AlertButtonStyle, AlertProps } from './alert.props';

export function Alert({
  visible,
  title,
  message,
  buttons = [],
  type = 'default',
  dismissable = true,
  onDismiss,
  style,
  testID,
}: AlertProps) {
  // Handler for back button on Android
  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
          if (visible && dismissable && onDismiss) {
            onDismiss();
            return true;
          }
          return false;
        });

        return () => subscription.remove();
      }
      return undefined;
    }, [visible, dismissable, onDismiss])
  );

  // Handle outside press
  const handleBackdropPress = () => {
    if (dismissable && onDismiss) {
      onDismiss();
    }
  };

  // Get preset styles for the current alert type
  const typePreset = alertTypePresets[type];

  // Map button style to button variant
  const getButtonVariant = (buttonStyle?: AlertButtonStyle) => {
    if (!buttonStyle) return type === 'default' ? 'primary' : type;
    return alertButtonPresets[buttonStyle];
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (dismissable && onDismiss) {
          onDismiss();
        }
      }}
      testID={testID}
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <View
          style={[styles.alertContainer, typePreset.container, style]}
          onStartShouldSetResponder={() => true}
          onTouchEnd={e => e.stopPropagation()}
        >
          {/* Title */}
          <View style={styles.titleContainer}>
            <Typography variant="h4" style={[styles.title, typePreset.title]}>
              {title}
            </Typography>
          </View>

          {/* Message */}
          <View style={styles.messageContainer}>
            {typeof message === 'string' ? (
              <Typography variant="body" color="default">
                {message}
              </Typography>
            ) : (
              message
            )}
          </View>

          {/* Buttons */}
          {buttons.length > 0 && (
            <View
              style={[styles.buttonContainer, buttons.length > 2 && styles.buttonContainerVertical]}
            >
              {buttons.map((button, index) => (
                <Button
                  key={`${index}-${button.text}`}
                  title={button.text}
                  variant={getButtonVariant(button.style) as any}
                  onPress={button.onPress}
                  style={
                    [
                      buttons.length <= 2 ? styles.buttonHorizontal : null,
                      buttons.length > 2 ? styles.buttonVertical : null,
                      button.buttonStyle,
                    ].filter(Boolean) as ViewStyle[]
                  }
                  loading={button.loading}
                  disabled={button.disabled}
                  testID={`${testID}-button-${index}`}
                />
              ))}
            </View>
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: alertBaseStyles.backdrop,
  alertContainer: alertBaseStyles.alertContainer,
  titleContainer: alertBaseStyles.titleContainer,
  title: alertBaseStyles.title,
  messageContainer: alertBaseStyles.messageContainer,
  buttonContainer: alertBaseStyles.buttonContainer,
  buttonContainerVertical: alertBaseStyles.buttonContainerVertical,
  buttonHorizontal: alertBaseStyles.buttonHorizontal,
  buttonVertical: alertBaseStyles.buttonVertical,
});
