import { useColorScheme } from 'react-native';

import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const useColorTheme = () => {
  const isDark = useColorScheme() === 'dark';
  return isDark ? DarkTheme : DefaultTheme;
};
