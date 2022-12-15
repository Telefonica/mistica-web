import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import {SkeletonCircle} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Circle',
};

type Args = {
    size?: number;
    inverse: boolean;
    ariaValueText: string;
};

export const Default: StoryComponent<Args> = ({size, inverse, ariaValueText}) => {
    const {colors} = useTheme();

    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{background: inverse ? colors.backgroundBrand : colors.background}}
                data-testid="skeleton-circle"
            >
                <SkeletonCircle size={size} ariaLabel={ariaValueText} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Circle';

Default.args = {
    size: 40,
    inverse: false,
    ariaValueText: '',
};
