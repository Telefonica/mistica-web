// @flow
import * as React from 'react';
import {
    ErrorFeedbackScreen as EFeedbackScreen,
    InfoFeedbackScreen as IFeedbackScreen,
    SuccessFeedbackScreen as SFeedbackScreen,
} from '../feedback-screen';
import {ButtonLink, ButtonPrimary, ButtonSecondary} from '../button';

export default {
    title: 'Core|Feedbacks/Screens',
};

const primaryButton = <ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>;

const secondaryButton = <ButtonSecondary onPress={() => {}}>Action2</ButtonSecondary>;

const linkButton = <ButtonLink onPress={() => {}}>Action2</ButtonLink>;

const defaultTitle = "I'm the title",
    defaultDescription = "I'm the description";

export const SuccessFeedbackScreen = (): React.Node => (
    <SFeedbackScreen
        title={defaultTitle}
        description={defaultDescription}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
    />
);

export const ErrorFeedbackScreen = (): React.Node => (
    <EFeedbackScreen
        title={defaultTitle}
        description={defaultDescription}
        primaryButton={primaryButton}
        link={linkButton}
    />
);

export const InfoFeedbackScreen = (): React.Node => (
    <IFeedbackScreen title={defaultTitle} description={defaultDescription} primaryButton={primaryButton} />
);

export const SuccessFeedbackScreenMultiparagraph = (): React.Node => (
    <SFeedbackScreen
        title={defaultTitle}
        description={[defaultDescription, "I'm the second paragraph"]}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
    />
);
