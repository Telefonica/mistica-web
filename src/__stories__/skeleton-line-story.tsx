import * as React from 'react';
import {ThemeVariant, skinVars} from '..';
import {SkeletonLine} from '../skeletons';

export default {
    title: 'Components/Skeletons/SkeletonLine',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    inverse: boolean;
    width: string;
    ariaLabel?: string;
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
                <SkeletonLine
                    dataAttributes={{testid: 'skeleton-line'}}
                    width={getSize(width)}
                    ariaLabel={ariaLabel}
                />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'SkeletonLine';

Default.args = {
    inverse: false,
    width: '100%',
    ariaLabel: '',
};
