import * as React from 'react';
import {ResponsiveLayout, skinVars} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Layout/Responsive layout',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    inverse: boolean;
    backgroundColor: 'undefined' | 'backgroundAlternative';
};

export const Default: StoryComponent<Args> = ({inverse, backgroundColor}) => (
    <ResponsiveLayout
        isInverse={inverse}
        backgroundColor={backgroundColor === 'undefined' ? undefined : skinVars.colors[backgroundColor]}
    >
        <Placeholder />
    </ResponsiveLayout>
);

Default.storyName = 'Responsive layout';

Default.args = {
    inverse: false,
    backgroundColor: 'undefined',
};

Default.argTypes = {
    backgroundColor: {
        options: ['undefined', 'backgroundAlternative'],
        control: {type: 'select'},
    },
};

export const Nested: StoryComponent = () => (
    <ResponsiveLayout variant="alternative">
        <Placeholder />
        <ResponsiveLayout variant="inverse">
            <Placeholder />
            <ResponsiveLayout variant="default" backgroundColor="gray">
                <Placeholder />
            </ResponsiveLayout>
        </ResponsiveLayout>
    </ResponsiveLayout>
);

Nested.storyName = 'Nested responsive layouts';
