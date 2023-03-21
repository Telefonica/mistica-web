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
import {useTextField, useCheckbox} from './helpers';

export default {
    title: 'Components/Headers/Header',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    bleedValue: boolean;
};

export const Default: StoryComponent<Args> = ({bleedValue}) => {
    const [pretitle, pretitleTextField] = useTextField('Pretitle', 'Your last bill');
    const [title, titleTextField] = useTextField('Title', 'December bill is now available');
    const [description, descriptionTextField] = useTextField('Description', 'This is a description');
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', true);
    const [withExtraContent, extraContentCheckbox] = useCheckbox('With extra content', true);
    const [extraSideBySide, extraSideBySideCheckbox] = useCheckbox(
        'Extra content placed on the right in desktop',
        true
    );
    const [withBreadcrumbs, breadcrumbsCheckbox] = useCheckbox('With breadcrumbs (desktop only)', true);
    const [bleed, bleedCheckbox] = useCheckbox('Bleed', bleedValue || false);
    return (
        <Stack space={16}>
            <div data-testid="header-layout">
                <HeaderLayout
                    isInverse={isInverse}
                    bleed={bleed}
                    sideBySideExtraOnDesktop={extraSideBySide}
                    breadcrumbs={
                        withBreadcrumbs ? (
                            <NavigationBreadcrumbs
                                title="Bills"
                                breadcrumbs={[{title: 'Account', url: '/consumptions'}]}
                            />
                        ) : undefined
                    }
                    header={<Header pretitle={pretitle} title={title} description={description} />}
                    extra={withExtraContent ? <Placeholder /> : undefined}
                />
            </div>
            <ResponsiveLayout>
                <Stack space={16}>
                    {breadcrumbsCheckbox}
                    {pretitleTextField}
                    {titleTextField}
                    {descriptionTextField}
                    {bleedCheckbox}
                    {inverseCheckbox}
                    {extraContentCheckbox}
                    {extraSideBySideCheckbox}
                </Stack>
            </ResponsiveLayout>
        </Stack>
    );
};

Default.storyName = 'Header';

/**
 * The header is optional in order to allow webviews to delegate the header visualization to the surrounding native app.
 * For example, in Novum App, the Start tab's greeting is rendered nativelly in the apps and via web in desktop.
 */
export const NoHeader: StoryComponent = () => {
    const [extraSideBySide, extraSideBySideCheckbox] = useCheckbox(
        'Extra content placed on the right in desktop',
        true
    );
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
                    {extraSideBySideCheckbox}
                </Stack>
            </ResponsiveLayout>
        </Stack>
    );
};

NoHeader.storyName = 'Header layout with no header';

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
