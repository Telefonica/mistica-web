// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=10815-10713
// source=src/community/blocks.tsx
// component=ProgressBlock
import figma from 'figma';

export default {
    example: figma.code`
        <ProgressBlock heading={{value: '75%', text: 'Progress'}} />
    `,
    imports: ['import {ProgressBlock} from "@telefonica/mistica/community";'],
    id: 'progress-block',
    metadata: {nestable: false},
};
