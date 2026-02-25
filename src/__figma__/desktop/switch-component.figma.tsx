import React from 'react';
import SwitchComponent from '../../switch-component';
import figma from '@figma/code-connect';

figma.connect(
    SwitchComponent,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=183%3A5534',
    {
        props: {
            defaultChecked: figma.boolean('State'),
            disabled: figma.boolean('Disabled'),
        },
        example: (props) => (
            <SwitchComponent
                name="switch"
                defaultChecked={props.defaultChecked}
                disabled={props.disabled}
                onChange={() => {}}
            >
                Label
            </SwitchComponent>
        ),
    }
);
