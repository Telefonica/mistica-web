// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5212-4201
// source=src/button-fixed-footer-layout.tsx
// component=ButtonFixedFooterLayout
import figma from 'figma';

const instance = figma.selectedInstance;

// The primary, secondary and link buttons are named child instances (their presence
// is driven by the "Variant" VARIANT). Resolve each dynamically and only render the
// matching slot when the instance exists in the selected variant.
const primary = instance.findInstance('Button Primary [D]');
let primaryCode;
if (primary.type === 'INSTANCE') {
    primaryCode = primary.executeTemplate().example;
}

const secondary = instance.findInstance('Button Secondary [D]');
let secondaryCode;
if (secondary.type === 'INSTANCE') {
    secondaryCode = secondary.executeTemplate().example;
}

const link = instance.findInstance('Button Link [D]');
let linkCode;
if (link.type === 'INSTANCE') {
    linkCode = link.executeTemplate().example;
}

export default {
    example: figma.code`
        <ButtonFixedFooterLayout
            ${primaryCode ? figma.code`button={${primaryCode}}` : ''}
            ${secondaryCode ? figma.code`secondaryButton={${secondaryCode}}` : ''}
            ${linkCode ? figma.code`link={${linkCode}}` : ''}
        >
            Content
        </ButtonFixedFooterLayout>
    `,
    imports: ['import {ButtonFixedFooterLayout} from "@telefonica/mistica";'],
    id: 'button-fixed-footer-layout',
    metadata: {nestable: false},
};
