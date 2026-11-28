import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {ThemeContextProvider, Image} from '..';
import {makeTheme} from './test-utils';

const renderImage = (props: {onLoad?: () => void} = {}) =>
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Image src="using-vr.jpg" alt="Using VR" aspectRatio="16:9" width={200} {...props} />
        </ThemeContextProvider>
    );

test('Image does not render the SSR inline script when rendering on the client', () => {
    const {container} = renderImage();

    // The inline script is only useful in SSR html, to make the image visible before hydration.
    // Scripts rendered by a component are never executed on the client and React warns about them.
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.querySelector('script')).toBeNull();
});

test('Image is hidden while loading and becomes visible when loaded', () => {
    const onLoadSpy = jest.fn();
    renderImage({onLoad: onLoadSpy});

    const img = screen.getByRole('img', {name: 'Using VR'});
    expect(img.style.opacity).toBe('0');

    fireEvent.load(img);

    expect(img.style.opacity).toBe('1');
    expect(onLoadSpy).toHaveBeenCalledTimes(1);
});
