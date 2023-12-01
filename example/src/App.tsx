/* eslint-disable prettier/prettier */
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { URL } from 'react-native-fast-url';

export default function App() {
  React.useEffect(() => {
    const url = new URL('https://google.com?a=1&b=2');
    const params = url.searchParams
    console.log(
      'URLSearchParams("a=1&b=2")',
      '\n',
      params,
      '\n size',
      params.size,
      '\n get a',
      params.get('a'),
      '\n entris',
      params.entries(),
      '\n keys:',
      params.keys(),
      '\n values:',
      params.values(),
      '\n toString',
      params.toString(),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
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
