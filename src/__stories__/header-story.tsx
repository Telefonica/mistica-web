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
    title: string;
    description: string;
    small: boolean;
    isInverse: boolean;
    withExtraContent: boolean;
    sideBySideExtraOnDesktop: boolean;
    withBreadcrumbs: boolean;
    bleed: boolean;
    noPaddingY: boolean;
};

export const Default: StoryComponent<Args> = ({
    withHeader,
    isInverse,
    bleed,
    sideBySideExtraOnDesktop,
    withBreadcrumbs,
    pretitle,
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
                isInverse={isInverse}
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
                        <Header pretitle={pretitle} title={title} description={description} small={small} />
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
    isInverse: true,
    withExtraContent: true,
    sideBySideExtraOnDesktop: true,
    withBreadcrumbs: true,
    bleed: false,
    noPaddingY: false,
};
Default.argTypes = {
    pretitle: {if: {arg: 'withHeader', value: true}},
    title: {if: {arg: 'withHeader', value: true}},
    description: {if: {arg: 'withHeader', value: true}},
    small: {if: {arg: 'withHeader', value: true}},
    sideBySideExtraOnDesktop: {if: {arg: 'withExtraContent', value: true}},
};

export const RichTexts: StoryComponent = () => {
    const filler = ' - more text'.repeat(20);
    return (
        <HeaderLayout
            dataAttributes={{testid: 'header-layout'}}
            header={
                <Header
                    pretitle={{
                        text: `Pretitle (truncated to one line) ${filler}}`,
                        truncate: true,
                    }}
                    title="Title is always a plain string"
                />
            }
        />
    );
};
