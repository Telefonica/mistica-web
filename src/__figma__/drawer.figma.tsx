import React from 'react';
import Drawer from '../drawer';
import figma from '@figma/code-connect';

const drawerProps = {
    title: figma.boolean('Title', {
        true: 'Title',
        false: undefined,
    }),
    subtitle: figma.boolean('Subtitle', {
        true: 'Subtitle',
        false: undefined,
    }),
    description: figma.boolean('Description', {
        true: 'Description',
        false: undefined,
    }),
};

// Desktop
figma.connect(
    Drawer,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=23866%3A3346',
    {
        props: drawerProps,
        example: (props) => (
            <Drawer
                title={props.title}
                subtitle={props.subtitle}
                description={props.description}
                onClose={() => {}}
            >
                Content
            </Drawer>
        ),
    }
);

// Mobile
figma.connect(
    Drawer,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=48528%3A4975',
    {
        props: drawerProps,
        example: (props) => (
            <Drawer
                title={props.title}
                subtitle={props.subtitle}
                description={props.description}
                onClose={() => {}}
            >
                Content
            </Drawer>
        ),
    }
);
