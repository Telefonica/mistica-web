import React from 'react';
import RadioButton, {RadioGroup} from '../../radio-button';
import figma from '@figma/code-connect';

figma.connect(
    RadioButton,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=183%3A5354',
    {
        props: {
            disabled: figma.enum('Disabled', {
                On: true,
            }),
        },
        example: (props) => (
            <RadioGroup name="radio-group" defaultValue="option-1">
                <RadioButton value="option-1" disabled={props.disabled}>
                    Option 1
                </RadioButton>
                <RadioButton value="option-2">Option 2</RadioButton>
            </RadioGroup>
        ),
    }
);
