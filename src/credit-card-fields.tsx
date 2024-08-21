'use client';
import * as React from 'react';
import {useForm} from './form-context';
import {useTheme} from './hooks';
import {getCvvLength} from './utils/credit-card';
import DoubleField from './double-field';
import Stack from './stack';
import CreditCardExpirationField from './credit-card-expiration-field';
import CreditCardNumberField from './credit-card-number-field';
import CvvField from './cvv-field';
import {
    formCreditCardCvvLabel,
    formCreditCardExpirationLabel,
    formCreditCardNumberLabel,
    translate,
} from './text-tokens';

import type {CardOptions} from './utils/credit-card';

type CreditCardFieldsProps = {
    numberFieldName?: string;
    expirationFieldName?: string;
    cvvFieldName?: string;
    acceptedCards?: CardOptions;
    children?: void;
};

const CreditCardFields: React.FC<CreditCardFieldsProps> = ({
    numberFieldName = 'ccNum',
    expirationFieldName = 'ccExp',
    cvvFieldName = 'ccCvv',
    acceptedCards,
}) => {
    const {values} = useForm();
    const {
        texts,
        i18n: {locale},
    } = useTheme();
    const cvvLength = getCvvLength(String(values[numberFieldName]));

    return (
        <Stack space={16}>
            <CreditCardNumberField
                acceptedCards={acceptedCards}
                name={numberFieldName}
                label={texts.formCreditCardNumberLabel || translate(formCreditCardNumberLabel, locale)}
            />
            <DoubleField layout="60/40">
                <CreditCardExpirationField
                    name={expirationFieldName}
                    label={
                        texts.formCreditCardExpirationLabel ||
                        translate(formCreditCardExpirationLabel, locale)
                    }
                />
                <CvvField
                    acceptedCards={acceptedCards}
                    name={cvvFieldName}
                    label={texts.formCreditCardCvvLabel || translate(formCreditCardCvvLabel, locale)}
                    maxLength={cvvLength}
                />
            </DoubleField>
        </Stack>
    );
};

export default CreditCardFields;
