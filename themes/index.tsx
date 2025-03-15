import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import Colors from './colors';
import Shadows from './shadows';
import Spacing from './spacing';
import Typography from './typography';

const theme = {
  Colors,
  Spacing,
  Typography,
  Shadows,
};

const ThemeContext = createContext(theme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme() || 'light';

  const value = {
    ...theme,
    isDark: colorScheme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export * from './colors';
export * from './shadows';
export * from './spacing';
export * from './typography';
