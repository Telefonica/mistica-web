import * as React from 'react';
import {MainSectionHeader, MainSectionHeaderLayout, ButtonPrimary, Stack, ResponsiveLayout} from '..';
import {useTextField, useCheckbox} from './helpers';

export default {
    title: 'Components/Headers/MainSectionHeader',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    const [title, titleTextField] = useTextField('title', 'Support');
    const [desciption, descriptionTextField] = useTextField('description', 'How can I help you?');
    const [buttonLabel, buttonLabelTextField] = useTextField('buttonLabel', 'Action');
    const [isInverse, inverseCheckbox] = useCheckbox('Inverse', true);

    return (
        <Stack space={16}>
            <div data-testid="header-layout">
                <MainSectionHeaderLayout isInverse={isInverse}>
                    <MainSectionHeader
                        title={title}
                        description={desciption}
                        button={
                            buttonLabel ? <ButtonPrimary href="asdf">{buttonLabel}</ButtonPrimary> : undefined
                        }
                    />
                </MainSectionHeaderLayout>
            </div>
            <ResponsiveLayout>
                <Stack space={16}>
                    {titleTextField}
                    {descriptionTextField}
                    {buttonLabelTextField}
                    {inverseCheckbox}
                </Stack>
            </ResponsiveLayout>
        </Stack>
    );
};
Default.storyName = 'MainSectionHeader';
