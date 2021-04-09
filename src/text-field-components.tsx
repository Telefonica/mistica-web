import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';

export type InputState = 'focused' | 'filled' | 'default';

export const DEFAULT_WIDTH = 328;

const useLabelStyles = createUseStyles((theme) => ({
    label: {
        position: 'absolute',
        pointerEvents: 'none',
        left: 12,
        top: 0,
        fontSize: 16,
        transformOrigin: 0,
        height: 16,
        transform: ({inputState, shrinkLabel}: {inputState: InputState; shrinkLabel: boolean}) =>
            shrinkLabel
                ? 'translateY(8px) scale(.75)'
                : {
                      focused: 'translateY(8px) scale(.75)',
                      filled: 'translateY(8px) scale(.75)',
                      default: 'translateY(20px) scale(1)',
                  }[inputState],
        color: ({inputState, error, disabled}) => {
            if (inputState === 'default' && disabled) {
                return theme.colors.textDisabled;
            }
            if (error && inputState !== 'default') {
                return theme.colors.error;
            }
            if (inputState === 'focused') {
                return theme.colors.controlActivated;
            }
            return theme.colors.textSecondary;
        },
    },
}));

type LabelProps = {
    shrinkLabel?: boolean;
    forId: string;
    inputState: InputState;
    error?: boolean;
    children: string;
    disabled?: boolean;
    style?: React.CSSProperties;
};

export const Label: React.FC<LabelProps> = ({
    shrinkLabel,
    forId,
    inputState,
    error,
    children,
    disabled,
    style,
}) => {
    const classes = useLabelStyles({shrinkLabel, inputState, error, disabled});
    const [transitionStyle, setTransitionStyle] = React.useState('');

    // This way we prevent animation when field is filled as initial state
    React.useEffect(() => {
        const tid = setTimeout(() => {
            // Check environment or we will get a warning if this gets executed outside @testing-library/act
            if (process.env.NODE_ENV !== 'test') {
                setTransitionStyle('transform 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms');
            }
        });
        return () => {
            clearTimeout(tid);
        };
    }, []);

    return (
        <label className={classes.label} htmlFor={forId} style={{...style, transition: transitionStyle}}>
            {children}
        </label>
    );
};

const useHelperTextStyles = createUseStyles((theme) => ({
    helperContainer: {
        lineHeight: 1.4,
        paddingLeft: 14,
        paddingRight: 16,
        '& p': {
            margin: 0,
            marginTop: 4,
            fontSize: 12,
            flexGrow: 1,
        },
        display: 'flex',
    },
    leftText: {
        color: ({error, isInverse}) => {
            if (isInverse) {
                return theme.colors.textPrimaryInverse;
            }
            if (error) {
                return theme.colors.error;
            }
            return theme.colors.textSecondary;
        },
        textAlign: 'left',
    },
    rightText: {
        color: ({isInverse}) => (isInverse ? theme.colors.textPrimaryInverse : theme.colors.textSecondary),
        textAlign: 'right',
    },
}));

type HelperTextProps = {
    leftText?: string;
    rightText?: string;
    error?: boolean;
};

export const HelperText: React.FC<HelperTextProps> = ({leftText, rightText, error}) => {
    const isInverse = useIsInverseVariant();
    const classes = useHelperTextStyles({error, isInverse});

    return (
        <div className={classes.helperContainer}>
            {leftText && <p className={classes.leftText}>{leftText}</p>}
            {rightText && <p className={classes.rightText}>{rightText}</p>}
        </div>
    );
};

const useFieldContainerStyles = createUseStyles((theme) => ({
    fieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 96,
        [theme.mq.mobile]: {
            width: '100%',
        },
        [theme.mq.tabletOrBigger]: {
            width: ({fullWidth}) => (fullWidth ? '100%' : DEFAULT_WIDTH),
        },
    },
    border: {
        overflow: 'hidden',
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 4,
        height: ({multiline}) => (multiline ? 152 : 56),
        display: 'flex',
        position: 'relative',
        lineHeight: '16px',
        backgroundColor: theme.colors.backgroundContainer,
    },
}));

type FieldContainerProps = {
    multiline?: boolean;
    children: React.ReactNode;
    helperText?: React.ReactNode;
    className?: string;
    fieldRef?: React.RefObject<HTMLDivElement>;
    fullWidth?: boolean;
};

export const FieldContainer: React.FC<FieldContainerProps> = ({
    multiline,
    children,
    helperText,
    className,
    fieldRef,
    fullWidth,
}) => {
    const classes = useFieldContainerStyles({multiline, fullWidth});

    return (
        <div className={classes.fieldContainer}>
            <div className={classnames(classes.border, className)} ref={fieldRef}>
                {children}
            </div>
            {helperText}
        </div>
    );
};
