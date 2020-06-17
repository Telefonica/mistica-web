// @flow
import * as React from 'react';
import {useForm} from './form-context';
import {useTheme} from './hooks';
import {getCvvLength} from './utils/credit-card';
import DoubleField from './double-field';
import Stack from './stack';
import FormCreditCardExpirationField from './form-credit-card-expiration-field';
import FormCreditCardNumberField from './form-credit-card-number-field';
import FormCvvField from './form-cvv-field';

import type {CardOptions} from './utils/credit-card';

type FormCreditCardFieldsProps = {
    numberFieldName?: string,
    expirationFieldName?: string,
    cvvFieldName?: string,
    acceptedCards?: CardOptions,
};

const FormCreditCardFields = ({
    numberFieldName = 'ccNum',
    expirationFieldName = 'ccExp',
    cvvFieldName = 'ccCvv',
    acceptedCards,
}: FormCreditCardFieldsProps): React.Node => {
    const {values} = useForm();
    const {texts} = useTheme();
    const cvvLength = getCvvLength(String(values[numberFieldName]));

    return (
        <Stack space={16}>
            <FormCreditCardNumberField
                acceptedCards={acceptedCards}
                name={numberFieldName}
                label={texts.formCreditCardNumberLabel}
            />

            <DoubleField>
                <FormCreditCardExpirationField
                    name={expirationFieldName}
                    label={texts.formCreditCardExpirationLabel}
                />
                <FormCvvField
                    acceptedCards={acceptedCards}
                    type="credit-card-cvv"
                    name={cvvFieldName}
                    label={texts.formCreditCardCvvLabel}
                    maxLength={cvvLength}
                />
            </DoubleField>
        </Stack>
    );
};

export default FormCreditCardFields;
