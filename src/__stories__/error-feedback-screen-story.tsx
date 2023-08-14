import * as React from 'react';
import {ErrorFeedbackScreen} from '../feedback';
import {ButtonLink, ButtonPrimary} from '../button';
import {Placeholder} from '../placeholder';

export default {
    title: 'Patterns/Feedback/ErrorFeedbackScreen',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    extra: boolean;
};

export const Error: StoryComponent<Args> = ({extra}) => (
    <ErrorFeedbackScreen
        title="I'm the title"
        description="I'm the description"
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        link={<ButtonLink onPress={() => {}}>Action2</ButtonLink>}
        errorReference="Error reference: #95001"
        extra={extra ? <Placeholder /> : undefined}
    />
);

Error.storyName = 'ErrorFeedbackScreen';
Error.args = {
    extra: false,
};
