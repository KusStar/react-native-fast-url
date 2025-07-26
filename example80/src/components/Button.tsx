import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useColorTheme } from './useColorTheme';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
}: ButtonProps) => {
  const theme = useColorTheme();
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          {
            borderColor: theme.colors.text,
          },
        ]}
        onPress={onPress}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d1e8ff',
    padding: 10,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
});
