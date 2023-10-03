import * as React from 'react';
import {ThemeVariant, skinVars} from '..';
import {SkeletonCircle} from '../skeletons';

export default {
    title: 'Components/Skeletons/SkeletonCircle',
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    size: number;
    inverse: boolean;
    ariaValueText: string;
};

export const Default: StoryComponent<Args> = ({size, inverse, ariaValueText}) => {
    return (
        <ThemeVariant isInverse={inverse}>
            <div
                style={{
                    background: inverse ? skinVars.colors.backgroundBrand : skinVars.colors.background,
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

Default.storyName = 'SkeletonCircle';

Default.args = {
    size: 40,
    inverse: false,
    ariaValueText: '',
};
