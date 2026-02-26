import React from 'react';
import {Title1, Title2, Title3, Title4} from '../title';
import figma from '@figma/code-connect';

// Desktop
figma.connect(
    Title1,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8266%3A7529',
    {
        props: {},
        example: () => <Title1>Title</Title1>,
    }
);

figma.connect(
    Title2,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=19696%3A150',
    {
        props: {},
        example: () => <Title2>Title</Title2>,
    }
);

figma.connect(
    Title3,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8266%3A7530',
    {
        props: {},
        example: () => <Title3>Title</Title3>,
    }
);

figma.connect(
    Title4,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=11396%3A139',
    {
        props: {},
        example: () => <Title4>Title</Title4>,
    }
);

// Mobile
figma.connect(
    Title1,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=23715%3A135',
    {
        props: {},
        example: () => <Title1>Title</Title1>,
    }
);
