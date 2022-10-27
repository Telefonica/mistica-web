import * as React from 'react';
import {SkeletonRectangle} from '../skeletons';

export default {
    title: 'Components/Skeletons/Skeleton Rectangle',
};

type Args = {
    height: number | string;
    width: number | string;
    inverse: boolean;
    ariaLabel: string;
};

export const Default: StoryComponent<Args> = ({height, width, ariaLabel}) => {
    return (
        <div data-testid="skeleton-rectangle">
            <SkeletonRectangle ariaLabel={ariaLabel} height={height} width={width} />
        </div>
    );
};

Default.storyName = 'Skeleton Rectangle';

Default.args = {
    height: '100px',
    width: '50%',
    inverse: false,
    ariaLabel: '',
};
