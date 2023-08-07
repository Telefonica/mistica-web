import * as React from 'react';
import {
    Header,
    HeaderLayout,
    Stack,
    NavigationBreadcrumbs,
    ResponsiveLayout,
    Placeholder,
    Callout,
    IconInformationUserLight,
} from '..';

export default {
    title: 'Components/Headers/Header',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    withHeader: boolean;
    pretitle: string;
    truncatePretitle: boolean;
    title: string;
    description: string;
    small: boolean;
    inverse: boolean;
    withExtraContent: boolean;
    sideBySideExtraOnDesktop: boolean;
    withBreadcrumbs: boolean;
    bleed: boolean;
    noPaddingY: boolean;
};

export const Default: StoryComponent<Args> = ({
    withHeader,
    inverse,
    bleed,
    sideBySideExtraOnDesktop,
    withBreadcrumbs,
    pretitle,
    truncatePretitle,
    title,
    description,
    small,
    withExtraContent,
    noPaddingY,
}) => {
    return (
        <Stack space={16}>
            <HeaderLayout
                dataAttributes={{testid: 'header-layout'}}
                isInverse={inverse}
                bleed={bleed}
                sideBySideExtraOnDesktop={sideBySideExtraOnDesktop}
                noPaddingY={noPaddingY}
                breadcrumbs={
                    withBreadcrumbs ? (
                        <NavigationBreadcrumbs
                            title="Bills"
                            breadcrumbs={[{title: 'Account', url: '/consumptions'}]}
                        />
                    ) : undefined
                }
                header={
                    withHeader ? (
                        <Header
                            pretitle={truncatePretitle ? {text: pretitle, truncate: true} : pretitle}
                            title={title}
                            description={description}
                            small={small}
                        />
                    ) : undefined
                }
                extra={withExtraContent ? <Placeholder /> : undefined}
            />
            <ResponsiveLayout>
                <Callout
                    icon={<IconInformationUserLight />}
                    title="Note:"
                    description="A HeaderLayout can be rendered without a Header (in webviews) to allow delegating the
                        header visualization to the native app. For example, in Novum App (Mi Movistar, Meu
                        Vivo, etc), the Start tab's greeting is rendered nativelly in the apps."
                />
            </ResponsiveLayout>
        </Stack>
    );
};

Default.storyName = 'Header';
Default.args = {
    withHeader: true,
    pretitle: 'Your last bill',
    title: 'December bill is now available',
    description: 'This is a description',
    small: false,
    truncatePretitle: false,
    inverse: true,
    withBreadcrumbs: true,
    noPaddingY: false,
    withExtraContent: true,
    sideBySideExtraOnDesktop: true,
    bleed: false,
};

Default.argTypes = {
    pretitle: {if: {arg: 'withHeader'}},
    title: {if: {arg: 'withHeader'}},
    description: {if: {arg: 'withHeader'}},
    small: {if: {arg: 'withHeader'}},
    sideBySideExtraOnDesktop: {if: {arg: 'withExtraContent'}},
    bleed: {if: {arg: 'withExtraContent'}},
};
