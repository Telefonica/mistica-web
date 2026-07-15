// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=9511-6607
// source=src/text-link.tsx
// component=TextLink
import figma from 'figma';

const instance = figma.selectedInstance;

const labelLayer = instance.findText('Link');
const label = labelLayer.type === 'TEXT' ? labelLayer.textContent : '';

// "State" VARIANT (Default | Disabled) maps onto the boolean `disabled` prop.
const disabled = instance.getEnum('State', {Default: false, Disabled: true});

// "Underline" VARIANT maps onto the `underline` prop.
const underline = instance.getEnum('Underline', {Always: 'always', onHover: 'on hover'});

export default {
    example: figma.code`
        <TextLink
            underline="${underline}"
            ${disabled ? 'disabled' : ''}
            onPress={() => {}}
        >
            ${label}
        </TextLink>
    `,
    imports: ['import {TextLink} from "@telefonica/mistica";'],
    id: 'text-link-mobile',
    metadata: {nestable: false},
};
