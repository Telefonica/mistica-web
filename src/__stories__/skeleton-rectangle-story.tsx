import * as React from 'react';
import {SkeletonRectangle} from '../skeletons';
import {ThemeVariant, skinVars} from '..';

export default {
    title: 'Components/Skeletons/SkeletonRectangle',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    height: string;
    width: string;
    inverse: boolean;
    ariaLabel: string;
};

const getSize = (n: number | string) => (Number.isNaN(+n) ? n : +n);

export const Default: StoryComponent<Args> = ({height, width, inverse, ariaLabel}) => {
    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    background: inverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
                    padding: 16,
                }}
            >
                <SkeletonRectangle
                    height={getSize(height)}
                    width={getSize(width)}
                    ariaLabel={ariaLabel}
                    dataAttributes={{testid: 'skeleton-rectangle'}}
                />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'SkeletonRectangle';

Default.args = {
    height: '100',
    width: '100',
    inverse: false,
    ariaLabel: '',
};
