import * as React from 'react';
import {SkeletonRectangle} from '../skeletons';
import {ThemeVariant, skinVars} from '..';

export default {
    title: 'Components/Skeletons/Skeleton Rectangle',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    height: number;
    width: number;
    inverse: boolean;
    ariaLabel: string;
};

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
                    height={height}
                    width={width}
                    ariaLabel={ariaLabel}
                    dataAttributes={{testid: 'skeleton-rectangle'}}
                />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Rectangle';

Default.args = {
    height: 100,
    width: 100,
    inverse: false,
    ariaLabel: '',
};
