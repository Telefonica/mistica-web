import * as React from 'react';
import {ResponsiveLayout} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Layout/ResponsiveLayout',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => (
    <ResponsiveLayout>
        <Placeholder />
    </ResponsiveLayout>
);

Default.storyName = 'ResponsiveLayout';
