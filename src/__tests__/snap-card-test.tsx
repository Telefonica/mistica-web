import * as React from 'react';
import {SnapCard} from '../card-data';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Stack from '../stack';
import {Text2} from '../text';

test('SnapCard "href" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SnapCard
                href="https://example.org"
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

    await screen.findByRole('link', {name: 'Title Subtitle Description Extra line 1Extra line 2'});
});

test('SnapCard "to" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SnapCard
                to="/foo/bar"
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

    await screen.findByRole('link', {name: 'Title Subtitle Description Extra line 1Extra line 2'});
});

test('SnapCard "onPress" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SnapCard
                onPress={() => {}}
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

    await screen.findByRole('button', {name: 'Title Subtitle Description Extra line 1Extra line 2'});
});
