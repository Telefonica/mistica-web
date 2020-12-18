import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import ResponsiveLayout from './responsive-layout';
import {Text7, Text8} from './text';
import {useTheme, useScreenSize} from './hooks';
import IconChecked from './icons/icon-checked';

const useStyles = createUseStyles(({colors}) => ({
    stepper: {
        display: 'flex',
    },
    step: {
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        height: ({isDesktopOrBigger}) => (isDesktopOrBigger ? 32 : 24),
        width: ({isDesktopOrBigger}) => (isDesktopOrBigger ? 32 : 24),
    },
    barContainer: {
        position: 'absolute',
        left: 16,
        height: '100%',
        width: '100%',
    },
    bar: {
        position: 'relative',
        top: ({isDesktopOrBigger}) => (isDesktopOrBigger ? 14 : 10),
        display: 'flex',
        justifyContent: 'center',
        height: 4,
        width: '100%',
        margin: '0 8px',
        background: colors.border,
        borderRadius: 4,
    },
    barPassed: {
        background: colors.primary,
    },
    number: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${colors.borderDark}`,
        borderRadius: '50%',
    },
    numberPassed: {
        background: colors.primary,
        borderColor: colors.primary,
    },
    textContainer: {
        position: 'absolute',
        top: 42,
        width: 200,
    },
}));

type StepperProps = {
    steps: Array<{
        readonly text: string;
    }>;
    currentStep: number;
};

const Stepper: React.FC<StepperProps> = ({steps, currentStep}: StepperProps) => {
    const {colors} = useTheme();
    const {isDesktopOrBigger} = useScreenSize();
    const classes = useStyles({isDesktopOrBigger});
    const currentPosition = currentStep + 1;

    return (
        <div role="group" aria-label="progress">
            <ResponsiveLayout fullWidth>
                <div className={classes.stepper}>
                    {steps.map(({text}, index) => {
                        const stepNumber = index + 1;
                        const currentNumber = stepNumber === currentStep;
                        const lastStep = index === steps.length - 1;
                        const isPassedStep = stepNumber < currentPosition;
                        const showIcon = index < currentStep - 1;

                        return (
                            <>
                                <div
                                    key={index}
                                    className={classes.step}
                                    aria-label={text}
                                    aria-current={currentNumber ? 'step' : undefined}
                                >
                                    {showIcon ? (
                                        <div className={classes.stepIconNumber}>
                                            <IconChecked
                                                color={colors.primary}
                                                size={isDesktopOrBigger ? 32 : 24}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className={classnames(classes.stepIconNumber, classes.number, {
                                                [classes.numberPassed]: isPassedStep,
                                            })}
                                        >
                                            {isDesktopOrBigger ? (
                                                <Text7
                                                    medium
                                                    color={
                                                        isPassedStep
                                                            ? colors.textPrimarySpecial
                                                            : colors.textSecondary
                                                    }
                                                >
                                                    {stepNumber}
                                                </Text7>
                                            ) : (
                                                <Text8
                                                    medium
                                                    color={
                                                        isPassedStep
                                                            ? colors.textPrimarySpecial
                                                            : colors.textSecondary
                                                    }
                                                >
                                                    {stepNumber}
                                                </Text8>
                                            )}
                                        </div>
                                    )}
                                    {isDesktopOrBigger && (
                                        <div className={classes.textContainer}>
                                            <Text7
                                                regular
                                                color={
                                                    isPassedStep ? colors.textPrimary : colors.textSecondary
                                                }
                                            >
                                                {text}
                                            </Text7>
                                        </div>
                                    )}
                                </div>
                                {!lastStep && (
                                    <div
                                        className={classnames(classes.bar, {
                                            [classes.barPassed]: isPassedStep && !currentNumber,
                                        })}
                                    />
                                )}
                            </>
                        );
                    })}
                </div>
            </ResponsiveLayout>
        </div>
    );
};

export default Stepper;
