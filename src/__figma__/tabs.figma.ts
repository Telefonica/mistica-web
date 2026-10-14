// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=571-6553
// source=src/tabs.tsx
// component=Tabs
import figma from 'figma';

// The Figma node exposes "Theme context" and "Icon" VARIANTs which have no direct
// code-prop correspondence; the tabs are provided as a static example.

export default {
    example: figma.code`
        <Tabs
            selectedIndex={0}
            onChange={() => {}}
            tabs={[{text: 'Tab 1'}, {text: 'Tab 2'}, {text: 'Tab 3'}]}
        />
    `,
    imports: ['import {Tabs} from "@telefonica/mistica";'],
    id: 'tabs',
    metadata: {nestable: false},
};
