// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=8447-8670
// source=src/header.tsx
// component=Header
import figma from 'figma';

const instance = figma.selectedInstance;

const pretitleLayer = instance.findText('Pre-title');
const pretitle = pretitleLayer.type === 'TEXT' ? pretitleLayer.textContent : '';

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

export default {
    example: figma.code`
        <Header pretitle="${pretitle}" title="${title}" description="${description}" />
    `,
    imports: ['import {Header} from "@telefonica/mistica";'],
    id: 'header',
    metadata: {nestable: false},
};
