import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TabVariant } from './tabs.presets';

export interface TabRoute {
  key: string;
  title: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

export interface TabSelectorProps {
  /**
   * Array of tab routes
   */
  routes: TabRoute[];

  /**
   * Key of initially active tab
   */
  initialKey?: string;

  /**
   * Callback when tab changes
   */
  onTabChange?: (key: string) => void;

  /**
   * Primary color for active tab indicator and label
   */
  primaryColor?: string;

  /**
   * Tab variant style
   */
  variant?: TabVariant;

  /**
   * Additional style for the container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Additional style for the tab bar
   */
  tabBarStyle?: StyleProp<ViewStyle>;

  /**
   * Additional style for tab items
   */
  tabItemStyle?: StyleProp<ViewStyle>;

  /**
   * Additional style for tab text
   */
  tabTextStyle?: StyleProp<TextStyle>;

  /**
   * Additional style for active tab
   */
  activeTabStyle?: StyleProp<ViewStyle>;

  /**
   * Additional style for active tab text
   */
  activeTabTextStyle?: StyleProp<TextStyle>;

  /**
   * TestID for testing
   */
  testID?: string;
}
