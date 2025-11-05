'use client';
import * as React from 'react';
import classnames from 'classnames';
import {useIsInverseOrMediaVariant} from './theme-variant-context';
import {useTheme} from './hooks';
import {Text1} from './text';
import * as styles from './text-field-components.css';
import {vars} from './skins/skin-contract.css';
import {getPrefixedDataAttributes} from './utils/dom';
import * as tokens from './text-tokens';
import IconWarningRegular from './generated/mistica-icons/icon-warning-regular';
import ScreenReaderOnly from './screen-reader-only';

import type {DataAttributes} from './utils/types';

export type InputState = 'focused' | 'filled' | 'default';

type LabelProps = {
    shrinkLabel?: boolean;
    forId: string;
    inputState: InputState;
    error?: boolean;
    children: string;
    style?: React.CSSProperties;
    showOptional?: boolean;
};

export const Label = ({
    shrinkLabel,
    forId,
    inputState,
    error,
    children,
    style,
    showOptional,
}: LabelProps): JSX.Element => {
    const isShrinked = shrinkLabel || inputState === 'focused' || inputState === 'filled';
    const [transitionStyle, setTransitionStyle] = React.useState('initial');
    const {texts, t} = useTheme();

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

    let color = vars.colors.textSecondary;
    if (error && inputState !== 'default') {
        color = vars.colors.textError;
    } else if (inputState === 'focused') {
        color = vars.colors.textActivated;
    }

    return (
        <label
            className={classnames(styles.labelContainer, {[styles.shrinked]: isShrinked})}
            htmlFor={forId}
            style={{color, ...style, transition: transitionStyle}}
            data-testid="label"
        >
            <span className={styles.labelText}>{children}</span>
            {showOptional ? (
                <span>
                    &nbsp;(
                    {texts.formFieldOptionalLabelSuffix || t(tokens.formFieldOptionalLabelSuffix)})
                </span>
            ) : null}
        </label>
    );
};

type HelperTextProps = {
    leftText?: string;
    rightText?: string;
    rightTextLabel?: string;
    error?: boolean;
    leftTextId?: string;
    rightTextId?: string;
    children?: void;
};

export const HelperText = ({
    leftText,
    leftTextId,
    rightText,
    rightTextId,
    rightTextLabel,
    error,
}: HelperTextProps): JSX.Element => {
    const isInverse = useIsInverseOrMediaVariant();
    const leftColor = isInverse
        ? vars.colors.textPrimaryInverse
        : error
          ? vars.colors.textError
          : vars.colors.textSecondary;
    const rightColor = isInverse ? vars.colors.textPrimaryInverse : vars.colors.textSecondary;

    return (
        <>
            {leftText && (
                <p
                    className={classnames(styles.helperText, styles.leftHelperText)}
                    data-testid={error ? 'errorText' : 'helperText'}
                >
                    {error && (
                        <Text1 regular>
                            <IconWarningRegular color={leftColor} className={styles.warnIcon} />
                        </Text1>
                    )}
                    <Text1
                        color={leftColor}
                        regular
                        id={leftTextId}
                        aria-live={error ? 'assertive' : undefined}
                    >
                        {leftText}
                    </Text1>
                </p>
            )}
            {rightText && (
                <div
                    className={classnames(styles.helperText, {[styles.rightHelperText]: !!leftText})}
                    data-testid="endHelperText"
                >
                    <Text1
                        color={rightColor}
                        regular
                        as="p"
                        textAlign="right"
                        wordBreak={false}
                        id={rightTextId}
                    >
                        {rightTextLabel && (
                            <ScreenReaderOnly>
                                <span>{rightTextLabel}</span>
                            </ScreenReaderOnly>
                        )}
                        <span aria-hidden={rightTextLabel !== undefined}>{rightText}</span>
                    </Text1>
                </div>
            )}
        </>
    );
};

type FieldContainerProps = {
    multiline?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    helperText?: React.ReactNode;
    className?: string;
    fieldRef?: React.RefObject<HTMLDivElement>;
    fullWidth?: boolean;
    readOnly?: boolean;
    dataAttributes?: DataAttributes;
};

export const FieldContainer = ({
    multiline,
    disabled,
    children,
    helperText,
    className,
    fieldRef,
    fullWidth,
    readOnly,
    dataAttributes,
}: FieldContainerProps): JSX.Element => {
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={classnames(styles.fieldContainer, fullWidth ? styles.fullWidth : styles.normalWidth, {
                [styles.disabled]: disabled,
            })}
            onClick={(e) => {
                // We want to focus the input when the user clicks anywhere in the container (like in the label or the prefix)
                e.currentTarget.querySelector(multiline ? 'textarea' : 'input')?.focus();
            }}
            {...getPrefixedDataAttributes(dataAttributes)}
        >
            <div
                className={classnames(
                    styles.field,
                    readOnly ? styles.background.readOnly : styles.background.default,
                    className
                )}
                ref={fieldRef}
            >
                {children}
            </div>
            {helperText && <div className={styles.helperContainer}>{helperText}</div>}
        </div>
    );
};
