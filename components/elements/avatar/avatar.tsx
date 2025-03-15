import { palette } from '@/themes/colors';
import { useState } from 'react';
import { Image, ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Typography } from '../typography';
import { avatarColorPresets, avatarSizePresets, avatarTextSizePresets } from './avatar.presets';
import { AvatarProps } from './avatar.props';

export function Avatar({
  source,
  initials,
  size = 'medium',
  colorVariant = 'primary',
  style,
  textStyle,
  imageStyle,
  bordered = false,
  borderColor = palette.white,
  testID,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const containerStyles = [
    BASE_CONTAINER,
    avatarSizePresets[size],
    !source || imageError ? avatarColorPresets[colorVariant] : undefined,
    bordered && {
      borderWidth: 2,
      borderColor,
    },
    style,
  ];

  const initialsTextStyles = StyleSheet.flatten([
    BASE_INITIALS_TEXT,
    avatarTextSizePresets[size],
    textStyle,
  ]);

  const getInitials = (text?: string) => {
    if (!text) return '';
    return text
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const renderContent = () => {
    if (source && !imageError) {
      return (
        <Image
          source={source}
          style={[
            BASE_IMAGE,
            { width: avatarSizePresets[size].width, height: avatarSizePresets[size].height },
            imageStyle,
          ]}
          onError={() => setImageError(true)}
        />
      );
    }

    return <Typography style={initialsTextStyles}>{getInitials(initials)}</Typography>;
  };

  return (
    <View style={containerStyles} testID={testID}>
      {renderContent()}
    </View>
  );
}

const BASE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

const BASE_IMAGE: ImageStyle = {
  width: '100%',
  height: '100%',
};

const BASE_INITIALS_TEXT: TextStyle = {
  color: palette.white,
  fontWeight: '500',
};
