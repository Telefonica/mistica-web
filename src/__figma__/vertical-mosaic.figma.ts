// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=15002-911
// source=src/mosaic.tsx
// component=VerticalMosaic
import figma from 'figma';

export default {
    example: figma.code`
        <VerticalMosaic
            items={[<div key="1">Item 1</div>, <div key="2">Item 2</div>, <div key="3">Item 3</div>]}
        />
    `,
    imports: ['import {VerticalMosaic} from "@telefonica/mistica";'],
    id: 'vertical-mosaic',
    metadata: {nestable: false},
};
