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
            class="screen-reader-only_screenReaderOnly__gwdgwo1 screen-reader-only__gwdgwo0 sprinkles_paddingTop_0__1y2v1nf65 sprinkles_paddingBottom_0__1y2v1nf6j sprinkles_paddingLeft_0__1y2v1nf6x sprinkles_paddingRight_0__1y2v1nf7b sprinkles_position_absolute__1y2v1nf5e sprinkles_overflow_hidden__1y2v1nf9o sprinkles_border_none__1y2v1nf9g"
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
            class="screen-reader-only_screenReaderOnly__gwdgwo1 screen-reader-only__gwdgwo0 sprinkles_paddingTop_0__1y2v1nf65 sprinkles_paddingBottom_0__1y2v1nf6j sprinkles_paddingLeft_0__1y2v1nf6x sprinkles_paddingRight_0__1y2v1nf7b sprinkles_position_absolute__1y2v1nf5e sprinkles_overflow_hidden__1y2v1nf9o sprinkles_border_none__1y2v1nf9g"
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
