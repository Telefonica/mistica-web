import * as React from 'react';
import FeedbackLoader from '../feedback-loader';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Community/FeedbackLoader',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent<React.ComponentProps<typeof FeedbackLoader>> = (props) => (
    <FeedbackLoader {...props} />
);

Default.storyName = 'FeedbackLoader';

Default.args = {
    description: 'Example text',
    loaded: false,
    onComplete: action('onComplete'),
};
