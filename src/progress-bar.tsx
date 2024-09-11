'use client';
import * as React from 'react';
import {useTheme} from './hooks';
import {vars} from './skins/skin-contract.css';
import * as styles from './progress-bar.css';
import {getPrefixedDataAttributes} from './utils/dom';
import classNames from 'classnames';
import Inline from './inline';

import type {DataAttributes} from './utils/types';

type ProgressBarProps = {
    progressPercent: number;
    color?: string;
    children?: void;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-hidden'?: React.HTMLAttributes<HTMLDivElement>['aria-hidden'];
    dataAttributes?: DataAttributes;
    reverse?: boolean;
};

export const ProgressBar = ({
    progressPercent,
    color,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-hidden': ariaHidden,
    dataAttributes,
    reverse = false,
}: ProgressBarProps): JSX.Element => {
    const {texts} = useTheme();
    const progressValue = Math.max(0, Math.min(100, progressPercent));

    const getFormattedLabel = () => {
        return `${ariaLabel || texts.loading}, ${progressValue}% ${texts.progressBarCompletedLabel}`;
    };

    const a11yProps =
        ariaHidden && ariaHidden !== 'false'
            ? {'aria-hidden': ariaHidden}
            : {
                  role: 'progressbar',
                  'aria-valuenow': progressValue,
                  'aria-valuemin': 0,
                  'aria-valuemax': 100,
                  'aria-label': ariaLabelledBy ? undefined : getFormattedLabel(),
                  'aria-labelledby': ariaLabelledBy,
              };

    return (
        <div
            {...getPrefixedDataAttributes(dataAttributes, 'ProgressBar')}
            className={styles.barBackground}
            {...a11yProps}
        >
            <div
                className={classNames(styles.bar, reverse ? styles.inverse : styles.normal)}
                style={{
                    maxWidth: `${progressValue}%`,
                    backgroundColor: color ?? vars.colors.controlActivated,
                }}
            />
        </div>
    );
};

type ProgressBarSteppedProps = {
    steps: number;
    currentStep?: number;
    color?: string;
    dataAttributes?: DataAttributes;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-hidden'?: React.HTMLAttributes<HTMLDivElement>['aria-hidden'];
};

export const ProgressBarStepped = ({
    steps,
    currentStep = 0,
    color,
    dataAttributes,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-hidden': ariaHidden,
}: ProgressBarSteppedProps): JSX.Element => {
    const {texts} = useTheme();

    const [step, setStep] = React.useState(Math.ceil(currentStep));
    const [isBack, setIsBack] = React.useState(false);

    React.useEffect(() => {
        const newStep = Math.ceil(currentStep);
        if (step !== newStep) {
            setIsBack(newStep < step);
            setStep(newStep);
        }
    }, [currentStep, steps, step]);

    const getFormattedLabel = () => {
        const label = texts.progressBarStepLabel.replace('1$s', String(step)).replace('2$s', String(steps));
        return ariaLabel ? `${ariaLabel}, ${label.toLowerCase()}` : label;
    };

    const a11yProps =
        ariaHidden && ariaHidden !== 'false'
            ? {'aria-hidden': ariaHidden}
            : {
                  role: 'progressbar',
                  'aria-valuenow': step,
                  'aria-valuemin': 0,
                  'aria-valuemax': steps,
                  'aria-label': ariaLabelledBy ? undefined : getFormattedLabel(),
                  'aria-labelledby': ariaLabelledBy,
              };

    return (
        <div
            {...getPrefixedDataAttributes(dataAttributes, 'ProgressBarStepped')}
            role="progressbar"
            {...a11yProps}
            className={styles.progressBarSteppedContainer}
        >
            <Inline space={8} fullWidth>
                {Array.from({length: steps}, (_, index) => {
                    const isCurrent = index === step;
                    const isCompleted = index < step;
                    const hasAnimation = index === step - 1;

                    return (
                        <div key={index} className={styles.barBackground} aria-hidden="true">
                            {(isCompleted || isCurrent) && (
                                <div
                                    className={classNames(styles.bar, {
                                        [styles.normal]: hasAnimation && !isBack,
                                        [styles.inverse]: isCurrent && isBack,
                                    })}
                                    style={{
                                        backgroundColor: color ?? vars.colors.controlActivated,
                                        maxWidth: isCompleted || (hasAnimation && !isBack) ? '100%' : '0',
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </Inline>
        </div>
    );
};
