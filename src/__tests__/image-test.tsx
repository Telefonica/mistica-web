import * as React from 'react';
import {render} from '@testing-library/react';
import {ThemeContextProvider, Image} from '..';
import {makeTheme} from './test-utils';

test('Image does not render the SSR inline script when rendering on the client', () => {
    const {container} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <Image src="using-vr.jpg" aspectRatio="16:9" width={200} />
        </ThemeContextProvider>
    );

    // The inline script is only useful in SSR html, to make the image visible before hydration.
    // When rendering on the client it must not be rendered: scripts rendered by a component are
    // never executed on the client and React warns about them.
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.querySelector('script')).toBeNull();

    // The image is still rendered, initially hidden while it loads (loading fallback is shown)
    // eslint-disable-next-line testing-library/no-node-access
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.style.opacity).toBe('0');
});
