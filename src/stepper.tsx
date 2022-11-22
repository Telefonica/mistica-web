import * as React from 'react';
import classnames from 'classnames';
import {Text2, Text1} from './text';
import {useTheme, useScreenSize, useElementDimensions} from './hooks';
import IconSuccess from './icons/icon-success';
import * as styles from './stepper.css';
import {pxToRem} from './utils/css';
import {assignInlineVars} from '@vanilla-extract/dynamic';

type StepperProps = {
    steps: ReadonlyArray<string>;
    currentIndex: number;
    'aria-label'?: string;
    children?: void;
};

const Stepper: React.FC<StepperProps> = ({steps, currentIndex, 'aria-label': ariaLabel}: StepperProps) => {
    const {colors} = useTheme();
    const {isDesktopOrBigger} = useScreenSize();
    const {height, ref} = useElementDimensions();
    const textContainerHeight = height;
    const previousIndexRef = React.useRef(currentIndex);
    const isBack = previousIndexRef.current > currentIndex;

    const vars = assignInlineVars({
        [styles.vars.stepperMinHeight]: pxToRem(40 + textContainerHeight),
    });

    if (currentIndex !== previousIndexRef.current) {
        previousIndexRef.current = currentIndex;
    }

    return (
        <div className={styles.stepper} style={vars}>
            {steps.map((text, index) => {
                const isCurrent = index === currentIndex;
                const isLastStep = index === steps.length - 1;
                const isCompleted = index < currentIndex;
                const hasAnimation = index === currentIndex - 1;

                return (
                    <React.Fragment key={index}>
                        <div
                            className={styles.step}
                            role="progressbar"
                            aria-valuenow={isCurrent ? index + 1 : undefined}
                            aria-valuemin={1}
                            aria-valuemax={steps.length}
                            aria-valuetext={text}
                            aria-label={ariaLabel}
                        >
                            {isCompleted ? (
                                <div
                                    className={classnames(styles.stepIconNumber, {
                                        [styles.iconAnimation]: hasAnimation && !isBack,
                                    })}
                                    aria-hidden="true"
                                >
                                    <IconSuccess
                                        color={colors.controlActivated}
                                        size="100%"
                                        skipAnimation={!hasAnimation || isBack}
                                    />
                                </div>
                            ) : (
                                <div
                                    className={classnames(styles.stepIconNumber, styles.number, {
                                        [styles.currentNumber]: isCurrent || isCurrent,
                                    })}
                                >
                                    <Text1
                                        as="span"
                                        medium
                                        color={isCurrent ? colors.textPrimaryInverse : colors.textSecondary}
                                        aria-hidden="true"
                                    >
                                        {index + 1}
                                    </Text1>
                                </div>
                            )}
                            {isDesktopOrBigger && (
                                <div className={styles.textContainer} ref={ref} aria-hidden="true">
                                    <Text2
                                        as="span"
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
                            <div className={styles.bar} aria-hidden="true">
                                {(isCompleted || isCurrent) && (
                                    <div
                                        className={classnames({
                                            [styles.barFilled]: (isBack && isCurrent) || isCompleted,
                                            [styles.barFilledAnimation]: hasAnimation && !isBack,
                                            [styles.barFilledReverseAnimation]: isCurrent && isBack,
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
