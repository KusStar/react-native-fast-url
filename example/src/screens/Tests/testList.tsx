import { registerURLSearchParamsTests } from './tests/urlSearchParamsTests';
import { registerURLTests } from './tests/urlTests';
import { type TestItemType } from './types';

export const TEST_LIST: Array<TestItemType> = [
  {
    description: 'URL tests',
    value: false,
    registrator: registerURLTests,
  },
  {
    description: 'URLSearchParams tests',
    value: false,
    registrator: registerURLSearchParamsTests,
  },
];
