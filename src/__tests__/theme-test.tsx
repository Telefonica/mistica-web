import * as React from 'react';
import {getMisticaLinkComponent} from '../theme';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

import type {ThemeConfig} from '../theme';

test('getMisicaLinkComponent detects forwardRefs as components', () => {
    const fr = React.forwardRef(() => <></>);
    expect(getMisticaLinkComponent(fr as ThemeConfig['Link'])).toBe(fr);
});

test('getMisicaLinkComponent detects function components as components', () => {
    const fn = () => <></>;
    expect(getMisticaLinkComponent(fn as ThemeConfig['Link'])).toBe(fn);
});

test('getMisicaLinkComponent uses given component with type', async () => {
    const Component = ({children, href}: any) => <a href={href}>{children}</a>;
    const Link = getMisticaLinkComponent({Component, type: 'Next13'});

    render(<Link to="#">any text</Link>);

    expect(await screen.findByText('any text')).toMatchInlineSnapshot(`
        <a
          href="#"
        >
          any text
        </a>
    `);
});

test('getMisticaLinkComponent uses given component with type Next16', async () => {
    const Component = ({children, href}: any) => <a href={href}>{children}</a>;
    const Link = getMisticaLinkComponent({Component, type: 'Next16'});

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Link to="#">any text</Link>
        </ThemeContextProvider>
    );

    expect(await screen.findByText('any text')).toMatchInlineSnapshot(`
        <a
          href="#"
        >
          any text
        </a>
    `);
});
