const tintColorLight = '#0066CC';
const tintColorDark = '#4DA6FF';

export const palette = {
  // Base colors
  blue: {
    primary: '#00abc7',
    secondary: '#4DA6FF',
    accent: '#2980b9',
  },
  orange: {
    primary: '#f9a21a',
    secondary: '#F1C40F',
  },
  green: {
    success: '#27AE60',
    light: '#2ECC71',
  },
  yellow: {
    warning: '#F39C12',
    light: '#F1C40F',
  },
  red: {
    error: '#E74C3C',
  },
  gray: {
    darkest: '#333333',
    dark: '#666666',
    medium: '#999999',
    light: '#E1E8ED',
    lightest: '#F7F9FC',
  },
  white: '#FFFFFF',
  black: '#000000',
  shadows: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    heavy: 'rgba(0, 0, 0, 0.3)',
  },
};

export default {
  light: {
    primary: palette.blue.primary,
    secondary: palette.orange.primary,
    accent: palette.blue.accent,
    background: palette.gray.lightest,
    card: palette.white,
    text: palette.gray.darkest,
    subtext: palette.gray.dark,
    lightText: palette.gray.medium,
    border: palette.gray.light,
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    success: palette.green.success,
    warning: palette.yellow.warning,
    error: palette.red.error,
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: palette.blue.secondary,
    secondary: palette.blue.accent,
    accent: palette.blue.accent,
    background: '#121212',
    card: '#1E1E1E',
    text: palette.white,
    subtext: '#AAAAAA',
    lightText: '#888888',
    border: '#333333',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    success: palette.green.light,
    warning: palette.yellow.light,
    error: palette.red.error,
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};
