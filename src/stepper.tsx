import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {Text2, Text1} from './text';
import {useTheme, useScreenSize, useElementDimensions} from './hooks';
import IconSuccess from './icons/icon-success';

import {pxToRem} from './utils/css';

const transition = '1s cubic-bezier(0.75, 0, 0.27, 1)';

const useStyles = createUseStyles(({colors, mq}) => ({
    stepper: {
        display: 'flex',
        minHeight: 24,

        [mq.desktopOrBigger]: {
            minHeight: ({textContainerHeight}) => pxToRem(40 + textContainerHeight),
        },
        [mq.tabletOrSmaller]: {
            alignItems: 'center',
        },
    },
    step: {
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',

        '&:first-child': {
            alignItems: 'flex-start',
            textAlign: 'left',
        },
        '&:last-child': {
            alignItems: 'flex-end',
            textAlign: 'right',
        },
    },
    stepIconNumber: {
        position: 'relative',
        display: 'flex',
        height: ({isDesktopOrBigger}) =>
            isDesktopOrBigger ? `calc(${pxToRem(16)} + 16px)` : `calc(${pxToRem(8)} + 16px)`,
        width: ({isDesktopOrBigger}) =>
            isDesktopOrBigger ? `calc(${pxToRem(16)} + 16px)` : `calc(${pxToRem(8)} + 16px)`,
    },
    iconAnimation: {
        '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$stepIcon .3s ease-in-out',
            willChange: 'transform',
            transition: 'transform .3s ease-in-out',
        },
    },
    number: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${colors.borderDark}`,
        borderRadius: '50%',
    },
    currentNumber: {
        background: colors.controlActivated,
        borderColor: colors.controlActivated,
        animation: '$currentNumber .3s ease-in-out',
        willChange: 'border-color, background-color',
        transition: 'border-color .3s ease-in-out, background-color .3s ease-in-out',

        '& span': {
            animation: '$currentNumberText .3s ease-in-out',
            willChange: 'color',
            transition: 'color .3s ease-in-out',
        },
    },
    textContainer: {
        position: 'absolute',
        top: `calc(${pxToRem(24)} + 18px)`,
        width: 200,
    },
    barContainer: {
        position: 'absolute',
        left: 16,
        height: '100%',
        width: '100%',
    },
    bar: {
        height: 4,
        width: '100%',
        margin: '0 8px',
        background: colors.border,
        borderRadius: 4,
        overflow: 'hidden',

        '&:last-child': {
            display: 'none',
        },

        [mq.desktopOrBigger]: {
            position: 'relative',
            top: `calc(${pxToRem(8)} + 6px)`,
        },
    },
    barFilled: {
        height: 4,
        width: '100%',
        background: colors.controlActivated,
        borderRadius: 20,
        overflow: 'hidden',
    },
    barFilledAnimation: {
        transition: `width ${transition}`,
        animation: `$filledBar ${transition}`,
    },
    barFilledReverseAnimation: {
        width: 0,
        transition: `width ${transition}`,
        animation: `$reverseFilledBar ${transition}`,
    },

    '@keyframes filledBar': {
        '0%': {
            width: 0,
        },
    },
    '@keyframes reverseFilledBar': {
        '0%': {
            width: '100%',
        },
        // Needed this opacity trick to avoid a tiny bar that appear when the animation end
        '99%': {
            opacity: 1,
        },
        '100%': {
            opacity: 0,
        },
    },
    '@keyframes currentNumber': {
        '0%': {
            borderColor: colors.borderDark,
            backgroundColor: 'transparent',
        },
        '100%': {
            borderColor: colors.controlActivated,
            backgroundColor: colors.controlActivated,
        },
    },
    '@keyframes currentNumberText': {
        '0%': {
            color: colors.textSecondary,
        },
        '100%': {
            color: colors.textPrimaryInverse,
        },
    },
    '@keyframes stepIcon': {
        '0%': {
            backgroundColor: colors.controlActivated,
            transform: 'scale(1)',
        },
        '100%': {
            backgroundColor: colors.controlActivated,
            transform: 'scale(0)',
        },
    },
}));

type StepperProps = {
    steps: Array<string>;
    currentIndex: number;
    'aria-label'?: string;
};

const Stepper: React.FC<StepperProps> = ({steps, currentIndex, 'aria-label': ariaLabel}: StepperProps) => {
    const {colors} = useTheme();
    const {isDesktopOrBigger} = useScreenSize();
    const {height, ref} = useElementDimensions();
    const textContainerHeight = height;
    const classes = useStyles({isDesktopOrBigger, textContainerHeight});
    const previousIndexRef = React.useRef(currentIndex);
    const isBack = previousIndexRef.current > currentIndex;

    if (currentIndex !== previousIndexRef.current) {
        previousIndexRef.current = currentIndex;
    }

    return (
        <div className={classes.stepper}>
            {steps.map((text, index) => {
                const isCurrent = index === currentIndex;
                const isLastStep = index === steps.length - 1;
                const isCompleted = index < currentIndex;
                const hasAnimation = index === currentIndex - 1;

                return (
                    <React.Fragment key={index}>
                        <div
                            className={classes.step}
                            role="progressbar"
                            aria-valuenow={isCurrent ? index + 1 : undefined}
                            aria-valuemin={1}
                            aria-valuemax={steps.length}
                            aria-valuetext={text}
                            aria-label={ariaLabel}
                        >
                            {isCompleted ? (
                                <div
                                    className={classnames(classes.stepIconNumber, {
                                        [classes.iconAnimation]: hasAnimation && !isBack,
                                    })}
                                    role="presentation"
                                >
                                    <IconSuccess
                                        color={colors.controlActivated}
                                        size="100%"
                                        skipAnimation={!hasAnimation || isBack}
                                    />
                                </div>
                            ) : (
                                <div
                                    className={classnames(classes.stepIconNumber, classes.number, {
                                        [classes.currentNumber]: isCurrent || isCurrent,
                                    })}
                                >
                                    <Text1
                                        medium
                                        color={isCurrent ? colors.textPrimaryInverse : colors.textSecondary}
                                        role="presentation"
                                    >
                                        {index + 1}
                                    </Text1>
                                </div>
                            )}
                            {isDesktopOrBigger && (
                                <div className={classes.textContainer} ref={ref} role="presentation">
                                    <Text2
                                        regular
                                        color={
                                            isCompleted || isCurrent
                                                ? colors.textPrimary
                                                : colors.textSecondary
                                        }
                                    >
                                        {text}
                                    </Text2>
                                </div>
                            )}
                        </div>
                        {!isLastStep && (
                            <div className={classes.bar} role="presentation">
                                {(isCompleted || isCurrent) && (
                                    <div
                                        className={classnames({
                                            [classes.barFilled]: (isBack && isCurrent) || isCompleted,
                                            [classes.barFilledAnimation]: hasAnimation && !isBack,
                                            [classes.barFilledReverseAnimation]: isCurrent && isBack,
                                        })}
                                    />
                                )}
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Stepper;
