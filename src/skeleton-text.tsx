// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161

import * as React from 'react';
import {SkeletonRow} from './skeleton-row';
import {Stack} from './index';

type SkeletonTextProps = {
    ariaValueText?: string;
    disableAnimation?: boolean;
};

const SkeletonText = ({ariaValueText, disableAnimation = false}: SkeletonTextProps): JSX.Element => {
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
            <SkeletonRow height={8} disableAnimation={disableAnimation} />
            <SkeletonRow height={8} disableAnimation={disableAnimation} />
            <SkeletonRow height={8} width="75%" disableAnimation={disableAnimation} />
        </Stack>
    );
};

export default SkeletonText;
