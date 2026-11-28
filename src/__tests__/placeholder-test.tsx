import * as React from 'react';
import {render} from '@testing-library/react';
import {ThemeContextProvider, Placeholder} from '..';
import {makeTheme} from './test-utils';

test('Placeholder stays inside its declared height, so a scrollable parent does not scroll vertically', () => {
    const {container} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <Placeholder height={120} />
        </ThemeContextProvider>
    );

    // Black-box check of the behavior reported in the issue: the placeholder content used to
    // overflow the box by a couple of pixels, so a parent with non-visible overflow showed a
    // vertical scrollbar. jsdom has no layout engine, so this asserts the properties of the
    // rendered output that guarantee that behavior in a browser:
    // - the box keeps exactly the declared height
    // - the artwork fills the whole box
    // - the artwork does not sit on the baseline of a text line: an inline box is laid out like
    //   a letter, and the font descent reserved below the baseline is what made the content
    //   taller than the box. Any fix that takes the artwork out of that inline baseline layout
    //   (a block-level box, a different baseline alignment, ...) satisfies this test.
    // eslint-disable-next-line testing-library/no-node-access -- the artwork has no role or label to query by
    const artwork = container.querySelector('svg');
    expect(artwork).not.toBeNull();

    // eslint-disable-next-line testing-library/no-node-access -- the box has no role or label to query by either
    const box = artwork?.parentElement as HTMLElement;
    expect(getComputedStyle(box).height).toBe('120px');
    expect(artwork?.getAttribute('width')).toBe('100%');
    expect(artwork?.getAttribute('height')).toBe('100%');

    const artworkStyle = getComputedStyle(artwork as Element);
    const isInlineLevel = artworkStyle.display === '' || artworkStyle.display === 'inline';
    const sitsOnBaseline = artworkStyle.verticalAlign === '' || artworkStyle.verticalAlign === 'baseline';
    expect(isInlineLevel && sitsOnBaseline).toBe(false);
});
