// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=43729-102
// source=src/logo-telefonica.tsx
// component=LogoTelefonica
import figma from 'figma';

const instance = figma.selectedInstance;

// "Type" is a VARIANT mapping onto the `type` prop of the logo.
const type = instance.getEnum('Type', {
    Imagotype: 'imagotype',
    Isotype: 'isotype',
});

// The "Theme context" VARIANT (Default | Brand | Negative) is resolved from the
// surrounding theme in code, so it has no direct prop and is not mapped.

export default {
    example: figma.code`
        <LogoTelefonica ${type ? figma.code`type="${type}"` : ''} />
    `,
    imports: ['import {LogoTelefonica} from "@telefonica/mistica";'],
    id: 'logo-telefonica-mobile',
    metadata: {nestable: false},
};
