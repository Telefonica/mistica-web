import type {DataAttributes} from '../utils/types';

const validAttrs: DataAttributes = {
    testid: 'MyComponent',
    custom: 'value',
    count: 42,
    enabled: true,
    // eslint-disable-next-line object-shorthand
    undefined: undefined,
};

// component-name is allowed
const validAttrsWithComponentName: DataAttributes = {
    'component-name': 'MyComponent',
    testid: 'MyComponent',
};
