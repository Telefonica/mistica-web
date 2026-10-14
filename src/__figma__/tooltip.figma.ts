// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1636-5385
// source=src/tooltip.tsx
// component=Tooltip
import figma from 'figma';

const instance = figma.selectedInstance;

// "Title" / "Description" are BOOLEANs toggling the corresponding component-property TEXT.
const hasTitle = instance.getBoolean('Title');
const title = instance.getString('Title Text');

const hasDescription = instance.getBoolean('Description');
const description = instance.getString('Description Text');

// "Delay" is a BOOLEAN mapping onto the boolean `delay` code prop.
const delay = instance.getBoolean('Delay');

// "Arrow position" is a VARIANT mapping onto the `position` code prop.
const position = instance.getEnum('Arrow position', {
    '↑ Top': 'top',
    '→ Right': 'right',
    '↓ Bottom': 'bottom',
    '← Left': 'left',
});

export default {
    example: figma.code`
        <Tooltip
            target={<span>Target element</span>}
            ${hasTitle ? figma.code`title="${title}"` : ''}
            ${hasDescription ? figma.code`description="${description}"` : ''}
            position="${position}"
            ${delay ? 'delay' : ''}
        />
    `,
    imports: ['import {Tooltip} from "@telefonica/mistica";'],
    id: 'tooltip',
    metadata: {nestable: false},
};
