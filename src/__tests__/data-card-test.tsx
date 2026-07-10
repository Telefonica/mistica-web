import * as React from 'react';
import {DataCard} from '../card-data';
import {makeTheme} from './test-utils';
import {render, screen, within} from '@testing-library/react';
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

test.each`
    pretitleAs   | titleAs      | expectedTouchableText
    ${undefined} | ${undefined} | ${'Title'}
    ${'h1'}      | ${'h2'}      | ${'Pretitle'}
    ${'h2'}      | ${'h1'}      | ${'Title'}
    ${'h3'}      | ${'h3'}      | ${'Title'}
`(
    'segregateTouchableContent - touchable target with title and pretitle (pretitleAs=$pretitleAs, titleAs=$titleAs)',
    async ({pretitleAs, titleAs, expectedTouchableText}) => {
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
                    segregateTouchableContent
                />
            </ThemeContextProvider>
        );

        const link = await screen.findByRole('link', {name: expectedTouchableText});
        expect(link).toBeInTheDocument();
    }
);

test('segregateTouchableContent - touchable target when only title exists', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );

    const link = await screen.findByRole('link', {name: 'Title'});
    expect(link).toBeInTheDocument();
});

test('segregateTouchableContent - touchable target when only pretitle exists', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                pretitle="Pretitle"
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );

    const link = await screen.findByRole('link', {name: 'Pretitle'});
    expect(link).toBeInTheDocument();
});

test('segregateTouchableContent - touchable target when only headline exists', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                headline={<Tag type="promo">Headline</Tag>}
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );

    const link = await screen.findByRole('link', {name: 'Headline'});
    expect(link).toBeInTheDocument();
});

test('segregateTouchableContent - touchable target when only subtitle exists', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard href="https://example.org" subtitle="Subtitle" segregateTouchableContent />
        </ThemeContextProvider>
    );

    const link = await screen.findByRole('link', {name: 'Subtitle'});
    expect(link).toBeInTheDocument();
});

test('segregateTouchableContent - touchable target when only description exists', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard href="https://example.org" description="Description" segregateTouchableContent />
        </ThemeContextProvider>
    );

    const link = await screen.findByRole('link', {name: 'Description'});
    expect(link).toBeInTheDocument();
});

test('segregateTouchableContent - body content is NOT hidden when segregated', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );

    const link = await screen.findByRole('link', {name: 'Title'});
    expect(link).toBeInTheDocument();
});

test('segregateTouchableContent - body content IS aria-hidden when NOT segregated', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard href="https://example.org" title="Title" description="Description" />
        </ThemeContextProvider>
    );
    expect(screen.queryByRole('heading', {name: 'Title'})).not.toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Title'})).not.toBeInTheDocument();

    const touchableContent = screen.getByRole('text');
    expect(touchableContent).toBeInTheDocument();
});

test('segregateTouchableContent - only one link is rendered when segregated with text content', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('Title');
});

test('segregateTouchableContent - only one link is rendered when segregated with touchableAriaLabel and no text', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                segregateTouchableContent
                touchableAriaLabel="Custom card label"
            />
        </ThemeContextProvider>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName('Custom card label');
});

test('segregateTouchableContent - touchableAriaLabel creates a stretched touchable instead of text touchable', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                description="Description"
                segregateTouchableContent
                touchableAriaLabel="Custom label"
            />
        </ThemeContextProvider>
    );
    expect(screen.getByRole('link', {name: 'Custom label'})).toBeInTheDocument();
});

test('segregateTouchableContent - without segregateTouchableContent, the full card content is inside the touchable', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                pretitle="Pretitle"
                description="Description"
            />
        </ThemeContextProvider>
    );
    const link = await screen.findByRole('link');
    expect(within(link).getByText('Title')).toBeInTheDocument();
    expect(within(link).getByText('Pretitle')).toBeInTheDocument();
    expect(within(link).getByText('Description')).toBeInTheDocument();
});

test('segregateTouchableContent - tab order: card link, footer buttons, top actions, close button', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                description="Description"
                segregateTouchableContent
                onClose={() => {}}
                closeButtonLabel="Close"
                topActions={[
                    {
                        Icon: IconMobileDeviceRegular,
                        onPress: () => {},
                        label: 'Device Icon',
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
            />
        </ThemeContextProvider>
    );

    expect(document.body).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('link', {name: 'Title'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Button Primary'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Button Link'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Device Icon'})).toHaveFocus();

    await userEvent.tab();
    expect(await screen.findByRole('button', {name: 'Close'})).toHaveFocus();

    await userEvent.tab();
    expect(document.body).toHaveFocus();
});
