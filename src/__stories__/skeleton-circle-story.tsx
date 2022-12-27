import * as React from 'react';
import {ThemeVariant, useTheme} from '..';
import {SkeletonCircle} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Circle',
    parameters: {
        fullScreen: true,
    },
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
                style={{
                    background: inverse ? colors.backgroundBrand : colors.background,
                    padding: 16,
                }}
            >
                <SkeletonCircle
                    dataAttributes={{testid: 'skeleton-circle'}}
                    size={size}
                    ariaLabel={ariaValueText}
                />
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
