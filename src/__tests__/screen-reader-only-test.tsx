import * as React from 'react';
import {render} from '@testing-library/react';
import ScreenReaderOnly from '../screen-reader-only';

test('Renders no wrapper if it has one single child', () => {
    const {asFragment} = render(
        <ScreenReaderOnly>
            <span>Some text</span>
        </ScreenReaderOnly>
    );
    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <span
            class="screen-reader-only_screenReaderOnly__gwdgwo1 screen-reader-only__gwdgwo0 sprinkles_paddingTop_0__1y2v1nf6b sprinkles_paddingBottom_0__1y2v1nf6p sprinkles_paddingLeft_0__1y2v1nf73 sprinkles_paddingRight_0__1y2v1nf7h sprinkles_position_absolute__1y2v1nf5k sprinkles_overflow_hidden__1y2v1nfa4 sprinkles_border_none__1y2v1nf9m"
          >
            Some text
          </span>
        </DocumentFragment>
    `);
});

test('Renders a wrapper if it has several children', () => {
    const {asFragment} = render(
        <ScreenReaderOnly>
            <span>Some text</span>
            <p>Other text</p>
        </ScreenReaderOnly>
    );
    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="screen-reader-only_screenReaderOnly__gwdgwo1 screen-reader-only__gwdgwo0 sprinkles_paddingTop_0__1y2v1nf6b sprinkles_paddingBottom_0__1y2v1nf6p sprinkles_paddingLeft_0__1y2v1nf73 sprinkles_paddingRight_0__1y2v1nf7h sprinkles_position_absolute__1y2v1nf5k sprinkles_overflow_hidden__1y2v1nfa4 sprinkles_border_none__1y2v1nf9m"
          >
            <span>
              Some text
            </span>
            <p>
              Other text
            </p>
          </div>
        </DocumentFragment>
    `);
});
