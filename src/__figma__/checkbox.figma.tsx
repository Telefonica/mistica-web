import React from 'react';
import Checkbox from '../checkbox';
import figma from '@figma/code-connect';

const checkboxProps = {
    // defaultChecked: figma.boolean('State', {
    //     true: true,
    //     false: undefined,
    // }),
    disabled: figma.boolean('Disabled', {
        true: true,
        false: undefined,
    }),
};

// Desktop
figma.connect(
    Checkbox,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=183%3A5449',
    {
        props: checkboxProps,
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

// Mobile
figma.connect(
    Checkbox,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=3114%3A10236',
    {
        props: checkboxProps,
        example: (props) => <Checkbox name="checkbox" disabled={props.disabled} />,
    }
);
