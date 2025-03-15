import { palette, spacing } from '@/themes';
import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface SafeLayoutProps {
  /** Content to render inside the layout */
  children: ReactNode;

  /** SafeAreaView edges to apply */
  edges?: readonly Edge[];

  /** Additional style for the SafeAreaView */
  containerStyle?: StyleProp<ViewStyle>;

  /** Additional style for the KeyboardAvoidingView */
  keyboardStyle?: StyleProp<ViewStyle>;

  /** Additional style for the ScrollView */
  scrollContentStyle?: StyleProp<ViewStyle>;

  /** Whether to include ScrollView */
  withScrollView?: boolean;

  /** Custom keyboard vertical offset */
  keyboardOffset?: number;

  /** Whether keyboard should persist taps */
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';

  /** Hide keyboard on scroll */
  keyboardDismissMode?: 'none' | 'on-drag' | 'interactive';
}

const SafeLayout: React.FC<SafeLayoutProps> = ({
  children,
  edges = ['right', 'left', 'top'],
  containerStyle,
  keyboardStyle,
  scrollContentStyle,
  withScrollView = false, // Changed default to false to prevent nested scrollviews
  keyboardOffset,
  keyboardShouldPersistTaps = 'handled',
  keyboardDismissMode = 'interactive',
}) => {
  const defaultOffset = Platform.OS === 'ios' ? 64 : 0;
  const verticalOffset = keyboardOffset ?? defaultOffset;

  const innerContent = withScrollView ? (
    <ScrollView
      contentContainerStyle={[SCROLL_CONTENT, scrollContentStyle]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      keyboardDismissMode={keyboardDismissMode}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <SafeAreaView style={[BASE_CONTAINER, containerStyle]} edges={edges}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[KEYBOARD_AVOIDING_VIEW, keyboardStyle]}
        keyboardVerticalOffset={verticalOffset}
      >
        {innerContent}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Base styles
const BASE_CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: palette.gray.lightest,
};

const KEYBOARD_AVOIDING_VIEW: ViewStyle = {
  flex: 1,
};

const SCROLL_CONTENT: ViewStyle = {
  flexGrow: 1,
  paddingBottom: 20,
  paddingHorizontal: spacing.ts,
};

export default SafeLayout;
