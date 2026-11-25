import * as React from 'react';
import {render} from '@testing-library/react';
import {ThemeContextProvider, Placeholder} from '..';
import {makeTheme} from './test-utils';

test('Placeholder svg is displayed as block so the component obeys the declared height', () => {
    const {container} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <Placeholder height={120} />
        </ThemeContextProvider>
    );

    // eslint-disable-next-line testing-library/no-node-access -- the svg has no role or label to query by
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.style.display).toBe('block');
});
