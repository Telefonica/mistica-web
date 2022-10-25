// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161
import * as React from 'react';
import SkeletonBase from './skeleton-base';
import {createUseStyles} from './jss';
import Stack from './stack';
import {getPrefixedDataAttributes} from './utils/dom';
import {RATIO} from './image';
import {useSupportsAspectRatio} from './utils/aspect-ratio-support';

import type {AspectRatio} from './image';
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

type SkeletonAnimationProps = {
    children: React.ReactNode;
    ariaLabel?: string;
    dataAttributes?: DataAttributes;
};

const SkeletonAnimation = ({children, ariaLabel, dataAttributes}: SkeletonAnimationProps) => {
    const animationClasses = useAnimation();

    return (
        <div
            className={animationClasses.animation}
            role="status"
            aria-hidden={ariaLabel === undefined}
            aria-busy={ariaLabel !== undefined}
            aria-label={ariaLabel}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            {children}
        </div>
    );
};

type SkeletonLineProps = {
    width?: string | number;
    ariaLabel?: string;
    dataAttributes?: DataAttributes;
};

export const SkeletonLine = ({width = '100%', ariaLabel, dataAttributes}: SkeletonLineProps): JSX.Element => {
    return (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <SkeletonBase width={width} />
        </SkeletonAnimation>
    );
};

type SkeletonTextProps = Omit<SkeletonLineProps, 'width'>;

export const SkeletonText = ({ariaLabel, dataAttributes}: SkeletonTextProps): JSX.Element => {
    return (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <Stack space={16}>
                <SkeletonBase />
                <SkeletonBase />
                <SkeletonBase width="75%" />
            </Stack>
        </SkeletonAnimation>
    );
};

type SkeletonCircleProps = Omit<SkeletonLineProps, 'width'> & {size?: number | string};

export const SkeletonCircle = ({ariaLabel, size = 40, dataAttributes}: SkeletonCircleProps): JSX.Element => {
    return (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <SkeletonBase height={size} width={size} radius="50%" />
        </SkeletonAnimation>
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
    const rowClass = useSkeletonRowStyles();

    return (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <div className={rowClass.row}>
                <SkeletonBase height={40} width={40} radius="50%" className={rowClass.circle} />
                <SkeletonBase width={width} className={rowClass.line} />
            </div>
        </SkeletonAnimation>
    );
};

const useSkeletonRectangleStyles = createUseStyles(() => ({
    container: {
        '@supports (aspect-ratio: 1 / 1)': {
            aspectRatio: ({aspectRatio}) => aspectRatio ?? 'unset',
        },
        '$wrapper &': {
            position: ({aspectRatio}) => (aspectRatio ? 'absolute' : 'static'),
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
        },
    },

    wrapper: {
        overflow: 'hidden',
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'relative',
        paddingTop: ({aspectRatio, width}) => {
            if (!aspectRatio) {
                return 0;
            }
            if (width && typeof width === 'string' && width.endsWith('%')) {
                return `${Number(width.replace('%', '')) / aspectRatio}%`;
            }
            return `${100 / aspectRatio}%`;
        },
    },
}));

type SkeletonRectangleProps = {
    ariaLabel?: string;
    dataAttributes?: DataAttributes;
    width?: number | string;
    height?: number | string;
    aspectRatio?: AspectRatio | number;
};

export const SkeletonRectangle = ({
    width = '100%',
    height = '100%',
    ariaLabel,
    dataAttributes,
    aspectRatio = '1:1',
}: SkeletonRectangleProps): JSX.Element => {
    const supportsAspectRatio = useSupportsAspectRatio();
    const ratio = typeof aspectRatio === 'number' ? aspectRatio : RATIO[aspectRatio];
    const withCssAspectRatio = typeof width !== 'number' && typeof height !== 'number' && ratio !== 0;

    const classes = useSkeletonRectangleStyles({
        aspectRatio: withCssAspectRatio ? ratio : undefined,
    });

    const needsWrapper = withCssAspectRatio && !supportsAspectRatio;

    const skeleton = (
        <SkeletonAnimation ariaLabel={ariaLabel} {...getPrefixedDataAttributes(dataAttributes)}>
            <SkeletonBase
                className={classes.container}
                {...(needsWrapper ? {width: '100%'} : {width, height})}
            />
        </SkeletonAnimation>
    );

    if (needsWrapper) {
        return (
            <div style={{width, height}} className={classes.wrapper}>
                {skeleton}
            </div>
        );
    } else {
        return skeleton;
    }
};
