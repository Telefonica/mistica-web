// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=15059-506
// source=src/loading-screen.tsx
// component=LoadingScreen
import figma from 'figma';

const instance = figma.selectedInstance;

// "Title" BOOLEAN toggles the title text layer of the same name.
const hasTitle = instance.getBoolean('Title');
const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

// "Description" BOOLEAN toggles the description text layer of the same name.
const hasDescription = instance.getBoolean('Description');
const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

export default {
    example: figma.code`
        <LoadingScreen
            ${hasTitle ? figma.code`title="${title}"` : ''}
            ${hasDescription ? figma.code`description="${description}"` : ''}
        />
    `,
    imports: ['import {LoadingScreen} from "@telefonica/mistica";'],
    id: 'loading-screen',
    metadata: {nestable: false},
};
