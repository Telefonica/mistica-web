import React from 'react';
import Checkbox from '../../checkbox';
import figma from '@figma/code-connect';
import {disabled} from '../../icon-button.css';

figma.connect(
    Checkbox,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=183%3A5449',
    {
        props: {
            defaultChecked: figma.boolean('State', {
                true: true,
                false: undefined,
            }),
            disabled: figma.boolean('Disabled', {
                true: true,
                false: undefined,
            }),
        },
        example: (props) => (
            <Checkbox name="checkbox" defaultChecked={props.defaultChecked} disabled={props.disabled} />
        ),
    }
);

figma.connect(
    Checkbox,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1958%3A4596',
    {
        props: {
            defaultChecked: figma.nestedProps('Checkbox [D]', {
                defaultChecked: figma.boolean('State', {
                    true: true,
                    false: undefined,
                }),
            }),
            disabled: figma.boolean('Disabled', {
                true: true,
                false: undefined,
            }),
            children: figma.textContent('Children'),
        },

        example: (props) => (
            <Checkbox
                name="checkbox"
                defaultChecked={props.defaultChecked.defaultChecked}
                disabled={props.disabled}
            >
                {props.children}
            </Checkbox>
        ),
    }
);
