// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=43729-110
// source=src/logo.tsx
// component=Logo
import figma from 'figma';

// The selected node exposes no own component properties; the brand, type and theme
// context live on a nested logo instance and are resolved from the theme in code.

export default {
    example: figma.code`<Logo />`,
    imports: ['import {Logo} from "@telefonica/mistica";'],
    id: 'logo-mobile',
    metadata: {nestable: false},
};
