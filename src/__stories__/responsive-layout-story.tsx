import * as React from 'react';
import {ResponsiveLayout, skinVars} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Layout/Responsive layout',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        withBackgroundColor: {
            name: 'backgroundColor={colors.backgroundAlternative}',
        },
    },
};

type Args = {
    isInverse: boolean;
    withBackgroundColor: boolean;
};

export const Default: StoryComponent<Args> = ({isInverse, withBackgroundColor}) => (
    <ResponsiveLayout
        isInverse={isInverse}
        backgroundColor={withBackgroundColor ? skinVars.colors.backgroundAlternative : undefined}
    >
        <Placeholder />
    </ResponsiveLayout>
);

Default.storyName = 'Responsive layout';

Default.args = {
    isInverse: false,
    withBackgroundColor: false,
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
