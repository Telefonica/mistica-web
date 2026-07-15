// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=567-10354
// source=src/feedback.tsx
// component=InfoFeedbackScreen
import figma from 'figma';

const instance = figma.selectedInstance;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

export default {
    example: figma.code`
        <InfoFeedbackScreen title="${title}" description="${description}" />
    `,
    imports: ['import {InfoFeedbackScreen} from "@telefonica/mistica";'],
    id: 'info-feedback-screen',
    metadata: {nestable: false},
};
