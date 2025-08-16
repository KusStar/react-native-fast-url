import { useColorScheme } from 'react-native';

import { DefaultTheme, DarkTheme, type Theme } from '@react-navigation/native';

export const useColorTheme = (): Theme => {
  const isDark = useColorScheme() === 'dark';
  return isDark ? DarkTheme : DefaultTheme;
};
