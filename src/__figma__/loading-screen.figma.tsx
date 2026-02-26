import React from 'react';
import {LoadingScreen} from '../loading-screen';
import figma from '@figma/code-connect';

const loadingScreenProps = {
    title: figma.boolean('Title', {
        true: 'Loading...',
        false: undefined,
    }),
    description: figma.boolean('Description', {
        true: 'Please wait',
        false: undefined,
    }),
};

// Desktop
figma.connect(
    LoadingScreen,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=15059%3A506',
    {
        props: loadingScreenProps,
        example: (props) => <LoadingScreen title={props.title} description={props.description} />,
    }
);

// Mobile
figma.connect(
    LoadingScreen,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=32834%3A517',
    {
        props: loadingScreenProps,
        example: (props) => <LoadingScreen title={props.title} description={props.description} />,
    }
);
