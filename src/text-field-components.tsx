import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {useIsInverseVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {Text1} from './text';

export type InputState = 'focused' | 'filled' | 'default';

export const DEFAULT_WIDTH = 328;

export const LABEL_LEFT_POSITION = 12;

// to scale to the correct text-preset when the transition applies
export const LABEL_SCALE_DESKTOP = parseFloat('0.78'); // Text1/Text3 = 14/18 (desktop)
export const LABEL_SCALE_MOBILE = parseFloat('0.75'); // Text1/Text3 = 12/16 (mobile)

const useLabelStyles = createUseStyles((theme) => ({
    labelContainer: {
        position: 'absolute',
        pointerEvents: 'none',
        left: LABEL_LEFT_POSITION,
        top: 0,
        transformOrigin: '0 0',
        height: 24,
        display: 'flex',
        flexDirection: 'row',
        transform: 'translateY(18px) scale(1)',
        fontSize: 18, // cannot use Text3/Text1 preset comps because we want to apply a scale transition (zoom-out)
        lineHeight: '24px',
        color: ({inputState, error}) => {
            if (error && inputState !== 'default') {
                return theme.colors.error;
            }
            if (inputState === 'focused') {
                return theme.colors.controlActivated;
            }
            return theme.colors.textSecondary;
        },
        [theme.mq.tabletOrSmaller]: {
            fontSize: 16,
            transform: 'translateY(16px) scale(1)',
        },
        width: `calc(100% - ${LABEL_LEFT_POSITION * 2}px)`,
    },
    labelText: {
        '-webkit-line-clamp': 1,
        lineClamp: 1,
        wordBreak: 'break-all',
        display: 'box',
        overflow: 'hidden',
        boxOrient: 'vertical',
        flexShrink: 1,
    },
    shrinked: {
        transform: `translateY(8px) scale(${LABEL_SCALE_DESKTOP})`,
        height: 20 / LABEL_SCALE_DESKTOP, // Text1 line-height is the expected final line-height.
        lineHeight: `${20 / LABEL_SCALE_DESKTOP}px`,
        width: `calc(100% - ${LABEL_LEFT_POSITION * 2}px) / ${LABEL_SCALE_DESKTOP}`,
        [theme.mq.tabletOrSmaller]: {
            transform: `translateY(8px) scale(${LABEL_SCALE_MOBILE})`,
            height: 16 / LABEL_SCALE_MOBILE,
            lineHeight: `${16 / LABEL_SCALE_MOBILE}px`,
            width: `calc(100% - ${LABEL_LEFT_POSITION * 2}px) / ${LABEL_SCALE_MOBILE}`,
        },
    },
}));

type LabelProps = {
    shrinkLabel?: boolean;
    forId: string;
    inputState: InputState;
    error?: boolean;
    children: string;
    style?: React.CSSProperties;
    optional?: boolean;
};

export const Label: React.FC<LabelProps> = ({
    shrinkLabel,
    forId,
    inputState,
    error,
    children,
    style,
    optional,
}) => {
    const isShrinked = shrinkLabel || inputState === 'focused' || inputState === 'filled';
    const classes = useLabelStyles({inputState, error});
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
            className={classnames(classes.labelContainer, {[classes.shrinked]: isShrinked})}
            htmlFor={forId}
            style={{...style, transition: transitionStyle}}
        >
            <span className={classes.labelText}>{children}</span>
            {optional ? <span>&nbsp;({texts.formFieldOptionalLabelSuffix})</span> : null}
        </label>
    );
};

const useHelperTextStyles = createUseStyles(() => ({
    helperContainer: {
        paddingLeft: 12,
        paddingRight: 16,
        '& div': {
            margin: 0,
            marginTop: 4,
            flexGrow: 1,
        },
        display: 'flex',
    },
    leftText: {
        textAlign: 'left',
    },
    rightText: {
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
    const {colors} = useTheme();
    const classes = useHelperTextStyles();
    const leftColor = isInverse ? colors.textPrimaryInverse : error ? colors.error : colors.textSecondary;
    const rightColor = isInverse ? colors.textPrimaryInverse : colors.textSecondary;

    return (
        <div className={classes.helperContainer}>
            {leftText && (
                <div className={classes.leftText}>
                    <Text1 color={leftColor} regular as="p">
                        {leftText}
                    </Text1>
                </div>
            )}
            {rightText && (
                <div className={classes.rightText}>
                    <Text1 color={rightColor} regular as="p">
                        {rightText}
                    </Text1>
                </div>
            )}
        </div>
    );
};

const useFieldContainerStyles = createUseStyles((theme) => ({
    fieldContainer: {
        opacity: ({disabled}) => (disabled ? 0.5 : 1),
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
        borderRadius: 8,
        height: ({multiline}) => (multiline ? 152 : 60),
        [theme.mq.tabletOrSmaller]: {
            height: ({multiline}) => (multiline ? 152 : 56),
        },
        display: 'flex',
        position: 'relative',
        backgroundColor: ({readOnly}) =>
            readOnly ? theme.colors.neutralLow : theme.colors.backgroundContainer,
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
    readOnly?: boolean;
};

export const FieldContainer: React.FC<FieldContainerProps> = ({
    multiline,
    disabled,
    children,
    helperText,
    className,
    fieldRef,
    fullWidth,
    readOnly,
}) => {
    const classes = useFieldContainerStyles({multiline, fullWidth, disabled, readOnly});

    return (
        <div className={classes.fieldContainer}>
            <div className={classnames(classes.border, className)} ref={fieldRef}>
                {children}
            </div>
            {helperText}
        </div>
    );
};
