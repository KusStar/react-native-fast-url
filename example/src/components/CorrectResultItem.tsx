import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';

type CorrectResultItemProps = {
  description: string;
};

export const CorrectResultItem: React.FC<CorrectResultItemProps> = ({
  description,
}: CorrectResultItemProps) => {
  const emoji = '✅';
  const fullText = emoji + ' [' + description + ']';

  return (
    <View style={styles.itemContainer}>
      <Text style={[styles.text]}>{fullText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  itemContainer: {
    borderWidth: 1,
    margin: 10,
    marginRight: 55,
    marginBottom: 0,
    flexDirection: 'column',
    borderRadius: 5,
    padding: 5,
  },
  text: {
    flexShrink: 1,
  },
});
