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
import * as tokens from './text-tokens';

import type {CardOptions} from './utils/credit-card';

type CreditCardFieldsProps = {
    numberFieldName?: string;
    expirationFieldName?: string;
    cvvFieldName?: string;
    acceptedCards?: CardOptions;
    children?: void;
};

const CreditCardFields = ({
    numberFieldName = 'ccNum',
    expirationFieldName = 'ccExp',
    cvvFieldName = 'ccCvv',
    acceptedCards,
}: CreditCardFieldsProps): JSX.Element => {
    const {values} = useForm();
    const {texts, t} = useTheme();
    const cvvLength = getCvvLength(String(values[numberFieldName]));

    return (
        <Stack space={16}>
            <CreditCardNumberField
                acceptedCards={acceptedCards}
                name={numberFieldName}
                label={texts.formCreditCardNumberLabel || t(tokens.formCreditCardNumberLabel)}
            />
            <DoubleField layout="60/40">
                <CreditCardExpirationField
                    name={expirationFieldName}
                    label={texts.formCreditCardExpirationLabel || t(tokens.formCreditCardExpirationLabel)}
                />
                <CvvField
                    acceptedCards={acceptedCards}
                    name={cvvFieldName}
                    label={texts.formCreditCardCvvLabel || t(tokens.formCreditCardCvvLabel)}
                    maxLength={cvvLength}
                />
            </DoubleField>
        </Stack>
    );
};

export default CreditCardFields;
