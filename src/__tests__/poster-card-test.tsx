import * as React from 'react';
import {PosterCard} from '../card';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';

test('PosterCard "href" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                headline="Headline"
                pretitle="Pretitle"
                title="Title"
                subtitle="Subtitle"
                description="Description"
                href="https://example.org"
            />
        </ThemeContextProvider>
    );

    expect(
        await screen.findByRole('link', {name: 'Title Headline Pretitle Subtitle Description'})
    ).toBeInTheDocument();
});

test('PosterCard "to" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                headline="Headline"
                pretitle="Pretitle"
                title="Title"
                subtitle="Subtitle"
                description="Description"
                to="/foo/bar"
            />
        </ThemeContextProvider>
    );

    expect(
        await screen.findByRole('link', {name: 'Title Headline Pretitle Subtitle Description'})
    ).toBeInTheDocument();
});

test('PosterCard "onPress" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                headline="Headline"
                pretitle="Pretitle"
                title="Title"
                subtitle="Subtitle"
                description="Description"
                onPress={() => {}}
            />
        </ThemeContextProvider>
    );

    expect(
        await screen.findByRole('button', {name: 'Title Headline Pretitle Subtitle Description'})
    ).toBeInTheDocument();
});
