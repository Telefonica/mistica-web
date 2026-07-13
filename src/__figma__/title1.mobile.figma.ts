// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=23715-135
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
    id: 'title1-mobile',
    metadata: {nestable: false},
};
