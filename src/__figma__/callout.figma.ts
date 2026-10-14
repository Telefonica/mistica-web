// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=775-154
// source=src/callout.tsx
// component=Callout
import figma from 'figma';

const instance = figma.selectedInstance;

// "Title" BOOLEAN toggles the title text layer of the same name.
const hasTitle = instance.getBoolean('Title');
const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

// "Dismissable" BOOLEAN toggles the close action (the `onClose` prop).
const dismissable = instance.getBoolean('Dismissable');

// "Theme context" VARIANT maps onto the `variant` prop.
const variant = instance.getEnum('Theme context', {
    Default: 'default',
    Brand: 'brand',
    Alternative: 'default',
    Negative: undefined,
});

// "Asset" BOOLEAN toggles the asset instance rendered as the `asset` prop.
const hasAsset = instance.getBoolean('Asset');
const asset = hasAsset ? instance.findInstance('Icon sizes (by default) [D]') : null;
let assetCode;
if (asset && asset.type === 'INSTANCE') {
    assetCode = asset.executeTemplate().example;
}

// "Action" BOOLEAN toggles the button group (primary button and link).
const hasAction = instance.getBoolean('Action');
const buttonLink = hasAction ? instance.findInstance('Button Link [D]') : null;
let buttonLinkCode;
if (buttonLink && buttonLink.type === 'INSTANCE') {
    buttonLinkCode = buttonLink.executeTemplate().example;
}

export default {
    example: figma.code`
        <Callout
            ${hasTitle ? figma.code`title="${title}"` : ''}
            description="${description}"
            ${variant ? figma.code`variant="${variant}"` : ''}
            ${assetCode ? figma.code`asset={${assetCode}}` : ''}
            ${dismissable ? figma.code`onClose={() => {}}` : ''}
            ${hasAction ? figma.code`button={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}` : ''}
            ${buttonLinkCode ? figma.code`buttonLink={${buttonLinkCode}}` : ''}
        />
    `,
    imports: ['import {Callout, ButtonPrimary} from "@telefonica/mistica";'],
    id: 'callout',
    metadata: {nestable: false},
};
