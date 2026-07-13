// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=184-5972
// source=src/button-group.tsx
// component=ButtonGroup
import figma from 'figma';

const instance = figma.selectedInstance;

// The primary, secondary and link buttons are named child instances (their presence
// is driven by the "Variant" VARIANT). Resolve each dynamically and only render the
// matching slot when the instance exists in the selected variant.
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

let link = instance.findInstance('ButtonLink');
if (link.type !== 'INSTANCE') {
    link = instance.findInstance('Button Link');
}
let linkCode;
if (link.type === 'INSTANCE') {
    linkCode = link.executeTemplate().example;
}

export default {
    example: figma.code`
        <ButtonGroup
            ${primaryCode ? figma.code`primaryButton={${primaryCode}}` : ''}
            ${secondaryCode ? figma.code`secondaryButton={${secondaryCode}}` : ''}
            ${linkCode ? figma.code`link={${linkCode}}` : ''}
        />
    `,
    imports: ['import {ButtonGroup} from "@telefonica/mistica";'],
    id: 'button-group-mobile',
    metadata: {nestable: false},
};
