'use client';
import * as React from 'react';
import {useTheme} from './hooks';
import IconCvvVisaMc from './icons/icon-cvv-visa-mc';
import IconCvvAmex from './icons/icon-cvv-amex';
import Popover from './popover';
import IconInformationRegular from './generated/mistica-icons/icon-information-regular';
import {useFieldProps, useForm} from './form-context';
import {TextFieldBaseAutosuggest} from './text-field-base';
import {IntegerInput} from './integer-field';
import Inline from './inline';
import Stack from './stack';
import Box from './box';
import Divider from './divider';
import Text2 from './text';
import {vars} from './skins/skin-contract.css';
import {pxToRem} from './utils/css';
import {iconButtonSize} from './text-field-base.css';
import Touchable from './touchable';
import * as tokens from './text-tokens';

import type {CommonFormFieldProps} from './text-field-base';
import type {CardOptions} from './utils/credit-card';

const TooltipContent = ({acceptedCards}: {acceptedCards: CardOptions}) => {
    const {texts, t} = useTheme();

    return (
        <>
            <Box padding={8}>
                <Stack space={8}>
                    <Inline space={16} alignItems="center">
                        <IconCvvVisaMc size={48} role="img" />
                        <Text2>
                            {texts.formCreditCardCvvTooltipVisaMc || t(tokens.formCreditCardCvvTooltipVisaMc)}
                        </Text2>
                    </Inline>
                    <Divider />
                    {acceptedCards?.americanExpress && (
                        <Inline space={16} alignItems="center">
                            <IconCvvAmex size={48} role="img" />
                            <Text2>
                                {texts.formCreditCardCvvTooltipAmex || t(tokens.formCreditCardCvvTooltipAmex)}
                            </Text2>
                        </Inline>
                    )}
                </Stack>
            </Box>
        </>
    );
};

export interface CvvFieldProps extends CommonFormFieldProps {
    acceptedCards?: CardOptions;
    onChangeValue?: (value: string, rawValue: string) => void;
}

const CvvField = ({
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
    maxLength = 4,
    value,
    autoComplete = 'cc-csc',
    defaultValue,
    dataAttributes,
    ...rest
}: CvvFieldProps): JSX.Element => {
    const {texts, t} = useTheme();
    const {setFormError, jumpToNext} = useForm();
    const [isCvvHelpOpen, setIsCvvHelpOpen] = React.useState(false);

    const validate = (value: string, rawValue: string) => {
        if (value.length !== maxLength) {
            return texts.formCreditCardCvvError || t(tokens.formCreditCardCvvError);
        }
        return validateProp?.(value, rawValue);
    };

    const processValue = (s: string) => s;

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

    const iconSize = pxToRem(16);

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
                <Popover
                    position="top"
                    open={isCvvHelpOpen}
                    children={<TooltipContent acceptedCards={acceptedCards} />}
                    onClose={() => setIsCvvHelpOpen(false)}
                    target={
                        <div style={{width: iconSize, height: iconSize}}>
                            <Touchable
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: iconButtonSize,
                                    height: iconButtonSize,
                                    position: 'relative',
                                    left: `calc(-1 * (${iconButtonSize} - ${iconSize}) / 2)`,
                                    top: `calc(-1 * (${iconButtonSize} - ${iconSize}) / 2)`,
                                }}
                                onPress={() => setIsCvvHelpOpen(!isCvvHelpOpen)}
                                aria-label={
                                    isCvvHelpOpen
                                        ? texts.formCreditCardCvvTooltipVisaMcButtonClose ||
                                          t(tokens.formCreditCardCvvTooltipVisaMcButtonClose)
                                        : texts.formCreditCardCvvTooltipVisaMcButtonOpen ||
                                          t(tokens.formCreditCardCvvTooltipVisaMcButtonOpen)
                                }
                            >
                                <IconInformationRegular size={iconSize} color={vars.colors.neutralMedium} />
                            </Touchable>
                        </div>
                    }
                />
            }
            autoComplete={autoComplete}
            inputComponent={IntegerInput}
            dataAttributes={{'component-name': 'CvvField', testid: 'CvvField', ...dataAttributes}}
        />
    );
};

export default CvvField;
