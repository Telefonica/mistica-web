import * as React from 'react';
import {NakedCard, SmallNakedCard} from '../card-naked';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Tag from '../tag';
import Stack from '../stack';
import Image from '../image';
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
    'NakedCard "href" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <NakedCard
                    href="https://example.org"
                    media={<Image src="https://source.unsplash.com/900x900/" />}
                    headline={<Tag type="promo">Headline</Tag>}
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
    'NakedCard "to" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <NakedCard
                    to="/foo/bar"
                    media={<Image src="https://source.unsplash.com/900x900/" />}
                    headline={<Tag type="promo">Headline</Tag>}
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
    'NakedCard "onPress" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <NakedCard
                    onPress={() => {}}
                    media={<Image src="https://source.unsplash.com/900x900/" />}
                    headline={<Tag type="promo">Headline</Tag>}
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

test('NakedCard onClose custom label', async () => {
    const closeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <NakedCard
                onClose={closeSpy}
                closeButtonLabel="custom close label"
                title="Title"
                description="Description"
                media={<Image src="https://source.unsplash.com/900x900/" />}
            />
        </ThemeContextProvider>
    );

    const closeButton = await screen.findByRole('button', {name: 'custom close label'});
    await userEvent.click(closeButton);
    expect(closeSpy).toHaveBeenCalledTimes(1);
});

test('SmallNakedCard "href" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SmallNakedCard
                href="https://example.org"
                media={<Image src="https://source.unsplash.com/900x900/" />}
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

test('SmallNakedCard "to" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SmallNakedCard
                to="/foo/bar"
                media={<Image src="https://source.unsplash.com/900x900/" />}
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

test('SmallNakedCard "onPress" label', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SmallNakedCard
                onPress={() => {}}
                media={<Image src="https://source.unsplash.com/900x900/" />}
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
