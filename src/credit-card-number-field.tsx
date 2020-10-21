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
import TextFieldBase from './text-field-base';
import IconCreditcard from './icons/icon-creditcard';
import IconVisa from './icons/icon-visa';
import IconMastercard from './icons/icon-mastercard';
import IconAmex from './icons/icon-amex';
import {createUseStyles} from './jss';

import type {CommonFormFieldProps} from './text-field-base';
import type {CardOptions} from './utils/credit-card';

const CreditCardInput = ({inputRef, defaultValue, value, maxLength, onInput, ...rest}: any) => {
    // Naive implementation, some issues in cursor position when editing
    const format = (s?: string) => {
        const chars = String(s ?? '')
            .replace(/[^\d]/g, '')
            .slice(0, 16)
            .split('');

        const result = [];

        // separate in groups of 4 numbers
        while (chars.length) {
            result.push(...chars.splice(0, 4));
            if (chars.length) result.push(' ');
        }

        return result.join('');
    };

    return (
        <input
            {...rest}
            type="text"
            inputMode="decimal"
            maxLength={maxLength ?? '19'} // 16 digits + 3 spaces
            onInput={(e) => {
                e.currentTarget.value = format(e.currentTarget.value);
                onInput?.(e);
            }}
            value={value === undefined ? undefined : format(value)}
            defaultValue={defaultValue === undefined ? undefined : format(defaultValue)}
            ref={inputRef}
        />
    );
};

const getAnimationTarget = (value?: string) => {
    if (isVisa(value)) {
        return <IconVisa />;
    }
    if (isMasterCard(value)) {
        return <IconMastercard />;
    }
    if (isAmericanExpress(value)) {
        return <IconAmex />;
    }
    return null;
};

const initialState = {
    showBackface: false,
    animationTarget: <IconCreditcard />,
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

const useStylesCCAdornment = createUseStyles(() => ({
    flip: {
        perspective: 1000,
    },
    flipInner: {
        position: 'relative',
        transition: 'transform 0.4s',
        transformStyle: 'preserve-3d',
        '& div': {
            backfaceVisibility: 'hidden',
        },
        transform: ({showBackface}) => (showBackface ? 'rotateY(180deg)' : 'none'),
    },
    flipFront: {
        position: 'absolute',
    },
    flipBack: {
        transform: 'rotateY(180deg)',
    },
}));

const CreditcardAdornment = ({value}: {value?: string}) => {
    const [{showBackface, animationTarget, isAnimating}, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
        dispatch({type: 'INPUT', value});
    }, [value]);

    const classes = useStylesCCAdornment({showBackface});

    return (
        <div className={classes.flip}>
            <div
                className={classes.flipInner}
                onTransitionEnd={() => isAnimating && dispatch({type: 'TRANSITION_END'})}
            >
                <div className={classes.flipFront}>
                    <IconCreditcard />
                </div>
                <div className={classes.flipBack}>{animationTarget}</div>
            </div>
        </div>
    );
};

interface CreditCardNumberFieldProps extends CommonFormFieldProps {
    acceptedCards?: CardOptions;
    onChangeValue?: (value: string, rawValue: string) => void;
}

const CreditCardNumberField: React.FC<CreditCardNumberFieldProps> = ({
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
    value,
    autoComplete = 'cc-number',
    defaultValue,
    ...rest
}) => {
    const {texts} = useTheme();
    const {jumpToNext, rawValues, values, setFormError} = useForm();

    const validate = (value: string | undefined, rawValue: string) => {
        const error = texts.formCreditCardNumberError;
        if (!value) {
            return optional ? '' : texts.formFieldErrorIsMandatory;
        }
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
        if (getCreditCardNumberLength(value) !== value.length) {
            return error;
        }
        return validateProp?.(value, rawValue);
    };

    const processValue = (s: string) => s.replace(/\s/g, '');

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
        <TextFieldBase
            {...rest}
            {...fieldProps}
            maxLength={getCreditCardNumberLength(values[name]) + 3} // We have to take in account formatting spaces
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
        />
    );
};

export default CreditCardNumberField;
