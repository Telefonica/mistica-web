// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1298-5658
// source=src/list.tsx
// component=BoxedRow
import figma from 'figma';

const instance = figma.selectedInstance;

// Title/Subtitle/Description text and the row toggles live inside the nested
// "List Structure" instance. Resolve it so its component properties are readable.
const listStructure = instance.findInstance('List Structure');
const ls = listStructure.type === 'INSTANCE' ? listStructure : undefined;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const hasSubtitle = ls ? ls.getBoolean('Subtitle') : false;
const subtitleLayer = instance.findText('Subtitle');
const subtitle = subtitleLayer.type === 'TEXT' ? subtitleLayer.textContent : '';

const hasDescription = ls ? ls.getBoolean('Description') : false;
const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

// "Badge" BOOLEAN on the nested List Structure toggles the row badge.
const hasBadge = ls ? ls.getBoolean('Badge') : false;

// "Slot" BOOLEAN toggles the swappable "🔄 Replace Slot" instance rendered as `extra`.
const hasExtra = ls ? ls.getBoolean('Slot') : false;
const extra = hasExtra && ls ? ls.getInstanceSwap('🔄 Replace Slot') : null;
let extraCode;
if (extra && extra.type === 'INSTANCE') {
    extraCode = extra.executeTemplate().example;
}

// "Asset" BOOLEAN toggles the swappable asset instance rendered as `asset`.
const hasAsset = ls ? ls.getBoolean('Asset') : false;
const asset = hasAsset && ls ? ls.getInstanceSwap('Choose icon') : null;
let assetCode;
if (asset && asset.type === 'INSTANCE') {
    assetCode = asset.executeTemplate().example;
}

// "Disabled" and "Danger" are Figma VARIANTs mapping onto boolean code props.
const disabled = instance.getEnum('Disabled', {False: false, True: true});
const danger = instance.getEnum('Danger', {False: false, True: true});

export default {
    example: figma.code`
        <BoxedRow
            title="${title}"
            ${hasSubtitle ? figma.code`subtitle="${subtitle}"` : ''}
            ${hasDescription ? figma.code`description="${description}"` : ''}
            ${hasBadge ? 'badge' : ''}
            ${assetCode ? figma.code`asset={${assetCode}}` : ''}
            ${extraCode ? figma.code`extra={${extraCode}}` : ''}
            ${disabled ? 'disabled' : ''}
            ${danger ? 'danger' : ''}
        />
    `,
    imports: ['import {BoxedRow} from "@telefonica/mistica";'],
    id: 'boxed-row',
    metadata: {nestable: false},
};
