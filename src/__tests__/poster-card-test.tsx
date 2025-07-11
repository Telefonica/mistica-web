import * as React from 'react';
import {PosterCard} from '../card-cover';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Stack from '../stack';
import {Text2} from '../text';
import userEvent from '@testing-library/user-event';

const titleFirst = 'Title Headline Pretitle Description Extra line 1Extra line 2';
const pretitleFirst = 'Pretitle Headline Title Description Extra line 1Extra line 2';

test.each`
    pretitleAs   | titleAs      | expectedLabel
    ${undefined} | ${undefined} | ${titleFirst}
    ${'h1'}      | ${'h2'}      | ${pretitleFirst}
    ${'h2'}      | ${'h1'}      | ${titleFirst}
`(
    'PosterCard "href" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <PosterCard
                    href="https://example.org"
                    isInverse
                    headline="Headline"
                    pretitle="Pretitle"
                    pretitleAs={pretitleAs}
                    title="Title"
                    titleAs={titleAs}
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

        await screen.findByRole('link', {name: expectedLabel});
    }
);

test.each`
    pretitleAs   | titleAs      | expectedLabel
    ${undefined} | ${undefined} | ${titleFirst}
    ${'h1'}      | ${'h2'}      | ${pretitleFirst}
    ${'h2'}      | ${'h1'}      | ${titleFirst}
`(
    'PosterCard "to" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <PosterCard
                    to="/foo/bar"
                    isInverse
                    headline="Headline"
                    pretitle="Pretitle"
                    pretitleAs={pretitleAs}
                    title="Title"
                    titleAs={titleAs}
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

        await screen.findByRole('link', {name: expectedLabel});
    }
);

test.each`
    pretitleAs   | titleAs      | expectedLabel
    ${undefined} | ${undefined} | ${titleFirst}
    ${'h1'}      | ${'h2'}      | ${pretitleFirst}
    ${'h2'}      | ${'h1'}      | ${titleFirst}
`(
    'PosterCard "onPress" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <PosterCard
                    onPress={() => {}}
                    isInverse
                    headline="Headline"
                    pretitle="Pretitle"
                    pretitleAs={pretitleAs}
                    title="Title"
                    titleAs={titleAs}
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

        await screen.findByRole('button', {name: expectedLabel});
    }
);

test('PosterCard onClose custom label', async () => {
    const closeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PosterCard
                onClose={closeSpy}
                closeButtonLabel="custom close label"
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
