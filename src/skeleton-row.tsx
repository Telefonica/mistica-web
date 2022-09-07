import {useIsInverseVariant} from './theme-variant-context';
import {createUseStyles} from './jss';
import * as React from 'react';
import CSS from 'csstype';

const transition = '1s linear';

type RowStylesProps = {
    width?: string | number;
    height?: string | number;
    isInverse: boolean;
};

const useAnimation = createUseStyles(() => ({
    animation: {
        animation: ({disableAnimation}: RowProps) =>
            disableAnimation ? '' : `$pulse ${transition} infinite`,
    },
    '@keyframes pulse': {
        '0%': {
            opacity: 1,
        },

        '50%': {
            opacity: 0.5,
        },

        '100%': {
            opacity: 1,
        },
    },
}));

const useRowStyle = createUseStyles(({colors}) => ({
    row: {
        borderRadius: 8,
        height: ({height = 8}: RowStylesProps) => height,
        width: ({width = 'initial'}: RowStylesProps) => width,
        background: ({isInverse}: RowStylesProps) =>
            isInverse ? colors.backgroundSkeletonInverse : colors.backgroundSkeleton,
    },
}));

type RowProps = {
    width?: CSS.Property.Width;
    height?: string | number;
    disableAnimation?: boolean;
    ariaValueText?: string;
};

export const SkeletonRow = ({
    width,
    height,
    disableAnimation = false,
    ariaValueText,
}: RowProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const animationClasses = useAnimation({isInverse, disableAnimation});
    const classes = useRowStyle({width, height, isInverse});

    return (
        <div
            className={`${classes.row} ${animationClasses.animation}`}
            aria-valuetext={ariaValueText}
            role={ariaValueText === undefined ? undefined : 'progressbar'}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={ariaValueText === undefined ? undefined : 0}
            aria-busy={ariaValueText === undefined ? undefined : true}
            aria-valuemin={ariaValueText === undefined ? undefined : 0}
            aria-valuemax={ariaValueText === undefined ? undefined : 100}
        />
    );
};
