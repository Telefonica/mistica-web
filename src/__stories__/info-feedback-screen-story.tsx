import * as React from 'react';
import {InfoFeedbackScreen} from '../feedback';
import {ButtonPrimary} from '../button';
import IconError from '../icons/icon-error';
import {Placeholder} from '../placeholder';

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
    extra: boolean;
};

export const Info: StoryComponent<Args> = ({icon, extra}) => (
    <InfoFeedbackScreen
        title="I'm the title"
        description="I'm the description"
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        Icon={icon === 'custom' ? IconError : undefined}
        extra={extra ? <Placeholder /> : undefined}
    />
);

Info.storyName = 'InfoFeedbackScreen';
Info.args = {
    icon: 'default',
    extra: false,
};
