// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=27720-11788
// source=src/stacking-group.tsx
// component=StackingGroup
import figma from 'figma';

const instance = figma.selectedInstance;

// "Max. Items" is a VARIANT (2 … 9) mapping onto the numeric `maxItems` code prop.
const maxItems = instance.getEnum('Max. Items', {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
});

export default {
    example: figma.code`
        <StackingGroup ${maxItems ? figma.code`maxItems={${maxItems}}` : ''} moreItemsStyle={{type: 'circle', size: 40}}>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
        </StackingGroup>
    `,
    imports: ['import {StackingGroup} from "@telefonica/mistica";'],
    id: 'stacking-group-mobile',
    metadata: {nestable: false},
};
