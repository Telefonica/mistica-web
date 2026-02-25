import React from 'react';
import PinField from '../../pin-field';
import figma from '@figma/code-connect';

figma.connect(
    PinField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=13264%3A3773',
    {
        props: {
            helperText: figma.boolean('Helper text', {
                true: 'Helper text',
                false: undefined,
            }),
            length: figma.enum('Length', {
                '6': 6,
                '5': 5,
                '4': 4,
                '3': 3,
                '2': 2,
            }),
            error: figma.boolean('Error'),
            disabled: figma.boolean('Disabled'),
            readOnly: figma.boolean('Read only'),
            hideCode: figma.boolean('Hide Pin'),
        },
        example: (props) => (
            <PinField
                label="Label"
                name="pin-field"
                length={props.length}
                hideCode={props.hideCode}
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);
