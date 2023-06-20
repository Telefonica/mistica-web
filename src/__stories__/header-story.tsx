import * as React from 'react';
import {
    Header,
    HeaderLayout,
    Stack,
    NavigationBreadcrumbs,
    ResponsiveLayout,
    Placeholder,
    Text1,
    Text2,
} from '..';

const extraContentOptions = ['default', 'side', 'undefined'];

export default {
    title: 'Components/Headers/Header',
};

type Args = {
    pretitle: string;
    title: string;
    description: string;
    extraContent: string;
    isInverse: boolean;
    withBreadcrumbs: boolean;
    bleed: boolean;
};

export const Default: StoryComponent<Args> = ({
    pretitle,
    title,
    description,
    extraContent,
    isInverse,
    withBreadcrumbs,
    bleed,
}) => {
    return (
        <div data-testid="header-layout">
            <HeaderLayout
                isInverse={isInverse}
                bleed={bleed}
                sideBySideExtraOnDesktop={extraContent === 'side'}
                breadcrumbs={
                    withBreadcrumbs ? (
                        <NavigationBreadcrumbs
                            title="Bills"
                            breadcrumbs={[{title: 'Account', url: '/consumptions'}]}
                        />
                    ) : undefined
                }
                header={<Header pretitle={pretitle} title={title} description={description} />}
                extra={extraContent !== 'undefined' ? <Placeholder /> : undefined}
            />
        </div>
    );
};

Default.storyName = 'Header';
Default.argTypes = {
    extraContent: {
        options: extraContentOptions,
        control: {type: 'select'},
    },
};
Default.args = {
    pretitle: 'Your last bill',
    title: 'December bill is now available',
    description: 'This is a description',
    extraContent: 'default',
    isInverse: true,
    withBreadcrumbs: true,
    bleed: false,
};

type NoHeaderArgs = {
    extraSideBySide: boolean;
};

/**
 * The header is optional in order to allow webviews to delegate the header visualization to the surrounding native app.
 * For example, in Novum App, the Start tab's greeting is rendered nativelly in the apps and via web in desktop.
 */
export const NoHeader: StoryComponent<NoHeaderArgs> = ({extraSideBySide}) => {
    return (
        <Stack space={16}>
            <div data-testid="header-layout">
                <HeaderLayout
                    isInverse
                    sideBySideExtraOnDesktop={extraSideBySide}
                    breadcrumbs={
                        <NavigationBreadcrumbs
                            title="Bills"
                            breadcrumbs={[{title: 'Account', url: '/consumptions'}]}
                        />
                    }
                    extra={<Placeholder />}
                />
            </div>
            <ResponsiveLayout>
                <Stack space={16}>
                    <Text2 medium>Documentation:</Text2>
                    <Text1 regular>
                        The header is optional in order to allow webviews to delegate the header visualization
                        to the surrounding native app. For example, in Novum App, the Start tab's greeting is
                        rendered nativelly in the apps and via web in desktop.
                    </Text1>
                </Stack>
            </ResponsiveLayout>
        </Stack>
    );
};

NoHeader.storyName = 'Header layout with no header';
NoHeader.args = {
    extraSideBySide: true,
};

export const RichTexts: StoryComponent = () => {
    const filler = ' - more text'.repeat(20);
    return (
        <div data-testid="header-layout">
            <HeaderLayout
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
        </div>
    );
};
