// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8266-7529
// source=src/title.tsx
// component=Title1
import figma from 'figma';

const instance = figma.selectedInstance;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title';

export default {
    example: figma.code`
        <Title1>${title}</Title1>
    `,
    imports: ['import {Title1} from "@telefonica/mistica";'],
    id: 'title1',
    metadata: {nestable: false},
};
