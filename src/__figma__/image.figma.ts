// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=569-24369
// source=src/image.tsx
// component=Image
import figma from 'figma';

const instance = figma.selectedInstance;

// "Type" is a VARIANT; only the Circular option maps to the boolean `circular` code prop.
const circular = instance.getEnum('Type', {Circular: true});

// "Border radius" VARIANT (True | False) maps inversely to the `noBorderRadius` code prop.
const noBorderRadius = instance.getEnum('Border radius', {True: false, False: true});

// "Border" VARIANT (True | False) maps to the boolean `border` code prop.
const border = instance.getEnum('Border', {True: true, False: false});

export default {
    example: figma.code`
        <Image
            src="https://example.com/image.jpg"
            ${circular ? 'circular' : ''}
            ${noBorderRadius ? 'noBorderRadius' : ''}
            ${border ? 'border' : ''}
        />
    `,
    imports: ['import {Image} from "@telefonica/mistica";'],
    id: 'image',
    metadata: {nestable: false},
};
