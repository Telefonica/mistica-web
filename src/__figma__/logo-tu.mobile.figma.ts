// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=43729-104
// source=src/logo-tu.tsx
// component=LogoTu
import figma from 'figma';

// The "Theme context" VARIANT (Default | Brand | Negative) is resolved from the
// surrounding theme in code, so it has no direct prop and is not mapped.

export default {
    example: figma.code`<LogoTu />`,
    imports: ['import {LogoTu} from "@telefonica/mistica";'],
    id: 'logo-tu-mobile',
    metadata: {nestable: false},
};
