// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815-10731
// source=src/community/blocks.tsx
// component=ValueBlock
import figma from 'figma';

export default {
    example: figma.code`
        <ValueBlock />
    `,
    imports: ['import {ValueBlock} from "@telefonica/mistica/community";'],
    id: 'value-block',
    metadata: {nestable: false},
};
