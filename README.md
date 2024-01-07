# react-native-fast-url

A Fast URL and URLSearchParams Polyfills for React Native.

Built in JSI and [ada](https://github.com/ada-url/ada), a WHATWG-compliant and fast URL parser adopted in Node.js since v18.16 for the best performance.

## Installation

```sh
npm install react-native-fast-url
yarn add react-native-fast-url
```

## Benchmarks

Compared to [react-native-url-polyfill](https://github.com/charpeni/react-native-url-polyfill/tree/main).

Run on M1 Pro Mac Catalyst, React Native v0.72.7.

|                           | loop 100        | loop 1000       | loop 10000      | loop 100000     |
|---------------------------|------------|------------|------------|------------|
| react-native-url-polyfill | 22ms       | 125ms      | 1225ms     | 12438ms    |
| react-native-fast-url     | 2ms        | 4ms        | 35ms       | 361ms      |
| fast-url is               | 12x faster | 35x faster | 36x faster | 34x faster |

Benchmark code in example: [bench.ts](./example/src/bench.ts)

This library(Ada) significantly outperforms `react-native-url-polyfill` in terms of speed, fully embracing the WHATWG URL standard and Unicode Standards. However, it's essential to note that Ada's bundle size is larger compared to `react-native-url-polyfill`. The binary size of the Ada C++ library is approximately **500KB**, while `react-native-url-polyfill` is a more compact **73.67KB**. The choice between the two should be based on your specific requirements and preferences.

## Usage

Import the polyfill in your entry file:

```js
// index.js
import 'react-native-fast-url/polyfill';
```

Or if you want to use it only in some files:

```js
import { URL, URLSearchParams } from 'react-native-fast-url';
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
