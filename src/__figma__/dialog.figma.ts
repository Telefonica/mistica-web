// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5680-5004
// source=src/dialog.tsx
// component=Dialog
import figma from 'figma';

const instance = figma.selectedInstance;

// "Icon" BOOLEAN toggles the swappable asset ("Choose icon").
const hasIcon = instance.getBoolean('Icon');
const asset = hasIcon ? instance.getInstanceSwap('Choose icon') : undefined;
let assetCode;
if (asset && asset.type === 'INSTANCE') {
    assetCode = asset.executeTemplate().example;
}

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

// "Subtitle" BOOLEAN toggles the subtitle text layer.
const hasSubtitle = instance.getBoolean('Subtitle');
const subtitleLayer = instance.findText('Subtitle');
const subtitle = subtitleLayer.type === 'TEXT' ? subtitleLayer.textContent : '';

// "Description" BOOLEAN toggles the description text layer.
const hasDescription = instance.getBoolean('Description');
const messageLayer = instance.findText('Description text');
const message = messageLayer.type === 'TEXT' ? messageLayer.textContent : '';

// "Slot" BOOLEAN toggles the extra slot content.
const hasSlot = instance.getBoolean('Slot');

export default {
    example: figma.code`
        <ButtonPrimary
            onPress={() =>
                dialog({
                    ${assetCode ? figma.code`asset: ${assetCode},` : ''}
                    title: '${title}',
                    ${hasSubtitle ? figma.code`subtitle: '${subtitle}',` : ''}
                    ${hasDescription ? figma.code`message: '${message}',` : ''}
                    acceptText: 'Accept',
                    cancelText: 'Cancel',
                    ${hasSlot ? figma.code`extra: <Text1 regular>This is the slot zone</Text1>,` : ''}
                    showCancel: true,
                    link: <ButtonLink href="https://google.com">Link</ButtonLink>,
                })
            }
        >
            Open dialog
        </ButtonPrimary>
    `,
    imports: ['import {ButtonPrimary, ButtonLink, Text1, useDialog} from "@telefonica/mistica";'],
    id: 'dialog',
    metadata: {nestable: false},
};
