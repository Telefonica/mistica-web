// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=567-9999
// source=src/feedback.tsx
// component=ErrorFeedbackScreen
import figma from 'figma';

const instance = figma.selectedInstance;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

export default {
    example: figma.code`
        <ErrorFeedbackScreen title="${title}" description="${description}" />
    `,
    imports: ['import {ErrorFeedbackScreen} from "@telefonica/mistica";'],
    id: 'error-feedback-screen',
    metadata: {nestable: false},
};
