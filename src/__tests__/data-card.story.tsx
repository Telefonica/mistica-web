import * as React from 'react';
import {DataCard} from '../card-data';
import {makeTheme} from '../test-utils/theme';
import ThemeContextProvider from '../theme-context-provider';
import Tag from '../tag';
import Stack from '../stack';
import {Text2} from '../text';
import IconMobileDeviceRegular from '../generated/mistica-icons/icon-mobile-device-regular';
import IconStarFilled from '../generated/mistica-icons/icon-star-filled';
import IconStarRegular from '../generated/mistica-icons/icon-star-regular';
import {ButtonLink, ButtonPrimary} from '../button';

export const Scenario1 = (): JSX.Element => {
    const [closes, setCloses] = React.useState(0);
    const closeSpy = () => setCloses((count) => count + 1);
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                onClose={closeSpy}
                closeButtonLabel="custom close label"
                title="Title"
                description="Description"
            />
            <input type="hidden" data-testid="closes" value={closes} />
        </ThemeContextProvider>
    );
};
export const Scenario2 = (): JSX.Element => {
    return (
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
};
export const Scenario3 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );
};
export const Scenario4 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                pretitle="Pretitle"
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );
};
export const Scenario5 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                headline={<Tag type="promo">Headline</Tag>}
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );
};
export const Scenario6 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard href="https://example.org" subtitle="Subtitle" segregateTouchableContent />
        </ThemeContextProvider>
    );
};
export const Scenario7 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard href="https://example.org" description="Description" segregateTouchableContent />
        </ThemeContextProvider>
    );
};
export const Scenario8 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );
};
export const Scenario9 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard href="https://example.org" title="Title" description="Description" />
        </ThemeContextProvider>
    );
};
export const Scenario10 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                description="Description"
                segregateTouchableContent
            />
        </ThemeContextProvider>
    );
};
export const Scenario11 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                segregateTouchableContent
                touchableAriaLabel="Custom card label"
            />
        </ThemeContextProvider>
    );
};
export const Scenario12 = (): JSX.Element => {
    return (
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
};
export const Scenario13 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <DataCard
                href="https://example.org"
                title="Title"
                pretitle="Pretitle"
                description="Description"
            />
        </ThemeContextProvider>
    );
};
export const Scenario14 = (): JSX.Element => {
    return (
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
};

export const AccessibleName = ({
    action,
    snap = false,
    ...props
}: {action: 'href' | 'to' | 'onPress'; snap?: boolean} & Pick<
    React.ComponentProps<typeof DataCard>,
    'pretitleAs' | 'titleAs'
>): JSX.Element => (
    <DataCard
        {...props}
        {...(action === 'href'
            ? {href: 'https://example.org'}
            : action === 'to'
              ? {to: '/foo/bar'}
              : {onPress: () => {}})}
        {...(snap
            ? {size: 'snap' as const, subtitle: 'Subtitle'}
            : {headline: <Tag type="promo">Headline</Tag>, pretitle: 'Pretitle'})}
        title="Title"
        description="Description"
        slot={
            <Stack space={4}>
                <Text2 regular>Extra line 1</Text2>
                <Text2 regular>Extra line 2</Text2>
            </Stack>
        }
    />
);

export const SegregatedHeadings = (
    props: Pick<React.ComponentProps<typeof DataCard>, 'pretitleAs' | 'titleAs'>
): JSX.Element => (
    <DataCard
        {...props}
        href="https://example.org"
        headline={<Tag type="promo">Headline</Tag>}
        pretitle="Pretitle"
        title="Title"
        description="Description"
        segregateTouchableContent
    />
);
