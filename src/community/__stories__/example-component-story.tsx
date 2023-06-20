import * as React from 'react';
import ExampleComponent from '../example-component';

export default {
    title: 'Community/ExampleComponent',
};

export const Default: StoryComponent = () => {
    return <ExampleComponent>Example story</ExampleComponent>;
};

Default.storyName = 'ExampleComponent';
