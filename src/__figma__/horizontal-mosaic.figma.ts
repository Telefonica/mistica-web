// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=15002-1176
// source=src/mosaic.tsx
// component=HorizontalMosaic
import figma from 'figma';

export default {
    example: figma.code`
        <HorizontalMosaic
            items={[<div key="1">Item 1</div>, <div key="2">Item 2</div>, <div key="3">Item 3</div>]}
        />
    `,
    imports: ['import {HorizontalMosaic} from "@telefonica/mistica";'],
    id: 'horizontal-mosaic',
    metadata: {nestable: false},
};
