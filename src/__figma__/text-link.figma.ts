// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=5150-4201
// source=src/text-link.tsx
// component=TextLink
import figma from 'figma';

const instance = figma.selectedInstance;

const labelLayer = instance.findText('Action');
const label = labelLayer.type === 'TEXT' ? labelLayer.textContent : '';

// "State" VARIANT (Default | Hover | Disabled) maps onto the boolean `disabled` prop.
const disabled = instance.getEnum('State', {Default: false, Hover: false, Disabled: true});

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
    id: 'text-link',
    metadata: {nestable: false},
};
