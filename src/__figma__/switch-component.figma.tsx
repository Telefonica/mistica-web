import React from 'react';
import SwitchComponent from '../switch-component';
import figma from '@figma/code-connect';

const switchComponentProps = {
    defaultChecked: figma.boolean('State'),
    disabled: figma.boolean('Disabled'),
};

// Desktop
figma.connect(
    SwitchComponent,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=183%3A5534',
    {
        props: switchComponentProps,
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

// Mobile
figma.connect(
    SwitchComponent,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=1952%3A7138',
    {
        props: switchComponentProps,
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
