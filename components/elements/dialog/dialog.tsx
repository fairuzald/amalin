import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '../typography';
import { dialogBaseStyles, dialogSizePresets, dialogVariantPresets } from './dialog.presets';
import { DialogProps } from './dialog.props';

export function Dialog({
  visible,
  onDismiss,
  title,
  children,
  size = 'medium',
  variant = 'default',
  dismissable = true,
  hideCloseButton = false,
  footer,
  style,
  headerStyle,
  titleStyle,
  contentStyle,
  footerStyle,
  animationType = 'fade',
  testID,
}: DialogProps) {
  const sizePreset = dialogSizePresets[size];
  const variantPreset = dialogVariantPresets[variant];

  const handleBackdropPress = () => {
    if (dismissable) {
      onDismiss();
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={dismissable ? onDismiss : undefined}
      transparent
      animationType={animationType}
      testID={testID}
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <View
          style={[styles.container, sizePreset, style]}
          onStartShouldSetResponder={() => true}
          onTouchEnd={e => e.stopPropagation()}
        >
          {title && (
            <View style={[styles.header, variantPreset.header, headerStyle]}>
              <Typography
                variant="h4"
                style={StyleSheet.flatten([(styles.title, variantPreset.title, titleStyle)])}
              >
                {title}
              </Typography>

              {!hideCloseButton && (
                <TouchableOpacity
                  onPress={onDismiss}
                  style={[styles.closeButton, variantPreset.closeButton]}
                  testID={`${testID}-close`}
                >
                  <Text style={[styles.closeText, variantPreset.closeText]}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={[styles.content, contentStyle]}>{children}</View>

          {footer && <View style={[styles.footer, footerStyle]}>{footer}</View>}
        </View>
      </Pressable>
    </Modal>
  );
}

// Create styles using our base presets
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: dialogBaseStyles.container,
  header: dialogBaseStyles.header,
  title: dialogBaseStyles.title,
  closeButton: dialogBaseStyles.closeButton,
  closeText: dialogBaseStyles.closeText,
  content: dialogBaseStyles.content,
  footer: dialogBaseStyles.footer,
});
