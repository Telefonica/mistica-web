import * as React from 'react';
import {MainSectionHeader, MainSectionHeaderLayout, ButtonPrimary} from '..';

export default {
    title: 'Components/Headers/MainSectionHeader',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        variant: {
            options: ['default', 'brand'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    title: string;
    description: string;
    buttonLabel: string;
    variant: 'default' | 'brand';
};

export const Default: StoryComponent<Args> = ({title, description, buttonLabel, variant}) => {
    return (
        <MainSectionHeaderLayout variant={variant} dataAttributes={{testid: 'header-layout'}}>
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
    variant: 'default',
};
