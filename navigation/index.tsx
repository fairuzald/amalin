import { AlertProvider } from '@/components/elements/alert-confirmation';
import RegisterScreen from '@/screens/RegisterScreen';
import colors from '@/theme/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <AlertProvider>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'Main' : 'Register'}
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.light.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: colors.light.background,
            },
          }}
        >
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </AlertProvider>
    </NavigationContainer>
  );
}
