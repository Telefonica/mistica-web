// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161

import * as React from 'react';
import {SkeletonLine} from './skeleton-line';
import {Stack} from '../index';

type SkeletonTextProps = {
    ariaValueText?: string;
    disableAnimation?: boolean;
};

const SkeletonText: React.FC<SkeletonTextProps> = ({ariaValueText, disableAnimation = false}) => {
    return (
        <Stack
            space={16}
            aria-valuetext={ariaValueText}
            tab-index={0}
            role="progressbar"
            aria-busy
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <SkeletonLine height={8} disableAnimation={disableAnimation} />
            <SkeletonLine height={8} disableAnimation={disableAnimation} />
            <SkeletonLine height={8} width="75%" disableAnimation={disableAnimation} />
        </Stack>
    );
};

export default SkeletonText;
