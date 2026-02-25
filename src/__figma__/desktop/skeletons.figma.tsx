import React from 'react';
import {SkeletonCircle, SkeletonLine, SkeletonRectangle, SkeletonRow, SkeletonText} from '../../skeletons';
import figma from '@figma/code-connect';

figma.connect(
    SkeletonCircle,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169%3A7532',
    {
        props: {},
        example: () => <SkeletonCircle size={48} />,
    }
);

figma.connect(
    SkeletonLine,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169%3A7529',
    {
        props: {},
        example: () => <SkeletonLine />,
    }
);

figma.connect(
    SkeletonRectangle,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169%3A7531',
    {
        props: {
            noBorderRadius: figma.boolean('noBorderRadius'),
        },
        example: (props) => <SkeletonRectangle noBorderRadius={props.noBorderRadius} height={100} />,
    }
);

figma.connect(
    SkeletonRow,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169%3A7530',
    {
        props: {},
        example: () => <SkeletonRow />,
    }
);

figma.connect(
    SkeletonText,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8169%3A7528',
    {
        props: {},
        example: () => <SkeletonText />,
    }
);
