// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=35946-4151
// source=src/button-layout.tsx
// component=ButtonLayout
import figma from 'figma';

const instance = figma.selectedInstance;

// "Align" VARIANT maps to the `align` prop.
const align = instance.getEnum('Align', {
    'Full width': 'full-width',
    Left: 'left',
    Center: 'center',
    Right: 'right',
});

// The primary, secondary and link buttons are named child instances (their presence
// is driven by the "Primary", "Secondary" and "Link" VARIANTs). Resolve each
// dynamically and only render the matching slot when the instance is present.
const primary = instance.findInstance('Button Primary');
let primaryCode;
if (primary.type === 'INSTANCE') {
    primaryCode = primary.executeTemplate().example;
}

const secondary = instance.findInstance('Button Secondary');
let secondaryCode;
if (secondary.type === 'INSTANCE') {
    secondaryCode = secondary.executeTemplate().example;
}

const link = instance.findInstance('Button Link');
let linkCode;
if (link.type === 'INSTANCE') {
    linkCode = link.executeTemplate().example;
}

export default {
    example: figma.code`
        <ButtonLayout
            align="${align}"
            ${primaryCode ? figma.code`primaryButton={${primaryCode}}` : ''}
            ${secondaryCode ? figma.code`secondaryButton={${secondaryCode}}` : ''}
            ${linkCode ? figma.code`link={${linkCode}}` : ''}
        />
    `,
    imports: ['import {ButtonLayout} from "@telefonica/mistica";'],
    id: 'button-layout-mobile',
    metadata: {nestable: false},
};
