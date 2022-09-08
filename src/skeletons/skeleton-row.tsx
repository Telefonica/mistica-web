// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161

import * as React from 'react';
import {useAnimation} from './styles';
import {createUseStyles} from '../jss';
import {useIsInverseVariant} from '../theme-variant-context';

type RowStylesProps = {
    isInverse: boolean;
};

const useRowStyles = createUseStyles(({colors}) => ({
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        flexShrink: 0,
        borderRadius: '50%',
        height: 40,
        width: 40,
        background: ({isInverse}: RowStylesProps) =>
            isInverse ? colors.backgroundSkeletonInverse : colors.backgroundSkeleton,
    },
    line: {
        flexGrow: 1,
        marginLeft: 16,
        borderRadius: 8,
        height: 8,
        background: ({isInverse}: RowStylesProps) =>
            isInverse ? colors.backgroundSkeletonInverse : colors.backgroundSkeleton,
    },
}));

type SkeletonRowProps = {
    ariaValueText?: string;
    disableAnimation?: boolean;
};

const SkeletonRow = ({ariaValueText, disableAnimation = false}: SkeletonRowProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const animationClasses = useAnimation({disableAnimation});
    const classes = useRowStyles({isInverse});

    return (
        <div
            className={`${animationClasses.animation} ${classes.row}`}
            aria-valuetext={ariaValueText}
            role="progressbar"
            tabIndex={0}
            aria-busy
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div className={classes.circle} />
            <div className={classes.line} />
        </div>
    );
};

export default SkeletonRow;
