// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815-10763
// source=src/community/blocks.tsx
// component=SimpleBlock
import figma from 'figma';

export default {
    example: figma.code`
        <SimpleBlock />
    `,
    imports: ['import {SimpleBlock} from "@telefonica/mistica/community";'],
    id: 'simple-block',
    metadata: {nestable: false},
};
