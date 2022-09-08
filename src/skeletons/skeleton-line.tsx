import {useIsInverseVariant} from '../theme-variant-context';
import {createUseStyles} from '../jss';
import * as React from 'react';
import {useAnimation} from './styles';

type RowStylesProps = {
    width?: string | number;
    height?: string | number;
    isInverse: boolean;
};

const useLineStyle = createUseStyles(({colors}) => ({
    row: {
        borderRadius: 8,
        height: ({height = 8}: RowStylesProps) => height,
        width: ({width = 'initial'}: RowStylesProps) => width,
        background: ({isInverse}: RowStylesProps) =>
            isInverse ? colors.backgroundSkeletonInverse : colors.backgroundSkeleton,
    },
}));

type RowProps = {
    width?: string | number;
    height?: string | number;
    disableAnimation?: boolean;
    ariaValueText?: string;
};

export const SkeletonLine = ({
    width,
    height,
    disableAnimation = false,
    ariaValueText,
}: RowProps): JSX.Element => {
    const isInverse = useIsInverseVariant();
    const animationClasses = useAnimation({disableAnimation});
    const classes = useLineStyle({width, height, isInverse});

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
