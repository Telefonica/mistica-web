// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=0-2450
// source=src/loading-bar.tsx
// component=LoadingBar
import figma from 'figma';

export default {
    example: figma.code`
        <LoadingBar visible />
    `,
    imports: ['import {LoadingBar} from "@telefonica/mistica";'],
    id: 'loading-bar',
    metadata: {nestable: false},
};
