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
