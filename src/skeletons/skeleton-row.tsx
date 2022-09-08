// https://www.figma.com/file/w7E0mmB92eio0zHw7h9iS2/%5BREADY%5D-Skeletons-Specs?node-id=986%3A1161

import * as React from 'react';
import SkeletonCircle from './skeleton-circle';
import {SkeletonLine} from './skeleton-line';
import {useAnimation} from './styles';
import {createUseStyles} from '../jss';

const useRowStyles = createUseStyles(() => ({
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        flexShrink: 0,
    },
    line: {
        paddingLeft: 16,
        flexGrow: 1,
    },
}));

type SkeletonRowProps = {
    ariaValueText?: string;
    disableAnimation?: boolean;
};

const SkeletonRow = ({ariaValueText, disableAnimation = false}: SkeletonRowProps): JSX.Element => {
    const animationClasses = useAnimation({disableAnimation});
    const classes = useRowStyles();

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
            <div className={classes.circle}>
                <SkeletonCircle size={40} disableAnimation />
            </div>
            <div className={classes.line}>
                <SkeletonLine disableAnimation />
            </div>
        </div>
    );
};

export default SkeletonRow;
