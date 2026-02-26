import React from 'react';
import CreditCardNumberField from '../credit-card-number-field';
import figma from '@figma/code-connect';

const creditCardNumberFieldProps = {
    label: figma.textContent('Label'),
    helperText: figma.boolean('Helper text', {
        true: figma.textContent('Helper text'),
        false: undefined,
    }),
    error: figma.boolean('Error'),
    disabled: figma.boolean('Disabled'),
    readOnly: figma.boolean('Read only'),
};

// Desktop
figma.connect(
    CreditCardNumberField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987%3A6969',
    {
        props: creditCardNumberFieldProps,
        example: (props) => (
            <CreditCardNumberField
                label={props.label}
                name="credit-card-number-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);

// Mobile
figma.connect(
    CreditCardNumberField,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=15428%3A8881',
    {
        props: creditCardNumberFieldProps,
        example: (props) => (
            <CreditCardNumberField
                label={props.label}
                name="credit-card-number-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);
