// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8266-7530
// source=src/title.tsx
// component=Title3
import figma from 'figma';

const instance = figma.selectedInstance;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title';

export default {
    example: figma.code`
        <Title3>${title}</Title3>
    `,
    imports: ['import {Title3} from "@telefonica/mistica";'],
    id: 'title3',
    metadata: {nestable: false},
};
