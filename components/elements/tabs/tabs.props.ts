import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Route } from 'react-native-tab-view';

export interface TabRoute extends Route {
  key: string;
  title: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

export interface TabsProps {
  /**
   * List of tab routes to display
   */
  routes: TabRoute[];

  /**
   * Initial active tab index
   */
  initialIndex?: number;

  /**
   * Key of initial tab to display
   */
  initialKey?: string;

  /**
   * Callback when tab changes
   */
  onIndexChange?: (index: number) => void;

  /**
   * Callback when tab changes - provides key
   */
  onTabChange?: (key: string) => void;

  /**
   * Primary color for active tab indicator and label
   */
  primaryColor?: string;

  /**
   * Whether to use swipe gestures
   */
  swipeEnabled?: boolean;

  /**
   * Whether to animate tab transitions
   */
  animationEnabled?: boolean;

  /**
   * Whether tabs should take full height
   */
  fullHeight?: boolean;

  /**
   * Custom styles for the tab bar
   */
  tabBarStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styles for the tab label
   */
  tabLabelStyle?: StyleProp<TextStyle>;

  /**
   * Custom styles for the active tab label
   */
  activeTabLabelStyle?: StyleProp<TextStyle>;

  /**
   * Custom styles for the tab indicator
   */
  indicatorStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for the entire tab view
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional test ID
   */
  testID?: string;
}
