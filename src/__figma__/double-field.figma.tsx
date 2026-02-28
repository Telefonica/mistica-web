import React from 'react';
import DoubleField from '../double-field';
import figma from '@figma/code-connect';

const doubleFieldProps = {
    layout: figma.enum('Layout', {
        '50/50': '50/50',
        '40/60': '40/60',
        '60/40': '60/40',
    }),
};

// Desktop
figma.connect(
    DoubleField,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2669%3A4139',
    {
        props: doubleFieldProps,
        example: (props) => (
            <DoubleField layout={props.layout}>
                <div>Field 1</div>
                <div>Field 2</div>
            </DoubleField>
        ),
    }
);

// Mobile
figma.connect(
    DoubleField,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=6097%3A8587',
    {
        props: doubleFieldProps,
        example: (props) => (
            <DoubleField layout={props.layout}>
                <div>Field 1</div>
                <div>Field 2</div>
            </DoubleField>
        ),
    }
);
