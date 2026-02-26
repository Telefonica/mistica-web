import React from 'react';
import {HorizontalMosaic, VerticalMosaic} from '../mosaic';
import figma from '@figma/code-connect';

figma.connect(
    HorizontalMosaic,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=15002%3A1176',
    {
        props: {},
        example: () => (
            <HorizontalMosaic
                items={[<div key="1">Item 1</div>, <div key="2">Item 2</div>, <div key="3">Item 3</div>]}
            />
        ),
    }
);

figma.connect(
    VerticalMosaic,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=15002%3A911',
    {
        props: {},
        example: () => (
            <VerticalMosaic
                items={[<div key="1">Item 1</div>, <div key="2">Item 2</div>, <div key="3">Item 3</div>]}
            />
        ),
    }
);
