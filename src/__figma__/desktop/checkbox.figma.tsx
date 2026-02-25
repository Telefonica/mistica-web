import React from 'react';
import Checkbox from '../../checkbox';
import figma from '@figma/code-connect';

figma.connect(
    Checkbox,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=183%3A5449',
    {
        props: {
            defaultChecked: figma.enum('State', {
                On: true,
            }),
            disabled: figma.enum('Disabled', {
                On: true,
            }),
        },
        example: (props) => (
            <Checkbox name="checkbox" defaultChecked={props.defaultChecked} disabled={props.disabled}>
                Label
            </Checkbox>
        ),
    }
);

figma.connect(
    Checkbox,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1958%3A4596',
    {
        props: {
            disabled: figma.enum('Disabled', {
                On: true,
            }),
        },
        example: (props) => (
            <Checkbox name="checkbox" disabled={props.disabled}>
                Label
            </Checkbox>
        ),
    }
);
