import * as React from 'react';
import {MainSectionHeader, MainSectionHeaderLayout, ButtonPrimary} from '..';

export default {
    title: 'Components/Headers/MainSectionHeader',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    title: string;
    description: string;
    buttonLabel: string;
    inverse: boolean;
};

export const Default: StoryComponent<Args> = ({title, description, buttonLabel, inverse}) => {
    return (
        <MainSectionHeaderLayout isInverse={inverse} dataAttributes={{testid: 'header-layout'}}>
            <MainSectionHeader
                title={title}
                description={description}
                button={buttonLabel ? <ButtonPrimary href="asdf">{buttonLabel}</ButtonPrimary> : undefined}
            />
        </MainSectionHeaderLayout>
    );
};

Default.storyName = 'MainSectionHeader';

Default.args = {
    title: 'Support',
    description: 'How can I help you?',
    buttonLabel: 'Action',
    inverse: false,
};
