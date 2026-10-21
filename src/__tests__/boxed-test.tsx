import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {ThemeContextProvider, Boxed, Text2} from '..';
import {makeTheme} from './test-utils';

const renderBoxed = (props: Partial<React.ComponentProps<typeof Boxed>> = {}) =>
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Boxed role="region" aria-label="boxed" {...props}>
                <Text2 regular>Content</Text2>
            </Boxed>
        </ThemeContextProvider>
    );

const getRadiusVar = (element: HTMLElement) => {
    const match = /--[\w-]+:\s*([^;]+);?/g;
    return [...(element.getAttribute('style') ?? '').matchAll(match)].map((m) => m[1]);
};

test('Boxed uses the skin container radius by default', () => {
    renderBoxed();
    expect(getRadiusVar(screen.getByRole('region', {name: 'boxed'}))).toContainEqual(
        expect.stringMatching(/^var\(--borderRadii-container/)
    );
});

test('Boxed converts numeric borderRadius to px', () => {
    renderBoxed({borderRadius: 24});
    expect(getRadiusVar(screen.getByRole('region', {name: 'boxed'}))).toContain('24px');
});

test('Boxed passes string borderRadius through', () => {
    renderBoxed({borderRadius: 'calc(8px + 16px)'});
    expect(getRadiusVar(screen.getByRole('region', {name: 'boxed'}))).toContain('calc(8px + 16px)');
});
