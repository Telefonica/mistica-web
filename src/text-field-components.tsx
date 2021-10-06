import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import {useTheme} from './hooks';

export type InputState = 'focused' | 'filled' | 'default';

export const DEFAULT_WIDTH = 328;

const LABEL_LEFT_POSITION = 12;
const LABEL_SCALE = 0.75;

const useLabelStyles = createUseStyles((theme) => ({
    labelContainer: {
        lineHeight: '1em',
        position: 'absolute',
        pointerEvents: 'none',
        left: LABEL_LEFT_POSITION,
        top: 0,
        fontSize: 16,
        transformOrigin: 0,
        height: 16,
        display: 'flex',
        flexDirection: 'row',
        transform: ({isShrinked}) =>
            isShrinked ? `translateY(8px) scale(${LABEL_SCALE})` : 'translateY(20px) scale(1)',

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
        width: ({isShrinked}) =>
            isShrinked
                ? `calc((100% - ${LABEL_LEFT_POSITION * 2}px) / ${LABEL_SCALE})`
                : `calc(100% - ${LABEL_LEFT_POSITION * 2}px)`,
    },
    labelText: {
        '-webkit-line-clamp': 1,
        lineClamp: 1,
        wordBreak: 'break-all',
        display: 'box',
        overflow: 'hidden',
        boxOrient: 'vertical',
        flexShrink: 1,
        // this is needed because at 1em, font descendants are cutted when using overflow hidden
        // setting a higher height is not an option because it shows the next line
        lineHeight: '1.2em',
        height: '1.2em',
        position: 'relative',
        top: '-0.1em',
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
    optional?: boolean;
};

export const Label: React.FC<LabelProps> = ({
    shrinkLabel,
    forId,
    inputState,
    error,
    children,
    disabled,
    style,
    optional,
}) => {
    const isShrinked = shrinkLabel || inputState === 'focused' || inputState === 'filled';
    const classes = useLabelStyles({isShrinked, inputState, error, disabled});
    const [transitionStyle, setTransitionStyle] = React.useState('');
    const {texts} = useTheme();

    // This way we prevent animation when field is filled as initial state
    React.useEffect(() => {
        const tid = setTimeout(() => {
            // Check environment or we will get a warning if this gets executed outside @testing-library/act
            if (process.env.NODE_ENV !== 'test') {
                setTransitionStyle('transform 150ms, width 150ms');
            }
        });
        return () => {
            clearTimeout(tid);
        };
    }, []);

    return (
        <label
            className={classes.labelContainer}
            htmlFor={forId}
            style={{...style, transition: transitionStyle}}
        >
            <span className={classes.labelText}>{children}</span>
            {optional ? <span>&nbsp;({texts.formFieldOptionalLabelSuffix})</span> : null}
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
    children?: void;
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
        [theme.mq.tabletOrSmaller]: {
            width: '100%',
        },
        [theme.mq.desktopOrBigger]: {
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
        backgroundColor: ({disabled}) =>
            disabled ? theme.colors.backgroundAlternative : theme.colors.backgroundContainer,
        cursor: ({disabled}) => (disabled ? 'not-allowed' : 'initial'),
    },
}));

type FieldContainerProps = {
    multiline?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    helperText?: React.ReactNode;
    className?: string;
    fieldRef?: React.RefObject<HTMLDivElement>;
    fullWidth?: boolean;
};

export const FieldContainer: React.FC<FieldContainerProps> = ({
    multiline,
    disabled,
    children,
    helperText,
    className,
    fieldRef,
    fullWidth,
}) => {
    const classes = useFieldContainerStyles({multiline, fullWidth, disabled});

    return (
        <div className={classes.fieldContainer}>
            <div className={classnames(classes.border, className)} ref={fieldRef}>
                {children}
            </div>
            {helperText}
        </div>
    );
};
