import * as React from 'react';
import {useTheme} from './hooks';
import IconCvvVisaMc from './icons/icon-cvv-visa-mc';
import IconCvvAmex from './icons/icon-cvv-amex';
import Tooltip from './tooltip';
import IconButton from './icon-button';
import IcnInfo from './icons/icon-info-cvv';
import {useFieldProps, useForm} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {IntegerInput} from './integer-field';
import * as styles from './cvv-field.css';

import type {CommonFormFieldProps} from './text-field-base';
import type {CardOptions} from './utils/credit-card';

const TooltipContent = ({acceptedCards}: {acceptedCards: CardOptions}) => {
    const {texts} = useTheme();

    return (
        <>
            <div className={styles.tooltipContainer}>
                <IconCvvVisaMc size={48} role="img" />
                <p className={styles.cvvText}>{texts.formCreditCardCvvTooltipVisaMc}</p>
            </div>
            {acceptedCards?.americanExpress && (
                <div className={styles.tooltipContainer}>
                    <IconCvvAmex size={48} role="img" />
                    <p className={styles.cvvText}>{texts.formCreditCardCvvTooltipAmex}</p>
                </div>
            )}
        </>
    );
};

export interface CvvFieldProps extends CommonFormFieldProps {
    acceptedCards?: CardOptions;
    onChangeValue?: (value: string, rawValue: string) => void;
}

const CvvField: React.FC<CvvFieldProps> = ({
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
    defaultValue,
    ...rest
}) => {
    const {texts} = useTheme();
    const {setFormError, jumpToNext} = useForm();

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

    const fieldProps = useFieldProps({
        name,
        value,
        defaultValue,
        processValue,
        helperText,
        optional,
        error,
        disabled,
        onBlur,
        validate,
        onChange,
        onChangeValue,
    });

    return (
        <TextFieldBaseAutosuggest
            {...rest}
            {...fieldProps}
            maxLength={maxLength}
            onChange={(event) => {
                fieldProps.onChange(event);
                const rawValue = event.currentTarget.value;
                const value = processValue(rawValue);
                if (value.length === maxLength) {
                    const error = validate(value, rawValue);
                    if (error) {
                        setFormError({name, error});
                    } else {
                        jumpToNext(name);
                    }
                }
            }}
            endIcon={
                <Tooltip
                    position="top"
                    children={<TooltipContent acceptedCards={acceptedCards} />}
                    targetLabel={texts.formCreditCardCvvTooltipVisaMcButton}
                    target={
                        <div style={{width: 16, height: 16}}>
                            <IconButton
                                size={40}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    left: -12, // (40 - 16) / 2
                                    top: -12,
                                }}
                            >
                                <IcnInfo size={20} />
                            </IconButton>
                        </div>
                    }
                />
            }
            autoComplete={autoComplete}
            inputComponent={IntegerInput}
        />
    );
};

export default CvvField;
