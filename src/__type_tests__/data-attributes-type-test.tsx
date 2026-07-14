import type {DataAttributes} from '../utils/types';

const validAttrs: DataAttributes = {
    testid: 'MyComponent',
    custom: 'value',
    count: 42,
    enabled: true,
    // eslint-disable-next-line object-shorthand
    undefined: undefined,
};

// component-name is not allowed
// @ts-expect-error - component-name cannot be used, type is never
// eslint-disable-next-line object-shorthand
const invalidAttrs: DataAttributes = {
    'component-name': 'NotAllowed',
    testid: 'MyComponent',
};
