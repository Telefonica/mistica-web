import * as React from 'react';
import {InfoFeedbackScreen} from '../feedback';
import {ButtonPrimary} from '../button';
import IconError from '../icons/icon-error';

export default {
    title: 'Patterns/Feedback/InfoFeedbackScreen',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        icon: {
            options: ['default', 'custom'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    icon: string;
};

export const Info: StoryComponent<Args> = ({icon}) => (
    <InfoFeedbackScreen
        title="I'm the title"
        description="I'm the description"
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        Icon={icon === 'custom' ? IconError : undefined}
    />
);

Info.storyName = 'InfoFeedbackScreen';
Info.args = {
    icon: 'default',
};
