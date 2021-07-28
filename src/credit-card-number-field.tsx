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
import {useRifm} from 'rifm';
import {createChangeEvent} from './utils/dom';
import {combineRefs} from './utils/common';

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

const CreditCardInput: React.FC<Props> = ({inputRef, value, defaultValue, onChange, ...other}) => {
    const [selfValue, setSelfValue] = React.useState(defaultValue ?? '');
    const ref = React.useRef<HTMLInputElement | null>(null);

    const isControlledByParent = typeof value !== 'undefined';
    const controlledValue = (isControlledByParent ? value : selfValue) as string;

    const handleChangeValue = React.useCallback(
        (newFormattedValue) => {
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
            maxLength={getCreditCardNumberLength(rifm.value) + 3} // We have to take in account formatting spaces
            onChange={rifm.onChange}
            value={rifm.value}
            ref={combineRefs(inputRef, ref)}
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
    const {jumpToNext, rawValues, setFormError} = useForm();

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
