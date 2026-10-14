// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=2203-7639
// source=src/boxed.tsx
// component=Boxed
import figma from 'figma';

const instance = figma.selectedInstance;

// "Variant" VARIANT maps to the `variant` prop.
const variant = instance.getEnum('Variant', {
    Default: 'default',
    Brand: 'brand',
    Negative: 'negative',
});

// "Slot" BOOLEAN toggles the swappable "🔄 Replace slot" instance rendered as children.
const hasChildren = instance.getBoolean('Slot');
const child = hasChildren ? instance.getInstanceSwap('🔄 Replace slot') : null;
let childCode;
if (child && child.type === 'INSTANCE') {
    childCode = child.executeTemplate().example;
}

export default {
    example: figma.code`
        <Boxed ${variant && variant !== 'default' ? figma.code`variant="${variant}"` : ''}>
            ${childCode}
        </Boxed>
    `,
    imports: ['import {Boxed} from "@telefonica/mistica";'],
    id: 'boxed-mobile',
    metadata: {nestable: false},
};
