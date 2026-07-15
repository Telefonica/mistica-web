// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=32416-2749
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
    id: 'horizontal-mosaic-mobile',
    metadata: {nestable: false},
};
