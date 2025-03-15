import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import Colors from './colors';
import Shadows from './shadows';
import Spacing from './spacing';
import Typography from './typography';

const theme = {
  colors: Colors,
  spacing: Spacing,
  typography: Typography,
  shadows: Shadows,
};

const ThemeContext = createContext(theme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme() || 'light';

  const value = {
    ...theme,
    colors: {
      light: Colors.light,
      dark: Colors.dark,
      ...Colors[colorScheme],
    },
    isDark: colorScheme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
