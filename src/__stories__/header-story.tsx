import * as React from 'react';
import {Header, HeaderLayout, Stack, NavigationBreadcrumbs, ResponsiveLayout, Placeholder} from '..';
import {useTextField, useCheckbox} from './helpers';

export default {
    title: 'Components/Headers/Header',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
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
    return (
        <Stack space={16}>
            <div data-testid="header-layout">
                <HeaderLayout
                    isInverse={isInverse}
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
                    {inverseCheckbox}
                    {extraContentCheckbox}
                    {extraSideBySideCheckbox}
                </Stack>
            </ResponsiveLayout>
        </Stack>
    );
};

Default.storyName = 'Header';

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
                        subtitle={{
                            text: `Subtitle (truncated to two lines) ${filler}}`,
                            truncate: 2,
                        }}
                    />
                }
            />
        </div>
    );
};
