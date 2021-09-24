import * as React from 'react';
import {ErrorFeedbackScreen, InfoFeedbackScreen} from '../feedback-screen';
import {ButtonLink, ButtonPrimary} from '../button';

export default {
    title: 'Components/Screens/FeedbackScreen',
    parameters: {
        fullScreen: true,
    },
};

const primaryButton = <ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>;

const linkButton = <ButtonLink onPress={() => {}}>Action2</ButtonLink>;

const defaultTitle = "I'm the title",
    defaultDescription = "I'm the description";

export const Error: StoryComponent = () => (
    <ErrorFeedbackScreen
        title={defaultTitle}
        description={defaultDescription}
        primaryButton={primaryButton}
        link={linkButton}
    />
);
Error.storyName = 'ErrorFeedbackScreen';

export const Info: StoryComponent = () => (
    <InfoFeedbackScreen title={defaultTitle} description={defaultDescription} primaryButton={primaryButton} />
);
Info.storyName = 'InfoFeedbackScreen';
