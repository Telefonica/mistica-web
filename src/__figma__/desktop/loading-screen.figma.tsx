import React from 'react';
import {LoadingScreen} from '../../loading-screen';
import figma from '@figma/code-connect';

figma.connect(
    LoadingScreen,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=15059%3A506',
    {
        props: {
            title: figma.boolean('Title', {
                true: 'Loading...',
                false: undefined,
            }),
            description: figma.boolean('Description', {
                true: 'Please wait',
                false: undefined,
            }),
        },
        example: (props) => <LoadingScreen title={props.title} description={props.description} />,
    }
);
