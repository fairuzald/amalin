import { ActivityIndicator, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { palette } from '../../../themes/colors';
import { Typography } from '../typography';
import { loaderColorPresets, loaderSizePresets } from './loader.presets';
import { LoaderProps } from './loader.props';

export function Loader({
  size = 'medium',
  colorVariant = 'primary',
  color,
  text,
  style,
  textStyle,
  fullScreen = false,
  backgroundOpacity = 0.7,
  testID,
}: LoaderProps) {
  const sizeValue = loaderSizePresets[size].size;
  const containerSize = loaderSizePresets[size].containerSize;

  const loaderColor = color || loaderColorPresets[colorVariant];

  const renderLoader = () => (
    <View
      style={[
        BASE_CONTAINER,
        fullScreen ? FULL_SCREEN : null,
        fullScreen ? { backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})` } : null,
        style,
      ]}
      testID={testID}
    >
      <View style={[LOADER_CONTAINER, { width: containerSize, height: containerSize }]}>
        <ActivityIndicator size={sizeValue} color={loaderColor} />
        {text && <Typography style={StyleSheet.flatten([BASE_TEXT, textStyle])}>{text}</Typography>}
      </View>
    </View>
  );

  if (fullScreen) {
    return <View style={FULL_SCREEN_CONTAINER}>{renderLoader()}</View>;
  }

  return renderLoader();
}

const BASE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const LOADER_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const FULL_SCREEN_CONTAINER: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
};

const FULL_SCREEN: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
};

const BASE_TEXT: TextStyle = {
  marginTop: 8,
  fontSize: 14,
  color: palette.gray.darkest,
  textAlign: 'center',
};
