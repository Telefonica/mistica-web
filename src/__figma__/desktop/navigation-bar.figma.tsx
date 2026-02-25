import React from 'react';
import {NavigationBar} from '../../navigation-bar';
import figma from '@figma/code-connect';

figma.connect(
    NavigationBar,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1153%3A4246',
    {
        props: {
            onBack: figma.boolean('Back', {
                true: () => {},
                false: undefined,
            }),
            wide: figma.boolean('Wide'),
        },
        example: (props) => <NavigationBar title="Title" onBack={props.onBack} wide={props.wide} />,
    }
);
