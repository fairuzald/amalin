import { palette } from '@/theme/colors';
import shadows from '@/theme/shadows';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { TabsProps } from './tabs.props';

export function Tabs({
  routes,
  initialIndex = 0,
  initialKey,
  onIndexChange,
  onTabChange,
  primaryColor = palette.blue.primary,
  swipeEnabled = true,
  animationEnabled = true,
  fullHeight = true,
  tabBarStyle,
  indicatorStyle,
  style,
  testID,
}: TabsProps) {
  const layout = useWindowDimensions();

  const computedInitialIndex = initialKey
    ? Math.max(
        0,
        routes.findIndex(route => route.key === initialKey)
      )
    : initialIndex;

  const [index, setIndex] = useState(computedInitialIndex);

  const renderScene = SceneMap(
    routes.reduce(
      (acc, route) => {
        acc[route.key] = () => {
          const Component = route.component;
          return <Component {...(route.props || {})} />;
        };
        return acc;
      },
      {} as Record<string, () => React.ReactNode>
    )
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={[styles.tabBar, tabBarStyle]}
      indicatorStyle={[styles.indicator, { backgroundColor: primaryColor }, indicatorStyle]}
    />
  );

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
    if (onTabChange && routes[newIndex]) {
      onTabChange(routes[newIndex].key);
    }
  };

  useEffect(() => {
    if (initialKey) {
      const newIndex = routes.findIndex(route => route.key === initialKey);
      if (newIndex >= 0 && newIndex !== index) {
        setIndex(newIndex);
      }
    } else if (initialIndex !== undefined && initialIndex !== index) {
      setIndex(initialIndex);
    }
  }, [initialIndex, initialKey, routes, index]);

  return (
    <View style={[fullHeight && styles.container, style]} testID={testID}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        swipeEnabled={swipeEnabled}
        animationEnabled={animationEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'white',
    ...shadows.small,
    elevation: 2,
  },
  indicator: {
    height: 3,
  },
});
