import * as React from 'react';
import {DataCard} from '../card-data';
import {makeTheme} from './test-utils';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import Tag from '../tag';
import Stack from '../stack';
import {Text2} from '../text';
import userEvent from '@testing-library/user-event';
import IconMobileDeviceRegular from '../generated/mistica-icons/icon-mobile-device-regular';
import IconStarFilled from '../generated/mistica-icons/icon-star-filled';
import IconStarRegular from '../generated/mistica-icons/icon-star-regular';
import {ButtonLink, ButtonPrimary} from '../button';

const titleFirst = 'Title Headline Pretitle Description Extra line 1Extra line 2';
const pretitleFirst = 'Pretitle Headline Title Description Extra line 1Extra line 2';

test.each`
    pretitleAs   | titleAs      | expectedLabel
    ${undefined} | ${undefined} | ${titleFirst}
    ${'h1'}      | ${'h2'}      | ${pretitleFirst}
    ${'h2'}      | ${'h1'}      | ${titleFirst}
`(
    'DataCard "href" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <DataCard
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
    'DataCard "to" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <DataCard
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
    'DataCard "onPress" label with pretitleAs={$pretitleAs} and titleAs={$titleAs}',
    async ({pretitleAs, titleAs, expectedLabel}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <DataCard
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

test('DataCard onClose custom label', async () => {
    const closeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
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

test('DataCard tab order', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                aria-label="Card touchable"
                onClose={() => {}}
                closeButtonLabel="Close label"
                onPress={() => {}}
                topActions={[
                    {
                        Icon: IconMobileDeviceRegular,
                        onPress: () => alert('Icon pressed'),
                        label: 'Device Icon',
                    },
                    {
                        checkedProps: {Icon: IconStarFilled, label: 'Star Checked'},
                        uncheckedProps: {Icon: IconStarRegular, label: 'Star Unchecked'},
                        defaultChecked: true,
                        onChange: () => {},
                    },
                ]}
                showFooter
                buttonPrimary={
                    <ButtonPrimary onPress={() => {}} small>
                        Button Primary
                    </ButtonPrimary>
                }
                buttonLink={
                    <ButtonLink onPress={() => {}} small>
                        Button Link
                    </ButtonLink>
                }
                title="Title"
                description="Description"
            />
        </ThemeContextProvider>
    );

    expect(document.body).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Card touchable'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Button Primary'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Button Link'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Device Icon'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Star Checked'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Close label'})).toHaveFocus();

    await userEvent.tab();
    expect(document.body).toHaveFocus();
});
