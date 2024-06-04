import * as React from 'react';
import {DisplayMediaCard} from '../card';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Tag from '../tag';

test('DisplayMediaCard "href" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DisplayMediaCard
                href="https://example.org"
                headline={<Tag type="promo">Headline</Tag>}
                pretitle="Pretitle"
                title="Title"
                description="Description"
                backgroundImage="https://source.unsplash.com/900x900/"
            />
        </ThemeContextProvider>
    );

    await screen.findByRole('link', {name: 'Title Headline Pretitle Description'});
});

test('DisplayMediaCard "to" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DisplayMediaCard
                to="/foo/bar"
                headline={<Tag type="promo">Headline</Tag>}
                pretitle="Pretitle"
                title="Title"
                description="Description"
                backgroundImage="https://source.unsplash.com/900x900/"
            />
        </ThemeContextProvider>
    );

    await screen.findByRole('link', {name: 'Title Headline Pretitle Description'});
});

test('DisplayMediaCard "onPress" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DisplayMediaCard
                onPress={() => {}}
                headline={<Tag type="promo">Headline</Tag>}
                pretitle="Pretitle"
                title="Title"
                description="Description"
                backgroundImage="https://source.unsplash.com/900x900/"
            />
        </ThemeContextProvider>
    );

    await screen.findByRole('button', {name: 'Title Headline Pretitle Description'});
});
