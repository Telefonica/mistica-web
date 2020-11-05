import * as React from 'react';
import {GridLayout, ResponsiveLayout} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Components/Layouts/GridLayout',
    parameters: {
        fullScreen: true,
    },
};

export const SixAndSix: StoryComponent = () => (
    <ResponsiveLayout>
        <GridLayout>
            <div style={{gridColumn: 'span 6'}}>
                <Placeholder />
            </div>
            <div style={{gridColumn: 'span 6'}}>
                <Placeholder />
            </div>
        </GridLayout>
    </ResponsiveLayout>
);

SixAndSix.storyName = '6 + 6';

export const EightAndFour: StoryComponent = () => (
    <ResponsiveLayout>
        <GridLayout>
            <div style={{gridColumn: 'span 8'}}>
                <Placeholder />
            </div>
            <div style={{gridColumn: 'span 4'}}>
                <Placeholder />
            </div>
        </GridLayout>
    </ResponsiveLayout>
);

EightAndFour.storyName = '8 + 4';
