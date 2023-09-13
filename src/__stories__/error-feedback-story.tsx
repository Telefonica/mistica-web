import * as React from 'react';
import {ErrorFeedback} from '../feedback';
import {ButtonPrimary, ButtonSecondary} from '../button';
import ResponsiveLayout from '../responsive-layout';

export default {
    title: 'Patterns/Feedback/ErrorFeedback',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    title: string;
    description: string;
    multipleParagraphs: boolean;
    errorReference: string;
    withButtons: boolean;
};

export const ErrorFeedbackStory: StoryComponent<Args> = ({
    title,
    description,
    multipleParagraphs,
    withButtons,
    errorReference,
}) => (
    <ResponsiveLayout>
        <ErrorFeedback
            dataAttributes={{testid: 'error-feedback'}}
            title={title}
            description={multipleParagraphs ? [description, 'paragraph 2', 'paragraph 3'] : description}
            primaryButton={
                withButtons ? <ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary> : undefined
            }
            secondaryButton={
                withButtons ? <ButtonSecondary onPress={() => {}}>Action2</ButtonSecondary> : undefined
            }
            errorReference={errorReference}
        />
    </ResponsiveLayout>
);
ErrorFeedbackStory.storyName = 'ErrorFeedback';
ErrorFeedbackStory.args = {
    title: 'Title',
    description: 'Description',
    multipleParagraphs: false,
    errorReference: '',
    withButtons: true,
};
