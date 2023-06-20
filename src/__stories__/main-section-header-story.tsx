import * as React from 'react';
import {MainSectionHeader, MainSectionHeaderLayout, ButtonPrimary, Stack} from '..';

export default {
    title: 'Components/Headers/MainSectionHeader',
};

type Args = {
    title: string;
    description: string;
    buttonLabel: string;
    isInverse: boolean;
};

export const Default: StoryComponent<Args> = ({title, description, buttonLabel, isInverse}) => {
    return (
        <Stack space={16}>
            <div data-testid="header-layout">
                <MainSectionHeaderLayout isInverse={isInverse}>
                    <MainSectionHeader
                        title={title}
                        description={description}
                        button={
                            buttonLabel ? <ButtonPrimary href="asdf">{buttonLabel}</ButtonPrimary> : undefined
                        }
                    />
                </MainSectionHeaderLayout>
            </div>
        </Stack>
    );
};

Default.storyName = 'MainSectionHeader';
Default.args = {
    title: 'Support',
    description: 'How can I help you?',
    buttonLabel: 'Action',
    isInverse: true,
};
