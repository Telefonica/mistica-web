// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=13418-3207
// source=src/accordion.tsx
// component=BoxedAccordion
import figma from 'figma';

const instance = figma.selectedInstance;

// "Auto collapse" is a BOOLEAN mapping to the `singleOpen` prop.
const singleOpen = instance.getBoolean('Auto collapse');

// "Variant" is a VARIANT (Default | Brand) mapping to the item `variant` prop.
const variant = instance.getEnum('Variant', {Default: 'default', Brand: 'brand'});

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

// "Subtitle" is a VARIANT (True | False) toggling the subtitle text layer.
const hasSubtitle = instance.getEnum('Subtitle', {True: true, False: false});
const subtitleLayer = instance.findText('Subtitle');
const subtitle = subtitleLayer.type === 'TEXT' ? subtitleLayer.textContent : '';

const bodyLayer = instance.findText('Body content');
const content = bodyLayer.type === 'TEXT' ? bodyLayer.textContent : '';

// "Detail" is a BOOLEAN toggling the detail text layer of the same name.
const hasDetail = instance.getBoolean('Detail');
const detailLayer = instance.findText('Detail');
const detail = detailLayer.type === 'TEXT' ? detailLayer.textContent : '';

// "Asset" BOOLEAN toggles the "Asset" child instance rendered as the `asset` slot.
const hasAsset = instance.getBoolean('Asset');
const asset = hasAsset ? instance.findInstance('Asset') : null;
let assetCode;
if (asset && asset.type === 'INSTANCE') {
    assetCode = asset.executeTemplate().example;
}

// "Right slot" BOOLEAN toggles the swappable "🔄 Replace right slot" instance.
const hasRight = instance.getBoolean('Right slot');
const right = hasRight ? instance.getInstanceSwap('🔄 Replace right slot') : null;
let rightCode;
if (right && right.type === 'INSTANCE') {
    rightCode = right.executeTemplate().example;
}

export default {
    example: figma.code`
        <BoxedAccordion ${singleOpen ? 'singleOpen' : ''}>
            <BoxedAccordionItem
                variant="${variant}"
                title="${title}"
                ${hasSubtitle ? figma.code`subtitle="${subtitle}"` : ''}
                content={<Text3 regular color={skinVars.colors.textSecondary}>${content}</Text3>}
                ${hasDetail ? figma.code`detail="${detail}"` : ''}
                ${assetCode ? figma.code`asset={${assetCode}}` : ''}
                ${rightCode ? figma.code`right={${rightCode}}` : ''}
            />
        </BoxedAccordion>
    `,
    imports: ['import {BoxedAccordion, BoxedAccordionItem, Text3, skinVars} from "@telefonica/mistica";'],
    id: 'boxed-accordion',
    metadata: {nestable: false},
};
