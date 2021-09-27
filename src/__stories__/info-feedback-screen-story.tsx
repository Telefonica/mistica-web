import * as React from 'react';
import {InfoFeedbackScreen} from '../feedback-screen';
import {ButtonPrimary} from '../button';

export default {
    title: 'Components/Screens/FeedbackScreen/InfoFeedbackScreen',
    parameters: {
        fullScreen: true,
    },
};

export const Info: StoryComponent = () => (
    <InfoFeedbackScreen
        title="I'm the title"
        description="I'm the description"
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
    />
);
Info.storyName = 'InfoFeedbackScreen';
