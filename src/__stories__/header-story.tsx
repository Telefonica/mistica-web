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
    Tag,
} from '..';

import type {HeadingType} from '../utils/types';
import type {TagType} from '..';

export default {
    title: 'Components/Headers/Header',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    header: boolean;
    headlineType: TagType;
    headline: string;
    pretitle: string;
    pretitleAs: HeadingType;
    truncatePretitle: boolean;
    title: string;
    titleAs: HeadingType;
    description: string;
    small: boolean;
    inverse: boolean;
    extra: boolean;
    sideBySideExtraOnDesktop: boolean;
    breadcrumbs: boolean;
    bleed: boolean;
    noPaddingY: boolean;
};

export const Default: StoryComponent<Args> = ({
    header,
    inverse,
    bleed,
    sideBySideExtraOnDesktop,
    breadcrumbs,
    headlineType,
    headline,
    pretitle,
    pretitleAs,
    truncatePretitle,
    title,
    titleAs,
    description,
    small,
    extra,
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
                    breadcrumbs ? (
                        <NavigationBreadcrumbs
                            title="Bills"
                            breadcrumbs={[{title: 'Account', url: '/consumptions'}]}
                        />
                    ) : undefined
                }
                header={
                    header ? (
                        <Header
                            pretitleAs={pretitleAs}
                            headline={<Tag type={headlineType}>{headline}</Tag>}
                            pretitle={truncatePretitle ? {text: pretitle, truncate: true} : pretitle}
                            title={title}
                            titleAs={titleAs}
                            description={description}
                            small={small}
                        />
                    ) : undefined
                }
                extra={extra ? <Placeholder /> : undefined}
            />
            <ResponsiveLayout>
                <Callout
                    asset={<IconInformationUserLight />}
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
    header: true,
    headlineType: 'promo',
    headline: 'Priority',
    pretitle: 'Your last bill',
    pretitleAs: 'span',
    title: 'December bill is now available',
    titleAs: 'h2',
    description: 'This is a description',
    small: false,
    truncatePretitle: false,
    inverse: false,
    breadcrumbs: true,
    noPaddingY: false,
    extra: true,
    sideBySideExtraOnDesktop: true,
    bleed: false,
};

Default.argTypes = {
    headlineType: {
        options: ['promo', 'active', 'inactive', 'success', 'warning', 'error', 'info'],
        control: {type: 'select'},
        if: {arg: 'header'},
    },
    headline: {if: {arg: 'header'}},
    pretitle: {if: {arg: 'header'}},
    pretitleAs: {
        if: {arg: 'header'},
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
    title: {if: {arg: 'header'}},
    titleAs: {
        if: {arg: 'header'},
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
        control: {type: 'select'},
    },
    description: {if: {arg: 'header'}},
    small: {if: {arg: 'header'}},
    sideBySideExtraOnDesktop: {if: {arg: 'extra'}},
    bleed: {if: {arg: 'extra'}},
};
