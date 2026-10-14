// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2249-5240
// source=src/carousel.tsx
// component=Slideshow
import figma from 'figma';

const instance = figma.selectedInstance;

// "Autoplay", "Show bullets" and "Controls" are BOOLEAN properties.
const autoplay = instance.getBoolean('Autoplay');
const withBullets = instance.getBoolean('Show bullets');
const withControls = instance.getBoolean('Controls');

// "Current Slide" VARIANT maps onto the `initialPageIndex`.
const initialPageIndex = instance.getEnum('Current Slide', {
    '#1': '0',
    '#2': '1',
    '#3': '2',
    '#4': '3',
    '#5': '4',
});

export default {
    example: figma.code`
        <Slideshow
            items={[
                <Image src="https://picsum.photos/1200/1200" aspectRatio="16:9" />,
                <Image src="https://picsum.photos/1200/1200" aspectRatio="16:9" />,
            ]}
            ${initialPageIndex !== undefined ? figma.code`initialPageIndex={${initialPageIndex}}` : ''}
            ${autoplay ? 'autoplay' : ''}
            ${withBullets ? 'withBullets' : ''}
            ${withControls ? 'withControls' : ''}
        />
    `,
    imports: ['import {Slideshow, Image} from "@telefonica/mistica";'],
    id: 'slideshow',
    metadata: {nestable: false},
};
