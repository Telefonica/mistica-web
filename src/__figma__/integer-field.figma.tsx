import React from 'react';
import IntegerField from '../integer-field';
import figma from '@figma/code-connect';

const integerFieldProps = {
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
    IntegerField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=7987%3A7862',
    {
        props: integerFieldProps,
        example: (props) => (
            <IntegerField
                label={props.label}
                name="integer-field"
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
    IntegerField,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=15432%3A9260',
    {
        props: integerFieldProps,
        example: (props) => (
            <IntegerField
                label={props.label}
                name="integer-field"
                helperText={props.helperText}
                error={props.error}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ),
    }
);
