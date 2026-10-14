// url=https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2308-4703
// source=src/carousel.tsx
// component=Carousel
import figma from 'figma';

const instance = figma.selectedInstance;

// "Autoplay", "Show bullets" and "Controls" are BOOLEAN properties.
const autoplay = instance.getBoolean('Autoplay');
const withBullets = instance.getBoolean('Show bullets');
const withControls = instance.getBoolean('Controls');

// "Current page" VARIANT maps onto the `initialActiveItem` index.
const initialActiveItem = instance.getEnum('Current page', {
    First: '0',
    Last: '2',
    Middle: '1',
});

export default {
    example: figma.code`
        <Carousel
            items={Array.from({length: 6}, (_, idx) => (
                <MediaCard
                    headline={<Tag type="promo">Headline</Tag>}
                    title={'Card ' + idx}
                    description="Description"
                    imageSrc="https://picsum.photos/1200/1200"
                    buttonPrimary={<ButtonPrimary small onPress={() => {}}>Action</ButtonPrimary>}
                    buttonLink={<ButtonLink small onPress={() => {}}>Link</ButtonLink>}
                />
            ))}
            itemsPerPage={{mobile: 2, desktop: 10}}
            ${initialActiveItem !== undefined ? figma.code`initialActiveItem={${initialActiveItem}}` : ''}
            ${autoplay ? 'autoplay' : ''}
            ${withBullets ? 'withBullets' : ''}
            ${withControls ? 'withControls' : ''}
        />
    `,
    imports: ['import {Carousel, MediaCard, Tag, ButtonPrimary, ButtonLink} from "@telefonica/mistica";'],
    id: 'carousel',
    metadata: {nestable: false},
};
