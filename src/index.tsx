import { Platform, NativeModules } from 'react-native';

let BLOB_URL_PREFIX: any = null;

const { BlobModule } = NativeModules;

if (BlobModule && typeof BlobModule.BLOB_URI_SCHEME === 'string') {
  BLOB_URL_PREFIX = BlobModule.BLOB_URI_SCHEME + ':';
  if (typeof BlobModule.BLOB_URI_HOST === 'string') {
    BLOB_URL_PREFIX += `//${BlobModule.BLOB_URI_HOST}/`;
  }
}

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
    toStirng(): () => string;
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
    hash: string;
    toStirng(): () => string;
  };
};

const FastUrlModule: FastUrlNative = {
  URL: global.__FastUrl!.URL,
  URLSearchParams: global.__FastUrl!.URLSearchParams,
};

export class URLSearchParams {
  private _urlSearchParams: ReturnType<FastUrlNative['URLSearchParams']>;

  constructor(url?: string) {
    this._urlSearchParams = FastUrlModule.URLSearchParams(url ?? '');
  }

  append(key: string, value: string) {
    this._urlSearchParams.append(key, value);
  }

  delete(key: string) {
    this._urlSearchParams.delete(key);
  }

  entries() {
    return this._urlSearchParams.entries();
  }

  forEach(callback: (value: string, key: string) => void) {
    return this._urlSearchParams.forEach(callback);
  }

  get(key: string) {
    return this._urlSearchParams.get(key);
  }

  getAll(key: string) {
    return this._urlSearchParams.getAll(key);
  }

  has(key: string) {
    return this._urlSearchParams.has(key);
  }

  keys() {
    return this._urlSearchParams.keys();
  }

  set(key: string, value: string) {
    return this._urlSearchParams.set(key, value);
  }

  get size() {
    return this._urlSearchParams.size;
  }

  sort() {
    return this._urlSearchParams.sort();
  }

  values() {
    return this._urlSearchParams.values();
  }

  toString() {
    return this._urlSearchParams.toString();
  }
}

export class URL {
  private _url: ReturnType<FastUrlNative['URL']>;
  private _searchParams: URLSearchParams;

  static createObjectURL(blob: any) {
    if (BLOB_URL_PREFIX === null) {
      throw new Error('Cannot create URL for blob!');
    }
    return `${BLOB_URL_PREFIX}${blob.data.blobId}?offset=${blob.data.offset}&size=${blob.size}`;
  }

  static revokeObjectURL(_url: string) {
    // Do nothing.
  }

  constructor(url: string) {
    this._url = FastUrlModule.URL(url);
    this._searchParams = new URLSearchParams(this._url.search);
  }

  // URL is updated lazily to greatly improve performance when URLSearchParams is updated repeatedly.
  // If URLSearchParams has been modified, reflect that back into URL, without cascading back.
  // See https://github.com/nodejs/node/blob/64c6d97463c29bade4d6081683dab2cd7cda298d/lib/internal/url.js#L847
  private ensureSearchParamsUpdated() {
    this._url.search = this.convertSearchParamsToSearchString();
  }

  // See https://github.com/nodejs/node/blob/64c6d97463c29bade4d6081683dab2cd7cda298d/lib/internal/url.js#L842
  private convertSearchParamsToSearchString() {
    if (this._searchParams.size === 0) {
      return '';
    }
    return `?${this._searchParams.toString()}`;
  }

  get href() {
    this.ensureSearchParamsUpdated();
    return this._url.href;
  }

  set href(value: string) {
    this._url.href = value;
    this._searchParams = new URLSearchParams(this._url.search);
  }

  // Note: The 'origin' property is read-only, so no setter is provided.
  get origin() {
    return this._url.origin;
  }

  get protocol() {
    return this._url.protocol;
  }

  set protocol(value: string) {
    this._url.protocol = value;
  }

  get username() {
    return this._url.username;
  }

  set username(value: string) {
    this._url.username = value;
  }

  get password() {
    return this._url.password;
  }

  set password(value: string) {
    this._url.password = value;
  }

  get host() {
    return this._url.host;
  }

  set host(value: string) {
    this._url.host = value;
  }

  get hostname() {
    return this._url.hostname;
  }

  set hostname(value: string) {
    this._url.hostname = value;
  }

  get port() {
    return this._url.port;
  }

  set port(value: string) {
    this._url.port = value;
  }

  get pathname() {
    return this._url.pathname;
  }

  set pathname(value: string) {
    this._url.pathname = value;
  }

  get search() {
    this.ensureSearchParamsUpdated();
    return this._url.search;
  }

  set search(value: string) {
    this._searchParams = new URLSearchParams(value);
    this._url.search = value;
  }

  get searchParams() {
    return this._searchParams;
  }

  get hash() {
    return this._url.hash;
  }

  set hash(value: string) {
    this._url.hash = value;
  }

  toString() {
    this.ensureSearchParamsUpdated();
    return this._url.href;
  }

  toJSON() {
    this.ensureSearchParamsUpdated();
    return this._url.href;
  }
}

export function setupPolyfill() {
  (globalThis as any).URL = URL;
  (globalThis as any).URLSearchParams = URLSearchParams;
}

export default FastUrlModule;
