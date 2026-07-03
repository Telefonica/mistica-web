// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=12965-8508
// source=src/card-data.tsx
// component=DataCard
import figma from 'figma';

const instance = figma.selectedInstance;

// "Variant" VARIANT maps onto the `variant` prop.
const variant = instance.getEnum('Variant', {
    Default: undefined,
    Brand: 'brand',
    Negative: undefined,
});

// "Size" VARIANT maps onto the `size` prop.
const size = instance.getEnum('Size', {
    Default: undefined,
    Snap: 'snap',
    Display: 'display',
});

// "Aspect ratio" VARIANT toggles the `aspectRatio` prop.
const aspectRatio = instance.getEnum('Aspect ratio', {True: '7:10', False: undefined});

// "Footer" VARIANT maps onto the `showFooter` prop.
const showFooter = instance.getEnum('Footer', {true: true, false: false});

// "Footer divider" BOOLEAN maps onto the `footerDivider` prop.
const footerDivider = instance.getBoolean('Footer divider');

// Text layers, each toggled by a BOOLEAN of the same name.
const hasPretitle = instance.getBoolean('Pretitle');
const pretitleLayer = instance.findText('Pretitle');
const pretitle = pretitleLayer.type === 'TEXT' ? pretitleLayer.textContent : '';

const hasTitle = instance.getBoolean('Title');
const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const hasSubtitle = instance.getBoolean('Subtitle');
const subtitleLayer = instance.findText('Subtitle');
const subtitle = subtitleLayer.type === 'TEXT' ? subtitleLayer.textContent : '';

const hasDescription = instance.getBoolean('Description');
const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

// "Tag" BOOLEAN toggles the headline Tag instance.
const hasTag = instance.getBoolean('Tag');
const tag = hasTag ? instance.findInstance('Tag') : null;
let headlineCode;
if (tag && tag.type === 'INSTANCE') {
    headlineCode = tag.executeTemplate().example;
}

// "Asset" BOOLEAN toggles the asset instance.
const hasAsset = instance.getBoolean('Asset');
const asset = hasAsset ? instance.findInstance('Asset') : null;
let assetCode;
if (asset && asset.type === 'INSTANCE') {
    assetCode = asset.executeTemplate().example;
}

// "Slot" BOOLEAN toggles the swappable "🔄 Replace Slot" instance.
const hasSlot = instance.getBoolean('Slot');
const slot = hasSlot ? instance.getInstanceSwap('🔄 Replace Slot') : null;
let slotCode;
if (slot && slot.type === 'INSTANCE') {
    slotCode = slot.executeTemplate().example;
}

// "Footer slot" BOOLEAN toggles the swappable "🔄 Replace footer slot" instance.
const hasFooterSlot = instance.getBoolean('Footer slot');
const footerSlot = hasFooterSlot ? instance.getInstanceSwap('🔄 Replace footer slot') : null;
let footerSlotCode;
if (footerSlot && footerSlot.type === 'INSTANCE') {
    footerSlotCode = footerSlot.executeTemplate().example;
}

// "Top actions" BOOLEAN toggles the `topActions` prop.
const hasTopActions = instance.getBoolean('Top actions');

// "Actions" BOOLEAN toggles the footer buttons. When absent the card is pressable.
const hasActions = instance.getBoolean('Actions');

export default {
    example: figma.code`
        <DataCard
            ${variant ? figma.code`variant="${variant}"` : ''}
            ${size ? figma.code`size="${size}"` : ''}
            ${aspectRatio ? figma.code`aspectRatio="${aspectRatio}"` : ''}
            ${assetCode ? figma.code`asset={${assetCode}}` : ''}
            ${headlineCode ? figma.code`headline={${headlineCode}}` : ''}
            ${hasPretitle ? figma.code`pretitle="${pretitle}"` : ''}
            ${hasTitle ? figma.code`title="${title}"` : ''}
            ${hasSubtitle ? figma.code`subtitle="${subtitle}"` : ''}
            ${hasDescription ? figma.code`description="${description}"` : ''}
            ${hasTopActions ? figma.code`topActions={[{Icon: IconLightningRegular, onPress: () => {}, label: 'Icon'}]}` : ''}
            ${!hasActions ? figma.code`onPress={() => {}}` : ''}
            ${showFooter ? 'showFooter' : ''}
            ${footerDivider ? 'footerDivider' : ''}
            ${slotCode ? figma.code`slot={${slotCode}}` : ''}
            ${footerSlotCode ? figma.code`footerSlot={${footerSlotCode}}` : ''}
            ${hasActions ? figma.code`buttonPrimary={<ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>}` : ''}
            ${hasActions ? figma.code`buttonSecondary={<ButtonSecondary onPress={() => {}}>Secondary</ButtonSecondary>}` : ''}
            ${hasActions ? figma.code`buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}` : ''}
        />
    `,
    imports: [
        'import {DataCard, ButtonPrimary, ButtonSecondary, ButtonLink, IconLightningRegular} from "@telefonica/mistica";',
    ],
    id: 'card-data-mobile',
    metadata: {nestable: false},
};
