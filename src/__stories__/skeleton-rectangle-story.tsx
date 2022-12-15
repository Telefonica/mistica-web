import * as React from 'react';
import {SkeletonRectangle} from '../skeletons';
import {ThemeVariant, useTheme} from '..';

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
                style={{background: inverse ? colors.backgroundBrand : colors.background}}
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
