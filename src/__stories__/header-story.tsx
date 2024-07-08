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

import type {HeadingType} from '../utils/types';

export default {
    title: 'Components/Headers/Header',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    withHeader: boolean;
    pretitle: string;
    pretitleAs: HeadingType;
    truncatePretitle: boolean;
    title: string;
    titleAs: HeadingType;
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
    pretitleAs,
    truncatePretitle,
    title,
    titleAs,
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
                            pretitleAs={pretitleAs}
                            pretitle={truncatePretitle ? {text: pretitle, truncate: true} : pretitle}
                            title={title}
                            titleAs={titleAs}
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
    pretitleAs: 'span',
    title: 'December bill is now available',
    titleAs: 'h2',
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
    pretitleAs: {
        if: {arg: 'withHeader'},
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
    title: {if: {arg: 'withHeader'}},
    titleAs: {
        if: {arg: 'withHeader'},
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
    description: {if: {arg: 'withHeader'}},
    small: {if: {arg: 'withHeader'}},
    sideBySideExtraOnDesktop: {if: {arg: 'withExtraContent'}},
    bleed: {if: {arg: 'withExtraContent'}},
};
