import * as React from 'react';
import {ErrorFeedbackScreen} from '../feedback-screen';
import {ButtonLink, ButtonPrimary} from '../button';

export default {
    title: 'Components/Screens/FeedbackScreen',
    parameters: {
        fullScreen: true,
    },
};

export const Error: StoryComponent = () => (
    <ErrorFeedbackScreen
        title="I'm the title"
        description="I'm the description"
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        link={<ButtonLink onPress={() => {}}>Action2</ButtonLink>}
    />
);
Error.storyName = 'ErrorFeedbackScreen';
