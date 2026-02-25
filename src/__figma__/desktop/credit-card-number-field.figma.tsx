import React from 'react';
import CreditCardNumberField from '../../credit-card-number-field';
import figma from '@figma/code-connect';

figma.connect(
    CreditCardNumberField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987%3A6969',
    {
        props: {
            helperText: figma.boolean('Helper text', {
                true: 'Helper text',
                false: undefined,
            }),
            error: figma.boolean('Error'),
            disabled: figma.boolean('Disabled'),
            readOnly: figma.boolean('Read only'),
        },
        example: (props) => (
            <CreditCardNumberField
                label="Label"
                name="credit-card-number-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);
