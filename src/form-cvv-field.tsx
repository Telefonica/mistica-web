import * as React from 'react';
import {createUseStyles} from './jss';
import {getPlatform} from './utils/platform';
import {useTheme} from './hooks';
import IconCvvVisaMc from './icons/icon-cvv-visa-mc';
import IconCvvAmex from './icons/icon-cvv-amex';
import Tooltip from './tooltip';
import IconButton from './icon-button';
import IcnInfo from './icons/icon-info-cvv';
import {useForm} from './form-context';
import {TextFieldBase} from './text-field-base';
import {DecimalInput} from './form-decimal-field';

import type {CommonFormFieldProps} from './form';
import type {CardOptions} from './utils/credit-card';

const useStyles = createUseStyles((theme) => ({
    cvvText: {
        margin: 0,
        marginLeft: 16,
        color: theme.colors.textPrimary,
        lineHeight: 1.42857142,
        fontSize: 14,
        letterSpacing: getPlatform(theme.platformOverrides) === 'ios' ? 1.42857142 : undefined,
    },
    tooltipContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const TooltipContent = ({acceptedCards}: {acceptedCards: CardOptions}) => {
    const classes = useStyles();
    const {texts} = useTheme();

    return (
        <>
            <div className={classes.tooltipContainer}>
                <IconCvvVisaMc size={48} role="img" />
                <p className={classes.cvvText}>{texts.formCreditCardCvvTooltipVisaMc}</p>
            </div>
            {acceptedCards?.americanExpress && (
                <div className={classes.tooltipContainer}>
                    <IconCvvAmex size={48} role="img" />
                    <p className={classes.cvvText}>{texts.formCreditCardCvvTooltipAmex}</p>
                </div>
            )}
        </>
    );
};

export interface FormCvvFieldProps extends CommonFormFieldProps {
    acceptedCards?: CardOptions;
    onChangeValue?: (value: string, rawValue: string) => void;
}

export const FormCvvField: React.FC<FormCvvFieldProps> = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: validateProp,
    onChange,
    onChangeValue,
    onBlur,
    acceptedCards = {americanExpress: true, visa: true, masterCard: true},
    maxLength = 4,
    value,
    autoComplete = 'cc-csc',
    ...rest
}) => {
    const {texts} = useTheme();
    const {
        rawValues,
        setRawValue,
        values,
        setValue,
        formStatus,
        formErrors,
        setFormError,
        register,
        jumpToNext,
    } = useForm();

    const validate = (value: string, rawValue: string) => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
        if (value.length !== maxLength) {
            return texts.formCreditCardCvvError;
        }
        return validateProp?.(value, rawValue);
    };

    const processValue = (s: string) => s;

    return (
        <TextFieldBase
            {...rest}
            inputRef={(field) => register({name, field, validate})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={value ?? rawValues[name] ?? (rest.defaultValue ? undefined : '')}
            maxLength={maxLength}
            onChange={(event) => {
                const rawValue = event.currentTarget.value;
                const value = processValue(rawValue);

                setRawValue({name, value: rawValue});
                setValue({name, value});
                onChange?.(event);
                onChangeValue?.(value, rawValue);
                if (value.length === maxLength) {
                    const error = validate(value, rawValue);
                    if (error) {
                        setFormError({name, error});
                    } else {
                        jumpToNext(name);
                    }
                }
            }}
            onBlur={(e) => {
                setFormError({name, error: validate(values[name], rawValues[name])});
                onBlur?.(e);
            }}
            endIcon={
                <Tooltip
                    position="top"
                    children={<TooltipContent acceptedCards={acceptedCards} />}
                    targetLabel={texts.formCreditCardCvvTooltipVisaMcButton}
                    target={
                        <IconButton
                            size={24}
                            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        >
                            <IcnInfo size={18} />
                        </IconButton>
                    }
                />
            }
            autoComplete={autoComplete}
            inputComponent={DecimalInput}
        />
    );
};
