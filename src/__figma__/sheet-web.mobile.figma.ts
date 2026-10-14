// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=10854-7964
// source=src/sheet-web.tsx
// component=SheetWeb
import figma from 'figma';

// The Figma node exposes only prototyping toggles ("PROTO GUIDE", "Hide sheet
// (for prototyping)") which have no correspondence in the code component props.

export default {
    example: figma.code`
        <SheetWeb />
    `,
    imports: ['import {SheetWeb} from "@telefonica/mistica";'],
    id: 'sheet-web-mobile',
    metadata: {nestable: false},
};
