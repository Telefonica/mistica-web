'use client';
import * as React from 'react';
import classnames from 'classnames';
import {Text2, Text1} from './text';
import {useElementDimensions, useTheme} from './hooks';
import * as tokens from './text-tokens';
import IconSuccess from './icons/icon-success';
import * as styles from './stepper.css';
import {pxToRem, applyCssVars} from './utils/css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import ScreenReaderOnly from './screen-reader-only';

import type {DataAttributes} from './utils/types';

type StepperProps = {
    steps: ReadonlyArray<string>;
    currentIndex: number;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-description'?: string;
    'aria-describedby'?: string;
    dataAttributes?: DataAttributes;
};

const Stepper = ({
    steps,
    currentIndex,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-description': ariaDescription,
    'aria-describedby': ariaDescribedby,
    dataAttributes,
}: StepperProps): JSX.Element => {
    const {texts, t, textPresets} = useTheme();
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

    const completedText = texts.stepperCompletedStep || t(tokens.stepperCompletedStep);
    const currentText = texts.stepperCurrentStep || t(tokens.stepperCurrentStep);

    return (
        // The explicit role="list" is needed for Safari VoiceOver when setting css list-style: none
        // aria-description is not supported by the eslint rule
        // eslint-disable-next-line jsx-a11y/no-redundant-roles, jsx-a11y/role-supports-aria-props
        <ol
            role="list"
            className={styles.stepper}
            style={applyCssVars({
                [styles.vars.stepperMinHeight]: pxToRem(40 + textContainerHeight),
            })}
            {...getPrefixedDataAttributes(dataAttributes, 'Stepper')}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-description={ariaDescription}
            aria-describedby={ariaDescribedby}
        >
            {steps.map((text, index) => {
                const isCurrent = index === step;
                const isLastStep = index === steps.length - 1;
                const isCompleted = index < step;
                const hasAnimation = index === step - 1;

                return (
                    <li
                        key={index}
                        className={styles.listItem}
                        style={isLastStep ? undefined : {flex: 1}}
                        aria-current={isCurrent ? 'step' : undefined}
                    >
                        <div className={styles.step}>
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

                            <div className={styles.textContainer} aria-hidden="true" ref={ref}>
                                <Text2
                                    as="div"
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

                            <ScreenReaderOnly>
                                <span>{`${isCompleted ? `${completedText}: ` : isCurrent ? `${currentText}: ` : ''}${text}`}</span>
                            </ScreenReaderOnly>
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
                    </li>
                );
            })}
        </ol>
    );
};

export default Stepper;
