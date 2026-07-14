// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1205-4167
// source=src/popover.tsx
// component=Popover
import figma from 'figma';

const instance = figma.selectedInstance;

// "Title" and "Description" are BOOLEAN properties toggling fixed text content.
const hasTitle = instance.getBoolean('Title');
const hasDescription = instance.getBoolean('Description');

// "Position" is a VARIANT mapping onto the `position` code prop.
const position = instance.getEnum('Position', {
    Bottom: 'bottom',
    Left: 'left',
    Top: 'top',
    Right: 'right',
});

export default {
    example: figma.code`
        <Popover
            target={<span>Target element</span>}
            ${hasTitle ? figma.code`title="Title"` : ''}
            ${hasDescription ? figma.code`description="Description"` : ''}
            position="${position}"
        />
    `,
    imports: ['import {Popover} from "@telefonica/mistica";'],
    id: 'popover',
    metadata: {nestable: false},
};
