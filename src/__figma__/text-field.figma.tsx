import React from 'react';
import TextField from '../text-field';
import figma from '@figma/code-connect';

figma.connect(
    TextField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987%3A6924',
    {
        props: {
            helperText: figma.boolean('Helper text', {
                true: figma.textContent('Helper text'),
                false: undefined,
            }),
            error: figma.boolean('Error'),
            disabled: figma.boolean('Disabled'),
            readOnly: figma.boolean('Read only'),
            multiline: figma.boolean('Multiline'),
            endIcon: figma.boolean('End icon', {
                true: figma.children('*'),
                false: undefined,
            }),
            label: figma.textContent('Label'),
        },
        example: (props) => (
            <TextField
                label={props.label}
                name="text-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
                multiline={props.multiline}
                endIcon={props.endIcon}
            />
        ),
    }
);
