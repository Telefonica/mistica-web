import React from 'react';
import DateField from '../../date-field';
import figma from '@figma/code-connect';

figma.connect(
    DateField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987%3A6932',
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
            <DateField
                label="Label"
                name="date-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);
