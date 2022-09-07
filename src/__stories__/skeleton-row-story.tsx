import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import SkeletonRow from '../skeletons/skeleton-row';

export default {
    title: 'Components/Skeletons/Skeleton Row',
};

type Args = {
    inverse: boolean;
    disableAnimation: boolean;
    ariaValueText: string;
};

export const Default: StoryComponent<Args> = ({disableAnimation, inverse, ariaValueText}) => {
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
                data-testid="skeleton-row"
            >
                <SkeletonRow disableAnimation={disableAnimation} ariaValueText={ariaValueText} />
            </div>
        </ThemeVariant>
    );
};

Default.storyName = 'Skeleton Row';

Default.args = {
    inverse: false,
    disableAnimation: false,
    ariaValueText: '',
};
