import React from 'react';
import Autocomplete from '../../autocomplete';
import figma from '@figma/code-connect';

figma.connect(
    Autocomplete,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=33584%3A2077',
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
            <Autocomplete
                label="Label"
                name="autocomplete"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
                getSuggestions={(value) => []}
            />
        ),
    }
);
