import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import {SkeletonRectangle} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Rectangle',
};

type Args = {
    height: number;
    width: number;
    inverse: boolean;
    ariaLabel: string;
};

export const Default: StoryComponent<Args> = ({height, width, inverse, ariaLabel}) => {
    const {colors} = useTheme();

    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    padding: 16,
                    width: '50%',
                    background: inverse ? colors.backgroundBrand : colors.background,
                    // prevent line-height from affecting the height of the container;
                    // happens when changing the base font size
                    lineHeight: 0,
                }}
                data-testid="skeleton-rectangle"
            >
                <SkeletonRectangle height={height} width={width} ariaLabel={ariaLabel} />
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
