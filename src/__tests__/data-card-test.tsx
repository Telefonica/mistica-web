import * as React from 'react';
import {DataCard} from '../card';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Tag from '../tag';
import Stack from '../stack';
import {Text2} from '../text';

test('DataCard "href" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                headline={<Tag type="promo">Headline</Tag>}
                pretitle="Pretitle"
                title="Title"
                description="Description"
                extra={
                    <Stack space={4}>
                        <Text2 regular>Extra line 1</Text2>
                        <Text2 regular>Extra line 2</Text2>
                    </Stack>
                }
            />
        </ThemeContextProvider>
    );

    await screen.findByRole('link', {name: 'Title Headline Pretitle Description Extra line 1Extra line 2'});
});

test('DataCard "to" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                to="/foo/bar"
                headline={<Tag type="promo">Headline</Tag>}
                pretitle="Pretitle"
                title="Title"
                description="Description"
                extra={
                    <Stack space={4}>
                        <Text2 regular>Extra line 1</Text2>
                        <Text2 regular>Extra line 2</Text2>
                    </Stack>
                }
            />
        </ThemeContextProvider>
    );

    await screen.findByRole('link', {name: 'Title Headline Pretitle Description Extra line 1Extra line 2'});
});

test('DataCard "onPress" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                onPress={() => {}}
                headline={<Tag type="promo">Headline</Tag>}
                pretitle="Pretitle"
                title="Title"
                description="Description"
                extra={
                    <Stack space={4}>
                        <Text2 regular>Extra line 1</Text2>
                        <Text2 regular>Extra line 2</Text2>
                    </Stack>
                }
            />
        </ThemeContextProvider>
    );

    await screen.findByRole('button', {name: 'Title Headline Pretitle Description Extra line 1Extra line 2'});
});
