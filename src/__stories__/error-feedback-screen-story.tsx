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
    title: string;
    description: string;
    multipleParagraphs: boolean;
    extra: boolean;
    errorReference: string;
};

export const Error: StoryComponent<Args> = ({
    title,
    description,
    multipleParagraphs,
    extra,
    errorReference,
}) => (
    <ErrorFeedbackScreen
        title={title}
        description={multipleParagraphs ? [description, 'paragraph 2', 'paragraph 3'] : description}
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        link={<ButtonLink onPress={() => {}}>Action2</ButtonLink>}
        errorReference={errorReference}
        extra={extra ? <Placeholder /> : undefined}
    />
);

Error.storyName = 'ErrorFeedbackScreen';
Error.args = {
    title: "I'm the title",
    description: "I'm the description",
    multipleParagraphs: false,
    extra: false,
    errorReference: 'Error reference: #95001',
};
