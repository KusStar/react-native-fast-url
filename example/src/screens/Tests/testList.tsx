import { registerURLSearchParamsTests } from './tests/urlSearchParamsTests';
import { registerURLTests } from './tests/urlTests';
import { type TestItemType } from './types';

export const TEST_LIST: Array<TestItemType> = [
  {
    description: 'URL tests',
    value: true,
    registrator: registerURLTests,
  },
  {
    description: 'URLSearchParams tests',
    value: true,
    registrator: registerURLSearchParamsTests,
  },
];
