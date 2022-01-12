import * as React from 'react';
import {Video} from '..';

export default {
    title: 'Components/Others/Video',
    component: Video,
};

export const Default: StoryComponent = () => (
    <div data-testid="video">
        <Video url="https://fr-cert1-es.mytelco.io/2O4-xBJqiMlAfLkseq8RkXs_mv2ACV7Hnt20HqXxNl-mK7KLI3M2dAw" />
    </div>
);

Default.storyName = 'Video';
