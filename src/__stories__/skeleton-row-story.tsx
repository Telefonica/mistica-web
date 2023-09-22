import * as React from 'react';
import {ThemeVariant, skinVars} from '..';
import {SkeletonRow} from '../skeletons';

export default {
    title: 'Components/Skeletons/SkeletonRow',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    inverse: boolean;
    ariaLabel: string;
    width: string;
};

const getSize = (n: number | string) => (Number.isNaN(+n) ? n : +n);

export const Default: StoryComponent<Args> = ({inverse, ariaLabel, width}) => {
    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    background: inverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
                    padding: 16,
                }}
            >
                <SkeletonRow
                    ariaLabel={ariaLabel}
                    width={getSize(width)}
                    dataAttributes={{testid: 'skeleton-row'}}
                />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'SkeletonRow';

Default.args = {
    width: '100%',
    inverse: false,
    ariaLabel: '',
};
