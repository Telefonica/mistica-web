import * as React from 'react';
import {DisplayMediaCard} from '../card';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Tag from '../tag';
import Stack from '../stack';
import {Text2} from '../text';
import userEvent from '@testing-library/user-event';

test('DisplayMediaCard "href" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DisplayMediaCard
                href="https://example.org"
                backgroundImage="https://source.unsplash.com/900x900/"
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

test('DisplayMediaCard "to" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DisplayMediaCard
                to="/foo/bar"
                backgroundImage="https://source.unsplash.com/900x900/"
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

test('DisplayMediaCard "onPress" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DisplayMediaCard
                onPress={() => {}}
                backgroundImage="https://source.unsplash.com/900x900/"
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

test('DisplayMediaCard onClose custom label', async () => {
    const closeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DisplayMediaCard
                onClose={closeSpy}
                closeButtonAccessibilityLabel="custom close label"
                title="Title"
                description="Description"
                backgroundImage="https://source.unsplash.com/900x900/"
            />
        </ThemeContextProvider>
    );

    const closeButton = await screen.findByRole('button', {name: 'custom close label'});
    await userEvent.click(closeButton);
    expect(closeSpy).toHaveBeenCalledTimes(1);
});
