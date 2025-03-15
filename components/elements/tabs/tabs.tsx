import { Typography } from '@/components/elements/typography';
import { palette } from '@/themes';
import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { tabVariantPresets } from './tabs.presets';
import { TabSelectorProps } from './tabs.props';

// Memoize the tab content to prevent unnecessary re-renders
interface TabContentProps {
  Component: React.ComponentType<any>;
  props: Record<string, any>;
}

const TabContent: React.FC<TabContentProps> = memo(({ Component, props }) => {
  return <Component {...props} />;
});

const Tabs = React.forwardRef<View, TabSelectorProps>(
  (
    {
      routes,
      initialKey,
      onTabChange,
      primaryColor = palette.blue.primary,
      variant = 'default',
      style,
      tabBarStyle,
      tabItemStyle,
      tabTextStyle,
      activeTabStyle,
      activeTabTextStyle,
      testID,
    },
    ref
  ) => {
    const [activeKey, setActiveKey] = useState(initialKey || routes[0]?.key || '');

    const currentRoute = routes.find(route => route.key === activeKey);
    const ActiveComponent = currentRoute?.component || (() => null);
    const activeProps = currentRoute?.props || {};

    const presets = tabVariantPresets[variant];

    const handleTabPress = (key: string) => {
      if (key !== activeKey) {
        setActiveKey(key);
        if (onTabChange) {
          onTabChange(key);
        }
      }
    };

    useEffect(() => {
      if (initialKey && initialKey !== activeKey) {
        setActiveKey(initialKey);
      }
    }, [initialKey]);

    return (
      <View style={[presets.container, style]} testID={testID} ref={ref}>
        {/* Tab Bar */}
        <View style={[presets.tabBar, tabBarStyle]}>
          {routes.map(route => {
            const isActive = route.key === activeKey;
            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  presets.tabItem,
                  tabItemStyle,
                  isActive && [
                    presets.activeTabItem,
                    { borderBottomColor: primaryColor },
                    activeTabStyle,
                  ],
                ]}
                onPress={() => handleTabPress(route.key)}
                activeOpacity={0.7}
              >
                <Typography
                  style={[
                    presets.tabText,
                    tabTextStyle,
                    isActive && [
                      presets.activeTabText,
                      { color: primaryColor },
                      activeTabTextStyle,
                    ],
                  ]}
                >
                  {route.title}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content Area */}
        <View style={styles.contentContainer}>
          <TabContent Component={ActiveComponent} props={activeProps} />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 16,
  },
});

export default Tabs;
