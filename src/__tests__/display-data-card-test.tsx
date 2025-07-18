import * as React from 'react';
import {DisplayDataCard} from '../card-data';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Tag from '../tag';
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
    'DisplayDataCard "href" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <DisplayDataCard
                    href="https://example.org"
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
    'DisplayDataCard "to" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <DisplayDataCard
                    to="/foo/bar"
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
    'DisplayDataCard "onPress" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <DisplayDataCard
                    onPress={() => {}}
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

test('DisplayDataCard onClose custom label', async () => {
    const closeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DisplayDataCard
                onClose={closeSpy}
                closeButtonLabel="custom close label"
                title="Title"
                description="Description"
            />
        </ThemeContextProvider>
    );

    const closeButton = await screen.findByRole('button', {name: 'custom close label'});
    await userEvent.click(closeButton);
    expect(closeSpy).toHaveBeenCalledTimes(1);
});
