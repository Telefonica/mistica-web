// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=28742-89
// source=src/feedback.tsx
// component=SuccessFeedbackScreen
import figma from 'figma';

const instance = figma.selectedInstance;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

export default {
    example: figma.code`
        <SuccessFeedbackScreen title="${title}" description="${description}" />
    `,
    imports: ['import {SuccessFeedbackScreen} from "@telefonica/mistica";'],
    id: 'success-feedback-screen',
    metadata: {nestable: false},
};
