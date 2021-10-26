import * as React from 'react';
import classnames from 'classnames';
import {createUseStyles} from './jss';
import {ThemeVariant, useIsInverseVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {Text1, Text3} from './text';

export type InputState = 'focused' | 'filled' | 'default';

export const DEFAULT_WIDTH = 328;

export const LABEL_LEFT_POSITION = 12;

const NBSP = '\u00A0';

const useLabelStyles = createUseStyles((theme) => ({
    labelContainer: {
        position: 'absolute',
        pointerEvents: 'none',
        left: LABEL_LEFT_POSITION,
        top: 0,
        transformOrigin: 0,
        height: 24,
        display: 'flex',
        flexDirection: 'row',
        transform: 'translateY(18px)',
        [theme.mq.tabletOrSmaller]: {
            transform: 'translateY(16px)',
        },
        width: `calc(100% - ${LABEL_LEFT_POSITION * 2}px)`,
    },
    shrinked: {
        transform: 'translateY(8px)',
        height: 20,
        [theme.mq.tabletOrSmaller]: {
            height: 16,
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
    const {texts, colors} = useTheme();

    let color: string;
    if (inputState === 'default' && disabled) {
        color = colors.textDisabled;
    } else if (error && inputState !== 'default') {
        color = colors.error;
    } else if (inputState === 'focused') {
        color = colors.controlActivated;
    } else {
        color = colors.textSecondary;
    }

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
    const renderText = (
        isShrinked: boolean,
        color: string,
        children: React.ReactNode | string,
        truncate = false
    ) => {
        const props = {regular: true, as: 'span', color, truncate};
        if (isShrinked) {
            return <Text1 {...props}>{children}</Text1>;
        } else {
            return <Text3 {...props}>{children}</Text3>;
        }
    };

    return (
        <label
            className={classnames(classes.labelContainer, {[classes.shrinked]: isShrinked})}
            htmlFor={forId}
            style={{...style, transition: transitionStyle}}
        >
            {renderText(isShrinked, color, children, true)}
            {optional
                ? renderText(isShrinked, color, `${NBSP}(${texts.formFieldOptionalLabelSuffix})`) // using unicode for &nbsp; because jsx string scapes it
                : null}
        </label>
    );
};

const useHelperTextStyles = createUseStyles(() => ({
    helperContainer: {
        paddingLeft: 14,
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
        height: ({multiline}) => (multiline ? 152 : 60),
        [theme.mq.tabletOrSmaller]: {
            height: ({multiline}) => (multiline ? 152 : 56),
        },
        display: 'flex',
        position: 'relative',
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
            <ThemeVariant isInverse={false}>
                <div className={classnames(classes.border, className)} ref={fieldRef}>
                    {children}
                </div>
            </ThemeVariant>
            {helperText}
        </div>
    );
};
