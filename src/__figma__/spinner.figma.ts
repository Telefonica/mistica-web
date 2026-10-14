// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=809-5303
// source=src/spinner.tsx
// component=Spinner
import figma from 'figma';

// The Figma node exposes only a "Theme context" VARIANT which has no
// correspondence in the code component props.

export default {
    example: figma.code`
        <Spinner />
    `,
    imports: ['import {Spinner} from "@telefonica/mistica";'],
    id: 'spinner',
    metadata: {nestable: false},
};
