// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1319-4796
// source=src/header.tsx
// component=MainSectionHeader
import figma from 'figma';

const instance = figma.selectedInstance;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

export default {
    example: figma.code`
        <MainSectionHeader title="${title}" description="${description}" />
    `,
    imports: ['import {MainSectionHeader} from "@telefonica/mistica";'],
    id: 'main-section-header',
    metadata: {nestable: false},
};
