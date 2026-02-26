import React from 'react';
import Tabs from '../tabs';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    Tabs,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=571%3A6553',
    {
        props: {},
        example: () => (
            <Tabs
                selectedIndex={0}
                onChange={() => {}}
                tabs={[{text: 'Tab 1'}, {text: 'Tab 2'}, {text: 'Tab 3'}]}
            />
        ),
    }
);

// Mobile
figma.connect(
    Tabs,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=571%3A6553',
    {
        props: {},
        example: () => (
            <Tabs
                selectedIndex={0}
                onChange={() => {}}
                tabs={[{text: 'Tab 1'}, {text: 'Tab 2'}, {text: 'Tab 3'}]}
            />
        ),
    }
);
