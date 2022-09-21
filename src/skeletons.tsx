// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161
import * as React from 'react';
import SkeletonBase from './skeleton-base';
import {createUseStyles} from './jss';
import Stack from './stack';
import classNames from 'classnames';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

const transition = '1.5s linear';

const useAnimation = createUseStyles(() => ({
    animation: {
        animation: `$pulse ${transition} infinite`,
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

type SkeletonStylesProps = {
    height: number | string;
    width: number | string;
    isInverse: boolean;
};

const useSkeletonStyles = createUseStyles(() => ({
    wrap: {
        borderRadius: 8,
        height: ({height = 8}: SkeletonStylesProps) => height,
        width: ({width = '100%'}) => width,
    },
}));

type SkeletonLineProps = {
    width?: string | number;
    ariaLabel?: string;
    dataAttributes?: DataAttributes;
};

export const SkeletonLine = ({width = '100%', ariaLabel, dataAttributes}: SkeletonLineProps): JSX.Element => {
    const animationClasses = useAnimation();
    const styleClass = useSkeletonStyles({width});

    return (
        <div
            className={`${animationClasses.animation} ${styleClass.wrap}`}
            role="status"
            aria-hidden={ariaLabel === undefined}
            aria-busy={ariaLabel !== undefined}
            aria-label={ariaLabel}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <SkeletonBase />
        </div>
    );
};

type SkeletonTextProps = Omit<SkeletonLineProps, 'width'>;

export const SkeletonText = ({ariaLabel, dataAttributes}: SkeletonTextProps): JSX.Element => {
    const animationClasses = useAnimation();
    const styleClass = useSkeletonStyles({height: 'fit-content'});

    return (
        <Stack
            className={`${animationClasses.animation} ${styleClass.wrap}`}
            space={16}
            role="status"
            aria-hidden={ariaLabel === undefined}
            aria-busy={ariaLabel !== undefined}
            aria-label={ariaLabel}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <SkeletonBase />
            <SkeletonBase />
            <SkeletonBase width="75%" />
        </Stack>
    );
};

type SkeletonCircleProps = Omit<SkeletonLineProps, 'width'> & {size?: number | string};

export const SkeletonCircle = ({ariaLabel, size = 40, dataAttributes}: SkeletonCircleProps): JSX.Element => {
    const animationClasses = useAnimation();
    const styleClass = useSkeletonStyles({width: size, height: size});

    return (
        <div
            className={classNames(animationClasses.animation, styleClass.wrap)}
            role="status"
            aria-hidden={ariaLabel === undefined}
            aria-busy={ariaLabel !== undefined}
            aria-label={ariaLabel}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <SkeletonBase height={size} width={size} radius="50%" />
        </div>
    );
};

const useSkeletonRowStyles = createUseStyles(() => ({
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        flexShrink: 0,
        flexGrow: 0,
    },
    line: {
        flexShrink: 1,
        marginLeft: 16,
    },
}));

type SkeletonRowProps = SkeletonLineProps;

export const SkeletonRow = ({width = '100%', ariaLabel, dataAttributes}: SkeletonRowProps): JSX.Element => {
    const animationClasses = useAnimation();
    const styleClass = useSkeletonStyles({width, height: '100%'});
    const rowClass = useSkeletonRowStyles();

    return (
        <div
            className={classNames(animationClasses.animation, styleClass.wrap, rowClass.row)}
            role="status"
            aria-hidden={ariaLabel === undefined}
            aria-busy={ariaLabel !== undefined}
            aria-label={ariaLabel}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <SkeletonBase height={40} width={40} radius="50%" className={rowClass.circle} />
            <SkeletonBase width={width} className={rowClass.line} />
        </div>
    );
};

type SkeletonRectangleProps = SkeletonLineProps & {height: number | string};

export const SkeletonRectangle = ({
    width = '100%',
    height = '100%',
    ariaLabel,
    dataAttributes,
}: SkeletonRectangleProps): JSX.Element => {
    const animationClasses = useAnimation();
    const styleClass = useSkeletonStyles({width, height: '100%'});

    return (
        <div
            className={classNames(animationClasses.animation, styleClass.wrap)}
            role="status"
            aria-hidden
            aria-busy
            aria-label={ariaLabel}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <SkeletonBase height={height} width={width} />
        </div>
    );
};
