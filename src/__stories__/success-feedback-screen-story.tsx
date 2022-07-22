import * as React from 'react';
import {SuccessFeedbackScreen} from '../feedback';
import {ButtonPrimary, ButtonSecondary} from '../button';

export default {
    title: 'Patterns/Feedback/SuccessFeedbackScreen',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        imageFit: {
            options: ['fit', 'fill'],
            control: {type: 'select'},
        },
    },
};

type SuccessArgs = {imageUrl: string | null; imageFit: 'fit' | 'fill'; multipleParagraphs: boolean};

const defaultDescription = "I'm the description";

export const Success: StoryComponent<SuccessArgs> = ({imageUrl, imageFit, multipleParagraphs}) => (
    <SuccessFeedbackScreen
        title="I'm the title"
        description={
            multipleParagraphs ? [defaultDescription, 'paragraph 2', 'paragraph 3'] : defaultDescription
        }
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        secondaryButton={<ButtonSecondary onPress={() => {}}>Action2</ButtonSecondary>}
        imageUrl={imageUrl ?? undefined}
        imageFit={imageFit}
    />
);
Success.storyName = 'SuccessFeedbackScreen';
Success.args = {imageUrl: 'https://i.imgur.com/k5tDSNx.png', imageFit: 'fit', multipleParagraphs: false};
