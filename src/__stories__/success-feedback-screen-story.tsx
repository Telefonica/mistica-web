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
    title: string;
    description: string;
    multipleParagraphs: boolean;
    extra: boolean;
};

export const Success: StoryComponent<SuccessArgs> = ({
    imageUrl,
    imageFit,
    title,
    description,
    multipleParagraphs,
    extra,
}) => (
    <SuccessFeedbackScreen
        title={title}
        description={multipleParagraphs ? [description, 'paragraph 2', 'paragraph 3'] : description}
        primaryButton={<ButtonPrimary onPress={() => {}}>Action1</ButtonPrimary>}
        secondaryButton={<ButtonSecondary onPress={() => {}}>Action2</ButtonSecondary>}
        imageUrl={imageUrl ?? undefined}
        imageFit={imageFit}
        extra={extra ? <Placeholder /> : undefined}
    />
);
Success.storyName = 'SuccessFeedbackScreen';
Success.args = {
    imageUrl: emptyStateImg,
    imageFit: 'fit',
    title: "I'm the title",
    description: "I'm the description",
    multipleParagraphs: false,
    extra: false,
};
