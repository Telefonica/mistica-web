import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import ResponsiveLayout from './responsive-layout';
import {Text7, Text8} from './text';
import {useTheme, useScreenSize} from './hooks';
import IconChecked from './icons/icon-checked';

const bigStepStyles = {
    flex: '0 1 208px',
    padding: `16px 32px`,
    maxWidth: 284,
};

const useStyles = createUseStyles(({colors, mq}) => ({
    stepper: {
        display: 'flex',
        height: ({isDesktopOrBigger}) => (isDesktopOrBigger ? 64 : 32),
    },
    step: {
        display: 'inline-flex',
        flexDirection: 'column',
        flex: '1 0 80px',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        verticalAlign: 'baseline',
        height: ({isDesktopOrBigger}) => (isDesktopOrBigger ? 64 : 32),
        textAlign: 'center',
        borderBottom: '2px solid transparent',

        [mq.desktop]: bigStepStyles,
        [mq.largeDesktop]: bigStepStyles,

        '&:first-child': {
            flex: '1 0 40px',
            alignItems: 'flex-start',
        },
        '&:last-child': {
            flex: '1 0 40px',
            alignItems: 'flex-end',
        },
    },
    stepSelected: {
        borderBottom: `2px solid ${colors.controlActive}`,
    },
    number: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: ({isDesktopOrBigger}) => (isDesktopOrBigger ? 32 : 24),
        minWidth: ({isDesktopOrBigger}) => (isDesktopOrBigger ? 32 : 24),
        border: `2px solid ${colors.borderDark}`,
        borderRadius: '50%',
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
                        const isPassedStep = stepNumber < currentPosition;
                        const showIcon = index < currentStep - 1;

                        return (
                            <div
                                key={index}
                                className={classnames(classes.step, currentNumber && classes.stepSelected)}
                                aria-label={text}
                                aria-current={currentNumber ? 'step' : undefined}
                            >
                                {showIcon ? (
                                    <IconChecked size={isDesktopOrBigger ? 32 : 24} />
                                ) : (
                                    <div className={classes.number}>
                                        {isDesktopOrBigger ? (
                                            <Text7 medium color={colors.textSecondary}>
                                                {stepNumber}
                                            </Text7>
                                        ) : (
                                            <Text8 medium color={colors.textSecondary}>
                                                {stepNumber}
                                            </Text8>
                                        )}
                                    </div>
                                )}
                                {isDesktopOrBigger && (
                                    <Text7
                                        regular
                                        color={isPassedStep ? colors.textPrimary : colors.textSecondary}
                                    >
                                        {text}
                                    </Text7>
                                )}
                            </div>
                        );
                    })}
                </div>
            </ResponsiveLayout>
        </div>
    );
};

export default Stepper;
