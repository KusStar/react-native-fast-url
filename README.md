# react-native-fast-url

Fast URL, URLSearchParams Polyfill for React Native.

Built in JSI and use [ada](https://github.com/ada-url/ada) as URL parser for best performance.

## Installation

```sh
npm install react-native-fast-url
yarn add react-native-fast-url
```

## Benchmarks

Compared to [react-native-url-polyfill](https://github.com/charpeni/react-native-url-polyfill/tree/main).

Run on M1 Pro Mac Catalyst, React Native 0.67.6

|                           | loop 100        | loop 1000       | loop 10000      | loop 100000     |
|---------------------------|------------|------------|------------|------------|
| react-native-url-polyfill | 22ms       | 125ms      | 1225ms     | 12438ms    |
| react-native-fast-url     | 2ms        | 4ms        | 35ms       | 361ms      |
| fast-url is               | 12x faster | 35x faster | 36x faster | 34x faster |

## Usage

### Polyfill

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
