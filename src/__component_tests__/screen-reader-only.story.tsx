import * as React from 'react';
import ScreenReaderOnly from '../screen-reader-only';

export const SingleChild = (): JSX.Element => (
    <ScreenReaderOnly dataAttributes={{testid: 'test'}}>
        <span>Some text</span>
    </ScreenReaderOnly>
);
export const MultipleChildren = (): JSX.Element => (
    <ScreenReaderOnly dataAttributes={{testid: 'test'}}>
        <span>Some text</span>
        <p>Other text</p>
    </ScreenReaderOnly>
);
