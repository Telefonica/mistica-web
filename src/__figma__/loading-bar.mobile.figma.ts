// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=0-2450
// source=src/loading-bar.tsx
// component=LoadingBar
import figma from 'figma';

export default {
    example: figma.code`
        <LoadingBar visible />
    `,
    imports: ['import {LoadingBar} from "@telefonica/mistica";'],
    id: 'loading-bar-mobile',
    metadata: {nestable: false},
};
