import React from 'react';
import {NavigationBar} from '../navigation-bar';
import figma from '@figma/code-connect';

const navigationBarProps = {
    // onBack: figma.boolean('Back', {
    //     true: () => {},
    //     false: undefined,
    // }),
    // wide: figma.boolean('Wide'),
};

// Desktop
figma.connect(
    NavigationBar,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1153%3A4246',
    {
        props: navigationBarProps,
        example: (props) => <NavigationBar title="Title" />,
    }
);

// Mobile
figma.connect(
    NavigationBar,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=1953%3A8805',
    {
        props: navigationBarProps,
        example: (props) => <NavigationBar title="Title" />,
    }
);
