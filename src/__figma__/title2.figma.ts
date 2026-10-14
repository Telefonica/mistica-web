// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=19696-150
// source=src/title.tsx
// component=Title2
import figma from 'figma';

const instance = figma.selectedInstance;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title';

export default {
    example: figma.code`
        <Title2>${title}</Title2>
    `,
    imports: ['import {Title2} from "@telefonica/mistica";'],
    id: 'title2',
    metadata: {nestable: false},
};
