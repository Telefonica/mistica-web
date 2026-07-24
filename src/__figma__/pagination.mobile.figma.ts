// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=66931-3740
// source=src/pagination.tsx
// component=Pagination
import figma from 'figma';

const instance = figma.selectedInstance;

// "Mode" is a VARIANT: "Default" → mode="default", "Icon only" → mode="iconOnly".
const mode = instance.getEnum('Mode', {
    Default: 'default',
    'Icon only': 'iconOnly',
});

// "Show all pages" (True | False) is a Figma-only simplification: whether ellipsis
// appears depends on the combination of totalPages and surroundingPageCount, not a
// single prop. It has no direct code prop mapping and is omitted.

// "Current page" (Start | Middle | End) is a Figma-only simplification to show
// navigation control states; it has no direct code prop mapping and is omitted.

const hideNavigationControls = instance.getBoolean('Hide navigation controls');
const hidePageList = instance.getBoolean('Hide page list');

export default {
    example: figma.code`
        <Pagination
            totalPages={9}
            currentPage={3}
            onChange={() => {}}
            ${mode === 'iconOnly' ? 'mode="iconOnly"' : ''}
            ${hideNavigationControls ? 'hideNavigationControls' : ''}
            ${hidePageList ? 'hidePageList' : ''}
        />
    `,
    imports: ['import {Pagination} from "@telefonica/mistica";'],
    id: 'pagination-mobile',
    metadata: {nestable: false},
};
