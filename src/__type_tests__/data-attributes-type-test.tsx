import type {DataAttributes} from '../utils/types';

const validAttrs: DataAttributes = {
    testid: 'MyComponent',
    custom: 'value',
    count: 42,
    enabled: true,
    undefined: undefined,
};

// component-name is not allowed
// @ts-expect-error - component-name cannot be used
const invalidAttrs: DataAttributes = {
    'component-name': 'NotAllowed',
    testid: 'MyComponent',
};
