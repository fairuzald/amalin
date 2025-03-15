import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { LoaderColorVariant, LoaderSize } from './loader.presets';

export interface LoaderProps {
  /**
   * Size of the loader
   */
  size?: LoaderSize;

  /**
   * Color variant of the loader
   */
  colorVariant?: LoaderColorVariant;

  /**
   * Custom color for the loader (overrides colorVariant)
   */
  color?: string;

  /**
   * Whether to show a text label with the loader
   */
  text?: string;

  /**
   * Additional styling for the loader container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional styling for the text
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Whether to cover the full screen with a semi-transparent background
   */
  fullScreen?: boolean;

  /**
   * Full screen background opacity
   */
  backgroundOpacity?: number;

  /**
   * Optional testID for testing
   */
  testID?: string;
}
