/* eslint-disable prettier/prettier */
import * as React from 'react';

import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { startBench } from './bench';
import { useColorTheme } from '../../components/useColorTheme';

export function Benchmarks() {
  const [result, setResult] = React.useState<{
    b1: number;
    b2: number;
    loop: number;
  }[]>();
  React.useEffect(() => {
    setTimeout(() => {
      setResult(startBench());
    }, 100)
  }, []);

  const theme = useColorTheme();

  const textStyle = {
    color: theme.colors.text,
  }

  return (
    <View style={styles.container}>
      {
        result ? result.map((it, index) =>
          <View key={index} style={{ marginBottom: 32 }}>
            <Text style={textStyle}>LOOP: {it.loop}</Text>
            <Text style={textStyle}>polyfill URL: {it.b1.toFixed(2)}ms</Text>
            <Text style={textStyle}>FastUrl: {it.b2.toFixed(2)}ms</Text>
            <Text style={textStyle}>FastUrl is {(it.b1 / it.b2).toFixed(2)}x faster</Text>
          </View>
        )
          :
          <View>
            <ActivityIndicator size={64} />
            <Text>Running benchmark...</Text>
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
