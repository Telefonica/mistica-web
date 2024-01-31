import * as React from 'react';
import LoadingBarComponent from '../loading-bar';

export default {
    title: 'Components/LoadingBar',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    visible: boolean;
};

export const Default: StoryComponent<Args> = ({visible}) => <LoadingBarComponent visible={visible} />;

Default.args = {
    visible: true,
};

Default.storyName = 'LoadingBar';
