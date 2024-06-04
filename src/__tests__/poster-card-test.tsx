import * as React from 'react';
import {PosterCard} from '../card';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';

test('PosterCard "href" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                href="https://example.org"
                headline="Headline"
                pretitle="Pretitle"
                title="Title"
                subtitle="Subtitle"
                description="Description"
                isInverse
            />
        </ThemeContextProvider>
    );

    await screen.findByRole('link', {name: 'Title Headline Pretitle Subtitle Description'});
});

test('PosterCard "to" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                to="/foo/bar"
                headline="Headline"
                pretitle="Pretitle"
                title="Title"
                subtitle="Subtitle"
                description="Description"
                isInverse
            />
        </ThemeContextProvider>
    );

    await screen.findByRole('link', {name: 'Title Headline Pretitle Subtitle Description'});
});

test('PosterCard "onPress" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                onPress={() => {}}
                headline="Headline"
                pretitle="Pretitle"
                title="Title"
                subtitle="Subtitle"
                description="Description"
                isInverse
            />
        </ThemeContextProvider>
    );

    await screen.findByRole('button', {name: 'Title Headline Pretitle Subtitle Description'});
});
