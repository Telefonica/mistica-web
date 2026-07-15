// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=29254-860
// source=src/carousel.tsx
// component=CenteredCarousel
import figma from 'figma';

const instance = figma.selectedInstance;

// "Show bullets" and "Controls" are BOOLEAN properties.
const withBullets = instance.getBoolean('Show bullets');
const withControls = instance.getBoolean('Controls');

// "Current page" VARIANT maps onto the `initialActiveItem` index.
const initialActiveItem = instance.getEnum('Current page', {
    '#1': '0',
    '#2': '1',
    '#3': '2',
    '#4': '3',
});

export default {
    example: figma.code`
        <CenteredCarousel
            items={Array.from({length: 6}, (_, idx) => (
                <Circle backgroundColor={skinVars.colors.brand} size={160}>
                    <Text10>{idx}</Text10>
                </Circle>
            ))}
            ${initialActiveItem !== undefined ? figma.code`initialActiveItem={${initialActiveItem}}` : ''}
            ${withBullets ? 'withBullets' : ''}
            ${withControls ? 'withControls' : ''}
        />
    `,
    imports: ['import {CenteredCarousel, Circle, Text10, skinVars} from "@telefonica/mistica";'],
    id: 'centered-carousel',
    metadata: {nestable: false},
};
