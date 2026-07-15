// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=15890-11120
// source=src/hero.tsx
// component=Hero
import figma from 'figma';

const instance = figma.selectedInstance;

const background = instance.getEnum('Background', {
    Default: 'default',
    Brand: 'brand',
    'Brand Secondary': 'brand-secondary',
    Alternative: 'alternative',
});

// "NoPaddingY" is a VARIANT (True | False) mapping to the boolean `noPaddingY` code prop.
const noPaddingY = instance.getEnum('NoPaddingY', {True: true, False: false});

const titleLayer = instance.findText('Title');
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : '';

const descriptionLayer = instance.findText('Description');
const description = descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : '';

// The media is provided through the "Media type" instance.
const media = instance.findInstance('Media type');
let mediaCode;
if (media && media.type === 'INSTANCE') {
    mediaCode = media.executeTemplate().example;
}

export default {
    example: figma.code`
        <Hero
            background="${background}"
            media={${mediaCode}}
            title="${title}"
            description="${description}"
            ${noPaddingY ? 'noPaddingY' : ''}
        />
    `,
    imports: ['import {Hero} from "@telefonica/mistica";'],
    id: 'hero-mobile',
    metadata: {nestable: false},
};
