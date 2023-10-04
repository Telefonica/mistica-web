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
    dataAttributes?: DataAttributes;
    reverse?: boolean;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progressPercent,
    color,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    dataAttributes,
    reverse = false,
}) => {
    const {texts} = useTheme();
    const defaultLabel = texts.loading;
    const label = ariaLabelledBy ? undefined : ariaLabel || defaultLabel;
    const progressValue = Math.max(0, Math.min(100, progressPercent));
    return (
        <div
            {...getPrefixedDataAttributes(dataAttributes, 'ProgressBar')}
            className={styles.barBackground}
            role="progressbar"
            aria-valuenow={progressValue}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
            aria-labelledby={ariaLabelledBy}
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
    reverse?: boolean;
};

export const ProgressBarStepped: React.FC<ProgressBarSteppedProps> = ({
    steps,
    currentStep = 0,
    color,
    dataAttributes,
    reverse = false,
}) => {
    const [step, setStep] = React.useState(reverse ? steps : 0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    /** If reverse value changed, we reset the initial state of all the progress bars */
    const reverseValue = React.useRef(reverse);
    React.useEffect(() => {
        const initialStep = reverse ? steps : 0;
        if (reverseValue.current !== reverse) {
            reverseValue.current = reverse;
            setStep(initialStep);
        }
    }, [reverse, steps]);

    React.useEffect(() => {
        const currentStepValue = Math.max(0, Math.min(steps, Math.ceil(currentStep)));
        let timeoutId: NodeJS.Timeout;
        if (!isAnimating && step !== currentStepValue) {
            setIsAnimating(true);
            if (step < currentStepValue) {
                setStep(step + 1);
            } else {
                setStep(step - 1);
            }
            timeoutId = setTimeout(() => setIsAnimating(false), 1000);
        }
        return () => {
            if (isAnimating) {
                clearTimeout(timeoutId);
            }
        };
    }, [isAnimating, step, currentStep, steps]);

    return (
        <Inline
            space={8}
            fullWidth
            dataAttributes={{'component-name': 'ProgressBarStepped', ...dataAttributes}}
        >
            {Array.from({length: steps}, (_, idx) => {
                return (
                    <ProgressBar
                        // this key allows to reset all the progress bars if reverse value changed
                        key={String(idx) + String(reverseValue.current)}
                        progressPercent={idx < step ? 100 : 0}
                        color={color}
                        reverse={reverse}
                    />
                );
            })}
        </Inline>
    );
};
