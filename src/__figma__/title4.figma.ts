// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=11396-139
// source=src/title.tsx
// component=Title4
import figma from 'figma';

const instance = figma.selectedInstance;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title';

export default {
    example: figma.code`
        <Title4>${title}</Title4>
    `,
    imports: ['import {Title4} from "@telefonica/mistica";'],
    id: 'title4',
    metadata: {nestable: false},
};
