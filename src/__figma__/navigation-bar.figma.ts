// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=1153-4246
// source=src/navigation-bar.tsx
// component=NavigationBar
import figma from 'figma';

const instance = figma.selectedInstance;

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

// "Back" BOOLEAN toggles the back navigation control, which maps onto the onBack callback.
const hasBack = instance.getBoolean('Back');

// "Wide" is a Figma VARIANT (true | false) mapping onto the boolean `wide` prop.
const wide = instance.getEnum('Wide', {true: true, false: false});

export default {
    example: figma.code`
        <NavigationBar
            title="${title}"
            ${hasBack ? 'onBack={() => {}}' : ''}
            ${wide ? 'wide' : ''}
        />
    `,
    imports: ['import {NavigationBar} from "@telefonica/mistica";'],
    id: 'navigation-bar',
    metadata: {nestable: false},
};
