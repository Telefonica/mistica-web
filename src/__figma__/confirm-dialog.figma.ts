// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5689-4566
// source=src/dialog.tsx
// component=Dialog
import figma from 'figma';

const instance = figma.selectedInstance;

// "Title" BOOLEAN toggles the title text layer of the same name.
const hasTitle = instance.getBoolean('Title');
const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const messageLayer = instance.findText('Description text');
const message = messageLayer.type === 'TEXT' ? messageLayer.textContent : '';

export default {
    example: figma.code`
        <ButtonPrimary
            onPress={() =>
                confirm({
                    ${hasTitle ? figma.code`title: '${title}',` : ''}
                    message: '${message}',
                    acceptText: 'Accept',
                    cancelText: 'Cancel',
                })
            }
        >
            Open dialog
        </ButtonPrimary>
    `,
    imports: ['import {ButtonPrimary, useDialog} from "@telefonica/mistica";'],
    id: 'confirm-dialog',
    metadata: {nestable: false},
};
