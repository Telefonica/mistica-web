// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815-10747
// source=src/community/blocks.tsx
// component=HighlightedValueBlock
import figma from 'figma';

export default {
    example: figma.code`
        <HighlightedValueBlock />
    `,
    imports: ['import {HighlightedValueBlock} from "@telefonica/mistica/community";'],
    id: 'highlighted-value-block',
    metadata: {nestable: false},
};
