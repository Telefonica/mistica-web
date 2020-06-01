// @flow
import * as React from 'react';
import {createUseStyles} from './jss';
import {getPlatform} from './utils/platform';
import {useTheme} from './hooks';
import IcnCvvVisaMc from './icons/icon-cvv-visa-mc';
import IcnCvvAmex from './icons/icon-cvv-amex';
import Tooltip from './tooltip';
import IconButton from './icon-button';
import IcnInfo from './icons/icn-info-cvv';
import TextField from './text-field';
import {useForm} from './form-context';

import type {CommonFormFieldProps} from './form';
import type {CardOptions} from './utils/credit-card';

const useStyles = createUseStyles((theme) => ({
    cvvText: {
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
                <IcnCvvVisaMc size={48} role="img" />
                <p className={classes.cvvText}>{texts.formCreditCardCvvTooltipVisaMc}</p>
            </div>
            {acceptedCards?.americanExpress && (
                <div className={classes.tooltipContainer}>
                    <IcnCvvAmex size={48} role="img" />
                    <p className={classes.cvvText}>{texts.formCreditCardCvvTooltipAmex}</p>
                </div>
            )}
        </>
    );
};

type FormCvvProps = {
    ...CommonFormFieldProps,
    acceptedCards?: CardOptions,
    onChangeValue?: (value: string, rawValue: string) => void,
    type: 'credit-card-cvv',
};

const FormCvvField = ({
    disabled,
    error,
    helperText,
    name,
    optional,
    validate: validateProp,
    onChangeValue,
    onBlur,
    acceptedCards = {americanExpress: true, visa: true, masterCard: true},
    maxLength,
    ...rest
}: FormCvvProps): React.Node => {
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

    const validate = (value, rawValue) => {
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
        if (value.length !== maxLength) {
            return texts.formCreditCardCvvError;
        }
        return validateProp?.(value, rawValue);
    };

    return (
        <TextField
            {...rest}
            type="credit-card-cvv"
            inputRef={(field) => register({name, field, validate})}
            disabled={disabled || formStatus === 'sending'}
            error={error || !!formErrors[name]}
            helperText={formErrors[name] || helperText}
            name={name}
            required={!optional}
            value={rawValues[name] ?? ''}
            maxLength={maxLength}
            onChange={(event) => setRawValue({name, value: event.currentTarget.value})}
            onChangeValue={(value, rawValue) => {
                setValue({name, value});
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
        />
    );
};

export default FormCvvField;
