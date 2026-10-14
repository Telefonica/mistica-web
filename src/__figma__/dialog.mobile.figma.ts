// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=10720-7368
// source=src/dialog.tsx
// component=Dialog
import figma from 'figma';

const instance = figma.selectedInstance;

// "Asset" BOOLEAN toggles the swappable asset ("Choose asset").
const hasAsset = instance.getBoolean('Asset');
const asset = hasAsset ? instance.getInstanceSwap('Choose asset') : undefined;
let assetCode;
if (asset && asset.type === 'INSTANCE') {
    assetCode = asset.executeTemplate().example;
}

// "Title" BOOLEAN toggles the title text layer.
const hasTitle = instance.getBoolean('Title');
const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

// "Subtitle" BOOLEAN toggles the subtitle text layer.
const hasSubtitle = instance.getBoolean('Subtitle');
const subtitleLayer = instance.findText('Subtitle');
const subtitle = subtitleLayer.type === 'TEXT' ? subtitleLayer.textContent : '';

// "Description" BOOLEAN toggles the description text layer.
const hasDescription = instance.getBoolean('Description');
const messageLayer = instance.findText('Description');
const message = messageLayer.type === 'TEXT' ? messageLayer.textContent : '';

// "Slot" BOOLEAN toggles the extra slot content.
const hasSlot = instance.getBoolean('Slot');
const slot = hasSlot ? instance.findInstance('REPLACE ME!') : undefined;
let slotCode;
if (slot && slot.type === 'INSTANCE') {
    slotCode = slot.executeTemplate().example;
}

export default {
    example: figma.code`
        <ButtonPrimary
            onPress={() =>
                dialog({
                    ${assetCode ? figma.code`asset: ${assetCode},` : ''}
                    ${hasTitle ? figma.code`title: '${title}',` : ''}
                    ${hasSubtitle ? figma.code`subtitle: '${subtitle}',` : ''}
                    ${hasDescription ? figma.code`message: '${message}',` : ''}
                    acceptText: 'Accept',
                    cancelText: 'Cancel',
                    forceWeb: true,
                    ${slotCode ? figma.code`extra: ${slotCode},` : ''}
                    showCancel: true,
                    link: <ButtonLink href="https://google.com">Link</ButtonLink>,
                })
            }
        >
            Open dialog
        </ButtonPrimary>
    `,
    imports: ['import {ButtonPrimary, ButtonLink, useDialog} from "@telefonica/mistica";'],
    id: 'dialog-mobile',
    metadata: {nestable: false},
};
