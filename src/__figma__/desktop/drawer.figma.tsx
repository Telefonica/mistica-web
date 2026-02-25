import React from 'react';
import Drawer from '../../drawer';
import figma from '@figma/code-connect';

figma.connect(
    Drawer,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=23866%3A3346',
    {
        props: {
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
        },
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
