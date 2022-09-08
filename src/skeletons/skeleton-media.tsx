// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161

import * as React from 'react';
import {SkeletonLine} from './skeleton-line';

type SkeletonContentProps = {
    height: string | number;
    ariaValueText?: string;
    disableAnimation?: boolean;
};

const SkeletonMedia: React.FC<SkeletonContentProps> = ({
    height,
    ariaValueText,
    disableAnimation = false,
}: SkeletonContentProps): JSX.Element => {
    return <SkeletonLine height={height} disableAnimation={disableAnimation} ariaValueText={ariaValueText} />;
};

export default SkeletonMedia;
