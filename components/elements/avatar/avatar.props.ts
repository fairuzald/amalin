import { ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AvatarColorVariant, AvatarSize } from './avatar.presets';

export interface AvatarProps {
  /**
   * Source for the avatar image
   */
  source?: ImageSourcePropType;

  /**
   * Initials to display when no image is available
   */
  initials?: string;

  /**
   * Size of the avatar
   */
  size?: AvatarSize;

  /**
   * Background color variant for initials avatar
   */
  colorVariant?: AvatarColorVariant;

  /**
   * Additional styling for the avatar container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional styling for the initials text
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Additional styling for the image
   */
  imageStyle?: StyleProp<ImageStyle>;

  /**
   * Optional border
   */
  bordered?: boolean;

  /**
   * Border color (defaults to white)
   */
  borderColor?: string;

  /**
   * Optional testID for testing
   */
  testID?: string;
}
