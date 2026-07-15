// url=https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=4229-8914
// source=src/carousel.tsx
// component=Carousel
import figma from 'figma';

const instance = figma.selectedInstance;

// "Autoplay", "Show bullets" and "Controls" are BOOLEAN properties.
const autoplay = instance.getBoolean('Autoplay');
const withBullets = instance.getBoolean('Show bullets');
const withControls = instance.getBoolean('Controls');

// "Items per page" VARIANT maps onto the `itemsPerPage` prop.
const itemsPerPage = instance.getEnum('Items per page', {'1': '1', '2': '2'});

// "Current slide" VARIANT maps onto the `initialActiveItem` index.
const initialActiveItem = instance.getEnum('Current slide', {
    '#1': '0',
    '#2': '1',
    '#3': '2',
    '#4': '3',
    '#5': '4',
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
            ${itemsPerPage !== undefined ? figma.code`itemsPerPage={${itemsPerPage}}` : ''}
            ${initialActiveItem !== undefined ? figma.code`initialActiveItem={${initialActiveItem}}` : ''}
            ${autoplay ? 'autoplay' : ''}
            ${withBullets ? 'withBullets' : ''}
            ${withControls ? 'withControls' : ''}
        />
    `,
    imports: ['import {Carousel, MediaCard, Tag, ButtonPrimary, ButtonLink} from "@telefonica/mistica";'],
    id: 'carousel-mobile',
    metadata: {nestable: false},
};
