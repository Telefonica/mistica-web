// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=6180-9123
// source=src/badge.tsx
// component=Badge
import figma from 'figma';

const instance = figma.selectedInstance;

// "+9" and "Non-numeric" are VARIANT properties (False | True), not Figma BOOLEAN
// properties. When "+9" is True the badge shows a big number (15). Otherwise, when
// "Non-numeric" is True the badge renders a dot (no `value`), and when both are
// False it shows a numeric value (2).
const bigNumber = instance.getEnum('+9', {True: true, False: false});
const nonNumeric = instance.getEnum('Non-numeric', {True: true, False: false});

const value = bigNumber ? 15 : nonNumeric ? undefined : 2;

export default {
    example: figma.code`
        <Badge value={${value}}>
            {/* The content inside the badge is optional and can be used to display anything. For example <IconHeartRegular /> or <Avatar /> */}
        </Badge>
    `,
    imports: ['import {Badge} from "@telefonica/mistica";'],
    id: 'badge-mobile',
    metadata: {nestable: false},
};
