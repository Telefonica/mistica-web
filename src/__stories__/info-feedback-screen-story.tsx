import * as React from 'react';
import {InfoFeedbackScreen} from '../feedback';
import {ButtonPrimary} from '../button';

export default {
    title: 'Patterns/Feedback/InfoFeedbackScreen',
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
