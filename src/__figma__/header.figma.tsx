import React from 'react';
import {Header, MainSectionHeader} from '../header';
import figma from '@figma/code-connect';

const headerProps = {
    variant: figma.enum('Variant', {
        Brand: 'brand',
        Default: 'default',
    }),
};

// Desktop
figma.connect(
    Header,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8447%3A8670',
    {
        props: headerProps,
        example: () => <Header pretitle="Pretitle" title="Title" description="Description" />,
    }
);

figma.connect(
    MainSectionHeader,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1319%3A4796',
    {
        props: {},
        example: () => <MainSectionHeader title="Title" description="Description" />,
    }
);

// Mobile
figma.connect(
    Header,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=17101%3A10577',
    {
        props: headerProps,
        example: () => <Header pretitle="Pretitle" title="Title" description="Description" />,
    }
);
