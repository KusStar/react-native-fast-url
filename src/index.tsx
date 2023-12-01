import { NativeModules, Platform } from 'react-native';

declare global {
  var __FastUrl: any | undefined;
}

const LINKING_ERROR =
  `The package 'react-native-fast-url' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const FastUrl = NativeModules.FastUrl
  ? NativeModules.FastUrl
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

if (global.__FastUrl == null) {
  const installed = FastUrl.install();

  if (installed) {
  } else {
    throw new Error(LINKING_ERROR);
  }
}

type FastUrlNative = {
  URLSearchParams: (url: string) => {
    append: (key: string, value: string) => void;
    delete: (key: string) => void;
    entries: () => IterableIterator<[string, string]>;
    forEach: (callback: (value: string, key: string) => void) => void;
    get: (key: string) => string | null;
    getAll: (key: string) => string[];
    has: (key: string) => boolean;
    keys: () => IterableIterator<string>;
    set: (key: string, value: string) => void;
    size: number;
    sort: () => void;
    values: () => IterableIterator<string>;
  };
  URL: (url: string) => {
    href: string;
    origin: string;
    protocol: string;
    username: string;
    password: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    searchParams: FastUrlNative['URLSearchParams'];
    hash: string;
  };
};

const FastUrlModule: FastUrlNative = {
  URL: global.__FastUrl!.URL,
  URLSearchParams: global.__FastUrl!.URLSearchParams,
};

export default FastUrlModule;
