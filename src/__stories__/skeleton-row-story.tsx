import * as React from 'react';
import {Box, ResponsiveLayout} from '..';
import {SkeletonRow} from '../skeletons';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Skeletons/SkeletonRow',
    parameters: {
        fullScreen: true,
    },
    argTypes: {
        variantOutside: {
            options: ['default', 'brand', 'negative', 'alternative'],
            control: {type: 'select'},
        },
    },
};

type Args = {
    variantOutside: Variant;
    ariaLabel: string;
    width: string;
};

const getSize = (n: number | string) => (Number.isNaN(+n) ? n : +n);

export const Default: StoryComponent<Args> = ({variantOutside, ariaLabel, width}) => {
    return (
        <ResponsiveLayout variant={variantOutside}>
            <Box paddingY={16}>
                <SkeletonRow
                    ariaLabel={ariaLabel}
                    width={getSize(width)}
                    dataAttributes={{testid: 'skeleton-row'}}
                />
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'SkeletonRow';

Default.args = {
    width: '100%',
    variantOutside: 'default',
    ariaLabel: '',
};
