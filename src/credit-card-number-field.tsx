'use client';
import * as React from 'react';
import {useForm, useFieldProps} from './form-context';
import {useTheme} from './hooks';
import {
    getCreditCardNumberLength,
    isAmericanExpress,
    isVisa,
    isMasterCard,
    isValidCreditCardNumber,
} from './utils/credit-card';
import {TextFieldBaseAutosuggest} from './text-field-base';
import IconCreditCardVisaRegular from './generated/mistica-icons/icon-credit-card-visa-regular';
import IconVisa from './icons/icon-visa';
import IconMastercard from './icons/icon-mastercard';
import IconAmex from './icons/icon-amex';
import {useRifm} from 'rifm';
import {createChangeEvent} from './utils/dom';
import {combineRefs} from './utils/common';
import * as styles from './credit-card-number-field.css';
import {vars} from './skins/skin-contract.css';
import {iconSize} from './icon-button.css';
import * as tokens from './text-tokens';

import type {CardOptions} from './utils/credit-card';
import type {CommonFormFieldProps} from './text-field-base';

const format = (s?: string) => {
    const sanitizedNumber = String(s ?? '').replace(/[^\d]/g, '');
    return sanitizedNumber.match(/.{1,4}/g)?.join(' ') ?? sanitizedNumber;
};

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onInput'> & {
    inputRef?: React.Ref<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

const CreditCardInput = ({inputRef, value, defaultValue, onChange, ...other}: Props) => {
    const [selfValue, setSelfValue] = React.useState(defaultValue ?? '');
    const ref = React.useRef<HTMLInputElement | null>(null);

    const isControlledByParent = typeof value !== 'undefined';
    const controlledValue = (isControlledByParent ? value : selfValue) as string;

    const handleChangeValue = React.useCallback(
        (newFormattedValue: string) => {
            if (!isControlledByParent) {
                setSelfValue(newFormattedValue);
            }
            if (ref.current) {
                onChange?.(createChangeEvent(ref.current, newFormattedValue));
            }
        },
        [isControlledByParent, onChange]
    );

    const rifm = useRifm({
        format,
        value: controlledValue,
        onChange: handleChangeValue,
        accept: /[\d]+/g,
    });

    return (
        <input
            {...other}
            type="text"
            inputMode="decimal"
            maxLength={getCreditCardNumberLength(rifm.value) + 3} // We have to take into account formatting spaces
            onChange={rifm.onChange}
            value={rifm.value}
            ref={combineRefs(inputRef, ref)}
        />
    );
};

const getAnimationTarget = (value?: string) => {
    if (isVisa(value)) {
        return <IconVisa size={iconSize.default} />;
    }
    if (isMasterCard(value)) {
        return <IconMastercard size={iconSize.default} />;
    }
    if (isAmericanExpress(value)) {
        return <IconAmex size={iconSize.default} />;
    }
    return null;
};

const initialState = {
    showBackface: false,
    animationTarget: <IconCreditCardVisaRegular size={iconSize.default} />,
    isAnimating: false,
};

const reducer = (
    state: typeof initialState,
    {
        type,
        value,
    }: {
        type: string;
        value?: string;
    }
) => {
    if (type === 'INPUT') {
        const animationTarget = getAnimationTarget(value);
        if (animationTarget && !state.showBackface) {
            return {animationTarget, showBackface: true, isAnimating: true};
        }
        if (!isVisa(value) && !isMasterCard(value) && !isAmericanExpress(value) && state.showBackface) {
            return {animationTarget: state.animationTarget, showBackface: false, isAnimating: true};
        }
        if (animationTarget && state.showBackface) {
            return {
                ...state,
                animationTarget,
            };
        }
    }
    if (type === 'TRANSITION_END') {
        return {...state, isAnimating: false};
    }
    return state;
};

const CreditcardAdornment = ({value}: {value?: string}) => {
    const [{showBackface, animationTarget, isAnimating}, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
        dispatch({type: 'INPUT', value});
    }, [value]);

    return (
        <div className={styles.flip}>
            <div
                className={styles.variants[showBackface ? 'backface' : 'default']}
                onTransitionEnd={() => isAnimating && dispatch({type: 'TRANSITION_END'})}
            >
                <div className={styles.flipFront}>
                    <IconCreditCardVisaRegular size={iconSize.default} color={vars.colors.neutralMedium} />
                </div>
                <div className={styles.flipBack}>{animationTarget}</div>
            </div>
        </div>
    );
};

interface CreditCardNumberFieldProps extends CommonFormFieldProps {
    acceptedCards?: CardOptions;
    onChangeValue?: (value: string, rawValue: string) => void;
}

const CreditCardNumberField = ({
    disabled,
    error,
    helperText,
    name,
    label,
    optional,
    validate: validateProp,
    validateOnBlurInsideForm,
    onChange,
    onChangeValue,
    onBlur,
    acceptedCards = {americanExpress: true, visa: true, masterCard: true},
    value,
    autoComplete = 'cc-number',
    defaultValue,
    dataAttributes,
    ...rest
}: CreditCardNumberFieldProps): JSX.Element => {
    const {texts, t} = useTheme();
    const {jumpToNext, rawValues, setFormError} = useForm();

    const validate = (value: string | undefined, rawValue: string) => {
        const error = texts.formCreditCardNumberError || t(tokens.formCreditCardNumberError);
        if (isAmericanExpress(value) && !acceptedCards.americanExpress) {
            return error;
        }
        if (isVisa(value) && !acceptedCards.visa) {
            return error;
        }
        if (isMasterCard(value) && !acceptedCards.masterCard) {
            return error;
        }
        if (!isValidCreditCardNumber(value)) {
            return error;
        }
        if (getCreditCardNumberLength(value) !== value?.length) {
            return error;
        }
        return validateProp?.(value, rawValue);
    };

    const processValue = (s: string) => s.replace(/\s/g, '');

    const fieldProps = useFieldProps({
        name,
        label,
        value,
        defaultValue,
        processValue,
        helperText,
        optional,
        error,
        disabled,
        onBlur,
        validate,
        validateOnBlurInsideForm,
        onChange,
        onChangeValue,
    });

    return (
        <TextFieldBaseAutosuggest
            {...rest}
            {...fieldProps}
            onChange={(event) => {
                fieldProps.onChange(event);
                const rawValue = event.currentTarget.value;
                const value = processValue(rawValue);
                if (value.length >= getCreditCardNumberLength(value)) {
                    const error = validate?.(value, rawValue);
                    if (error) {
                        setFormError({name, error});
                    } else {
                        jumpToNext(name);
                    }
                }
            }}
            inputComponent={CreditCardInput}
            autoComplete={autoComplete}
            endIcon={<CreditcardAdornment value={value ?? rawValues[name] ?? ''} />}
            dataAttributes={{
                'component-name': 'CreditCardNumberField',
                testid: 'CreditCardNumberField',
                ...dataAttributes,
            }}
        />
    );
};

export default CreditCardNumberField;
