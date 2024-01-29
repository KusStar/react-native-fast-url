import performance from 'react-native-performance';
import { URL as fastURL } from 'react-native-fast-url';
import { URL as polyFillURL } from 'react-native-url-polyfill';

const bench = (tag: string, fn: () => void) => {
  performance.mark('start_' + tag);
  fn();
  performance.mark('end_' + tag);
  performance.measure(tag, 'start_' + tag, 'end_' + tag);
  console.log(tag, performance.getEntriesByName(tag));
  return performance.getEntriesByName(tag);
};

export const startBench = () => {
  const result = [];
  const url = 'https://example.com?a=1&b=2&c=3';
  for (const loop of [100, 1000, 10000, 100000]) {
    global.gc?.();

    const b2 = bench('fast URL x' + loop, () => {
      for (let i = 0; i < loop; i++) {
        new fastURL(url);
      }
    });

    global.gc?.();

    const b1 = bench('polyfill URL x' + loop, () => {
      for (let i = 0; i < loop; i++) {
        new polyFillURL(url);
      }
    });

    result.push({
      loop,
      b1: b1[0]?.duration!,
      b2: b2[0]?.duration!,
    });
  }

  return result;
};
