import React from 'react';
import Select from '../select';
import figma from '@figma/code-connect';

figma.connect(
    Select,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987%3A6935',
    {
        props: {
            helperText: figma.boolean('Helper text', {
                true: 'Helper text',
                false: undefined,
            }),
            error: figma.boolean('Error'),
            disabled: figma.boolean('Disabled'),
        },
        example: (props) => (
            <Select
                label="Label"
                name="select"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                options={[
                    {value: '1', text: 'Option 1'},
                    {value: '2', text: 'Option 2'},
                ]}
            />
        ),
    }
);
