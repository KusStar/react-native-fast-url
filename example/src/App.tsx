/* eslint-disable prettier/prettier */
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import FastUrl from 'react-native-fast-url';

const pretty = (obj: any) => JSON.stringify(obj, null, 2);

export default function App() {
  React.useEffect(() => {
    console.log(
      'URL("https://google.com")',
      pretty(FastUrl.URL('https://google.com?a=1&b=2'))
    );
    const params = FastUrl.URLSearchParams("a=1&b=2")
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
