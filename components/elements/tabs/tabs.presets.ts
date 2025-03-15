import { spacing } from '@/themes';
import { palette } from '@/themes/colors';
import shadows from '@/themes/shadows';
import { TextStyle, ViewStyle } from 'react-native';

/**
 * Tab variant presets
 */
export type TabVariant = 'default' | 'underlined' | 'pill' | 'segmented';

export const tabVariantPresets: Record<
  TabVariant,
  {
    container: ViewStyle;
    tabBar: ViewStyle;
    tabItem: ViewStyle;
    tabText: TextStyle;
    activeTabItem: ViewStyle;
    activeTabText: TextStyle;
  }
> = {
  // Default style
  default: {
    container: {
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: palette.white,
      ...shadows.small,
      elevation: 2,
      borderRadius: spacing.s,
    },
    tabItem: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: palette.gray.dark,
    },
    activeTabItem: {
      borderBottomColor: palette.blue.primary,
    },
    activeTabText: {
      color: palette.blue.primary,
      fontWeight: '600',
    },
  },

  // Underlined variant
  underlined: {
    container: {
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderBottomColor: palette.gray.light,
    },
    tabItem: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: palette.gray.dark,
    },
    activeTabItem: {
      borderBottomColor: palette.blue.primary,
    },
    activeTabText: {
      color: palette.blue.primary,
      fontWeight: '600',
    },
  },

  // Pill variant
  pill: {
    container: {
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: palette.gray.lightest,
      padding: spacing.s,
      borderRadius: 24,
    },
    tabItem: {
      flex: 1,
      paddingVertical: spacing.s,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: palette.gray.dark,
    },
    activeTabItem: {
      backgroundColor: palette.blue.primary,
    },
    activeTabText: {
      color: palette.white,
      fontWeight: '600',
    },
  },

  // Segmented control style
  segmented: {
    container: {
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: palette.gray.lightest,
      padding: spacing.s,
      borderRadius: spacing.s,
    },
    tabItem: {
      flex: 1,
      paddingVertical: spacing.s,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: palette.gray.darkest,
    },
    activeTabItem: {
      backgroundColor: palette.white,
      ...shadows.small,
    },
    activeTabText: {
      color: palette.blue.primary,
      fontWeight: '600',
    },
  },
};
