'use client';
import * as React from 'react';
import classnames from 'classnames';
import {Text2, Text1} from './text';
import {useScreenSize, useElementDimensions, useTheme} from './hooks';
import IconSuccess from './icons/icon-success';
import * as styles from './stepper.css';
import {pxToRem, applyCssVars} from './utils/css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

type StepperProps = {
    steps: ReadonlyArray<string>;
    currentIndex: number;
    'aria-label'?: string;
    children?: void;
    dataAttributes?: DataAttributes;
};

const Stepper: React.FC<StepperProps> = ({
    steps,
    currentIndex,
    'aria-label': ariaLabel,
    dataAttributes,
}: StepperProps) => {
    const {textPresets} = useTheme();
    const {isDesktopOrBigger} = useScreenSize();
    const {height, ref} = useElementDimensions();
    const textContainerHeight = height;

    const [step, setStep] = React.useState(Math.ceil(currentIndex));
    const [isBack, setIsBack] = React.useState(false);

    React.useEffect(() => {
        const newStep = Math.ceil(currentIndex);
        if (step !== newStep) {
            setIsBack(newStep < step);
            setStep(newStep);
        }
    }, [currentIndex, steps, step]);

    return (
        <div
            className={styles.stepper}
            style={applyCssVars({
                [styles.vars.stepperMinHeight]: pxToRem(40 + textContainerHeight),
            })}
            {...getPrefixedDataAttributes(dataAttributes, 'Stepper')}
        >
            {steps.map((text, index) => {
                const isCurrent = index === step;
                const isLastStep = index === steps.length - 1;
                const isCompleted = index < step;
                const hasAnimation = index === step - 1;

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
                                        color={vars.colors.controlActivated}
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
                                        weight={textPresets.indicator.weight}
                                        color={
                                            isCurrent
                                                ? vars.colors.textPrimaryInverse
                                                : vars.colors.textSecondary
                                        }
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
                                                ? vars.colors.textPrimary
                                                : vars.colors.textSecondary
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
