import * as React from 'react';
import {PosterCard} from '../card';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Stack from '../stack';
import {Text2} from '../text';
import userEvent from '@testing-library/user-event';

test('PosterCard "href" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                href="https://example.org"
                isInverse
                headline="Headline"
                pretitle="Pretitle"
                title="Title"
                subtitle="Subtitle"
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

test('PosterCard "to" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                to="/foo/bar"
                isInverse
                headline="Headline"
                pretitle="Pretitle"
                title="Title"
                subtitle="Subtitle"
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

test('PosterCard "onPress" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                onPress={() => {}}
                isInverse
                headline="Headline"
                pretitle="Pretitle"
                title="Title"
                subtitle="Subtitle"
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

test('PosterCard onClose custom label', async () => {
    const closeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                onClose={closeSpy}
                closeButtonAccessibilityLabel="custom close label"
                onPress={() => {}}
                isInverse
                title="Title"
                description="Description"
            />
        </ThemeContextProvider>
    );

    const closeButton = await screen.findByRole('button', {name: 'custom close label'});
    await userEvent.click(closeButton);
    expect(closeSpy).toHaveBeenCalledTimes(1);
});
