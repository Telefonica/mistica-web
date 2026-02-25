import React from 'react';
import {
    HighlightedValueBlock,
    ValueBlock,
    SimpleBlock,
    RowBlock,
    ProgressBlock,
    InformationBlock,
} from '../../community/blocks';
import figma from '@figma/code-connect';

figma.connect(
    HighlightedValueBlock,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815%3A10747',
    {
        props: {},
        example: () => <HighlightedValueBlock />,
    }
);

figma.connect(
    ValueBlock,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815%3A10731',
    {
        props: {},
        example: () => <ValueBlock />,
    }
);

figma.connect(
    SimpleBlock,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815%3A10763',
    {
        props: {},
        example: () => <SimpleBlock />,
    }
);

figma.connect(
    RowBlock,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815%3A10724',
    {
        props: {},
        example: () => <RowBlock />,
    }
);

figma.connect(
    ProgressBlock,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815%3A10713',
    {
        props: {},
        example: () => <ProgressBlock />,
    }
);

figma.connect(
    InformationBlock,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815%3A10739',
    {
        props: {},
        example: () => <InformationBlock />,
    }
);
