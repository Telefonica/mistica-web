import React from 'react';
import IbanField from '../../iban-field';
import figma from '@figma/code-connect';

figma.connect(
    IbanField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987%3A8277',
    {
        props: {
            label: figma.textContent('Label'),
            helperText: figma.boolean('Helper text', {
                true: figma.textContent('Helper text'),
                false: undefined,
            }),
            error: figma.boolean('Error'),
            disabled: figma.boolean('Disabled'),
            readOnly: figma.boolean('Read only'),
        },
        example: (props) => (
            <IbanField
                label={props.label}
                name="iban-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);
