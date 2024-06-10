import * as React from 'react';
import {MediaCard} from '../card';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Tag from '../tag';
import Stack from '../stack';
import Image from '../image';
import {Text2} from '../text';

test('MediaCard "href" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <MediaCard
                href="https://example.org"
                media={<Image src="https://source.unsplash.com/900x900/" />}
                headline={<Tag type="promo">Headline</Tag>}
                pretitle="Pretitle"
                subtitle="Subtitle"
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

    await screen.findByRole('link', {
        name: 'Title Headline Pretitle Subtitle Description Extra line 1Extra line 2',
    });
});

test('MediaCard "to" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <MediaCard
                to="/foo/bar"
                media={<Image src="https://source.unsplash.com/900x900/" />}
                headline={<Tag type="promo">Headline</Tag>}
                pretitle="Pretitle"
                subtitle="Subtitle"
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

    await screen.findByRole('link', {
        name: 'Title Headline Pretitle Subtitle Description Extra line 1Extra line 2',
    });
});

test('MediaCard "onPress" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <MediaCard
                onPress={() => {}}
                media={<Image src="https://source.unsplash.com/900x900/" />}
                headline={<Tag type="promo">Headline</Tag>}
                pretitle="Pretitle"
                subtitle="Subtitle"
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

    await screen.findByRole('button', {
        name: 'Title Headline Pretitle Subtitle Description Extra line 1Extra line 2',
    });
});
