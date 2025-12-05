import * as React from 'react';
import {ResponsiveLayout, skinVars} from '..';
import {Placeholder} from '../placeholder';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Layout/Responsive layout',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    variant: Variant;
    backgroundColor: 'undefined' | 'backgroundAlternative';
};

export const Default: StoryComponent<Args> = ({variant, backgroundColor}) => (
    <ResponsiveLayout
        variant={variant}
        backgroundColor={backgroundColor === 'undefined' ? undefined : skinVars.colors[backgroundColor]}
    >
        <Placeholder />
    </ResponsiveLayout>
);

Default.storyName = 'Responsive layout';

Default.args = {
    variant: 'default',
    backgroundColor: 'undefined',
};

Default.argTypes = {
    backgroundColor: {
        options: ['undefined', 'backgroundAlternative'],
        control: {type: 'select'},
    },
    variant: {
        options: ['default', 'brand', 'negative', 'alternative'],
        control: {type: 'select'},
    },
};

export const Nested: StoryComponent = () => (
    <ResponsiveLayout variant="alternative">
        <Placeholder />
        <ResponsiveLayout variant="brand">
            <Placeholder />
            <ResponsiveLayout variant="default" backgroundColor="gray">
                <Placeholder />
            </ResponsiveLayout>
        </ResponsiveLayout>
    </ResponsiveLayout>
);

Nested.storyName = 'Nested responsive layouts';
