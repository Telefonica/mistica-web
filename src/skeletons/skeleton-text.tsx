// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161

import * as React from 'react';
import Stack from '../stack';
import {useIsInverseVariant} from '../theme-variant-context';
import {useAnimation} from './styles';
import {createUseStyles} from '../jss';

type TextStylesProps = {
    isInverse: boolean;
};

const useTextStyles = createUseStyles(({colors}) => ({
    line: {
        borderRadius: 8,
        height: 8,
        width: '100%',
        background: ({isInverse}: TextStylesProps) =>
            isInverse ? colors.backgroundSkeletonInverse : colors.backgroundSkeleton,
    },
    lastLine: {
        width: '75%',
    },
}));

type SkeletonTextProps = {
    ariaValueText?: string;
    disableAnimation?: boolean;
};

const SkeletonText = ({ariaValueText, disableAnimation = false}: SkeletonTextProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const classes = useTextStyles({isInverse});
    const animationClasses = useAnimation({disableAnimation});

    return (
        <Stack
            className={animationClasses.animation}
            space={16}
            aria-valuetext={ariaValueText}
            tab-index={0}
            role="progressbar"
            aria-busy
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div className={classes.line} />
            <div className={classes.line} />
            <div className={`${classes.line} ${classes.lastLine}`} />
        </Stack>
    );
};

export default SkeletonText;
