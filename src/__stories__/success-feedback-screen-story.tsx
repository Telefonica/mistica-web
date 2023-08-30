import * as React from 'react';
import {SuccessFeedbackScreen} from '../feedback';
import {ButtonPrimary, ButtonSecondary} from '../button';
import emptyStateImg from './images/empty-state.png';
import {Placeholder} from '../placeholder';

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

type SuccessArgs = {
    imageUrl: string | null;
    imageFit: 'fit' | 'fill';
    multipleParagraphs: boolean;
    extra: boolean;
};

const defaultDescription = "I'm the description";

export const Success: StoryComponent<SuccessArgs> = ({imageUrl, imageFit, multipleParagraphs, extra}) => (
    <SuccessFeedbackScreen
        title="I'm the title"
        description={
            multipleParagraphs ? [defaultDescription, 'paragraph 2', 'paragraph 3'] : defaultDescription
        }
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        secondaryButton={<ButtonSecondary onPress={() => {}}>Action2</ButtonSecondary>}
        imageUrl={imageUrl ?? undefined}
        imageFit={imageFit}
        extra={extra ? <Placeholder /> : undefined}
    />
);
Success.storyName = 'SuccessFeedbackScreen';
Success.args = {imageUrl: emptyStateImg, imageFit: 'fit', multipleParagraphs: false, extra: false};
