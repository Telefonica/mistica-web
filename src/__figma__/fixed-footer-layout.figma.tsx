import React from 'react';
import FixedFooterLayout from '../fixed-footer-layout';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    FixedFooterLayout,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1384%3A5059',
    {
        props: {},
        example: () => <FixedFooterLayout footer={<div>Footer content</div>}>Content</FixedFooterLayout>,
    }
);

// Mobile
figma.connect(
    FixedFooterLayout,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=1335%3A6535',
    {
        props: {},
        example: () => <FixedFooterLayout footer={<div>Footer content</div>}>Content</FixedFooterLayout>,
    }
);
