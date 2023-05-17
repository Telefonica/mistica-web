import * as React from 'react';
import {render} from '@testing-library/react';
import ScreenReaderOnly from '../screen-reader-only';

test('Renders no wrapper if it has one single child', () => {
    const {asFragment} = render(
        <ScreenReaderOnly>
            <span>Some text</span>
        </ScreenReaderOnly>
    );
    expect(asFragment().firstChild?.nodeName).toBe('SPAN');
});

test('Renders a wrapper if it has several children', () => {
    const {asFragment} = render(
        <ScreenReaderOnly>
            <span>Some text</span>
            <p>Other text</p>
        </ScreenReaderOnly>
    );
    expect(asFragment().firstChild?.nodeName).toBe('DIV');
});
