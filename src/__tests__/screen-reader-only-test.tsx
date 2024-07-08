import * as React from 'react';
import {render, screen} from '@testing-library/react';
import ScreenReaderOnly from '../screen-reader-only';

test('Renders no wrapper if it has one single child', () => {
    render(
        <ScreenReaderOnly dataAttributes={{testid: 'test'}}>
            <span>Some text</span>
        </ScreenReaderOnly>
    );
    expect(screen.getByTestId('test').nodeName).toBe('SPAN');
});

test('Renders a wrapper if it has several children', () => {
    render(
        <ScreenReaderOnly dataAttributes={{testid: 'test'}}>
            <span>Some text</span>
            <p>Other text</p>
        </ScreenReaderOnly>
    );
    expect(screen.getByTestId('test').nodeName).toBe('DIV');
});
