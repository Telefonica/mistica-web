import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import ResponsiveLayout from './responsive-layout';
import {Text7, Text8} from './text';
import {useTheme, useScreenSize} from './hooks';
import IconSuccess from './icons/icon-success';

const transition = '1s cubic-bezier(0.75, 0, 0.27, 1)';

const useStyles = createUseStyles(({colors}) => ({
    stepper: {
        display: 'flex',
        height: ({isDesktopOrBigger}) => (isDesktopOrBigger ? 64 : 24),
    },
    step: {
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: ({isDesktopOrBigger}) => (isDesktopOrBigger ? 'flex-start' : 'center'),
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
        height: 4,
        width: '100%',
        margin: '0 8px',
        background: colors.border,
        borderRadius: 4,
    },
    barFilled: {
        height: 4,
        width: '100%',
        transition: `width ${transition}`,
        animation: `$filledBar ${transition}`,
        background: colors.primary,
        borderRadius: 20,
    },

    '@keyframes filledBar': {
        '0%': {
            width: '0',
        },
    },
}));

type StepperProps = {
    steps: ReadonlyArray<{
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
        <ResponsiveLayout fullWidth>
            <div className={classes.stepper} role="group" aria-label="stepper">
                {steps.map(({text}, index) => {
                    const stepNumber = index + 1;
                    const currentNumber = stepNumber === currentStep;
                    const lastStep = index === steps.length - 1;
                    const isPassedStep = stepNumber < currentPosition;
                    const showIcon = index < currentStep - 1;

                    return (
                        <React.Fragment key={index}>
                            <div
                                key={index}
                                className={classes.step}
                                aria-label={text}
                                aria-current={currentNumber ? 'step' : undefined}
                            >
                                {showIcon ? (
                                    <div className={classes.stepIconNumber}>
                                        <IconSuccess
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
                                            color={isPassedStep ? colors.textPrimary : colors.textSecondary}
                                        >
                                            {text}
                                        </Text7>
                                    </div>
                                )}
                            </div>
                            {!lastStep && (
                                <div className={classes.bar}>
                                    {isPassedStep && !currentNumber && <div className={classes.barFilled} />}
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </ResponsiveLayout>
    );
};

export default Stepper;
