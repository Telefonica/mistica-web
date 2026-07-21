import * as React from 'react';
import ExampleComponent from '../../cyber/example-component';

export default {
    title: 'Community/Cyber/ExampleComponent',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    return <ExampleComponent>Cyber example story</ExampleComponent>;
};

Default.storyName = 'ExampleComponent';
