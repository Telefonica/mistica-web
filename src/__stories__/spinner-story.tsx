import * as React from 'react';
import {Box, ResponsiveLayout, Spinner} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Spinner',
    component: Spinner,
    argTypes: {
        size: {
            control: {type: 'range', min: 24, max: 100, step: 4},
        },
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
    parameters: {fullScreen: true},
};

type Args = {
    size: number;
    variantOutside: Variant;
};

export const Default: StoryComponent<Args> = ({size, variantOutside}) => {
    return (
        <ResponsiveLayout variant={variantOutside} fullWidth>
            <Box padding={16}>
                <Spinner size={size} />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Spinner';
Default.args = {
    size: 24,
    variantOutside: 'default',
};
