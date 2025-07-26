import * as React from 'react';
import { StyleSheet, Text as TextNative, type TextStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
};

export function Text({ children, style }: Props) {
  const styles = React.useMemo(() => {
    const res: TextStyle[] = [textStyles.text];
    if (style) {
      res.concat(style);
    }
    return res;
  }, [style]);

  return <TextNative style={styles}>{children}</TextNative>;
}

const textStyles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
