import React from 'react';
import {
    Carousel,
    CenteredCarousel,
    Slideshow,
    MediaCard,
    Tag,
    ButtonPrimary,
    ButtonLink,
    Image,
    Circle,
    Text10,
    skinVars,
} from '../../dist';
import figma from '@figma/code-connect';

const carouselProps = {
    autoplay: figma.boolean('Autoplay'),
    withBullets: figma.boolean('Show bullets'),
    withControls: figma.boolean('Controls'),
};

// Desktop
figma.connect(
    Carousel,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2308%3A4703',
    {
        props: {
            ...carouselProps,
            initialActiveItem: figma.enum('Current page', {
                First: 0,
                Middle: 1,
                Last: 2,
            }),
        },
        example: (props) => (
            <Carousel
                items={Array.from({length: 6}, (_, idx) => (
                    <MediaCard
                        headline={<Tag type="promo">Headline</Tag>}
                        title={'Card ' + idx}
                        description="Description"
                        imageSrc="https://picsum.photos/1200/1200"
                        buttonPrimary={
                            <ButtonPrimary small onPress={() => {}}>
                                Action
                            </ButtonPrimary>
                        }
                        buttonLink={
                            <ButtonLink small onPress={() => {}}>
                                Link
                            </ButtonLink>
                        }
                    />
                ))}
                itemsPerPage={{mobile: 2, desktop: 10}}
                initialActiveItem={props.initialActiveItem}
                autoplay={props.autoplay}
                withBullets={props.withBullets}
                withControls={props.withControls}
            />
        ),
    }
);

figma.connect(
    CenteredCarousel,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=29254%3A860',
    {
        props: {
            ...carouselProps,
            initialActiveItem: figma.enum('Current page', {
                First: 0,
                Middle: 1,
                Last: 2,
            }),
        },
        example: (props) => (
            <CenteredCarousel
                items={Array.from({length: 6}, (_, idx) => (
                    <div
                        style={{
                            border: `1px solid ${skinVars.colors.border}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{flexShrink: 0}}>
                            <Circle backgroundColor={skinVars.colors.brand} size={160}>
                                <Text10>{idx}</Text10>
                            </Circle>
                        </div>
                    </div>
                ))}
                initialActiveItem={props.initialActiveItem}
                withBullets={props.withBullets}
                withControls={props.withControls}
            />
        ),
    }
);

figma.connect(
    Slideshow,
    'https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=2249%3A5240',
    {
        props: {
            ...carouselProps,
            initialActiveIndex: figma.enum('Current Slide', {
                First: 0,
                Middle: 1,
                Last: 2,
            }),
        },
        example: (props) => (
            <Slideshow
                items={[
                    <Image src="https://picsum.photos/1200/1200" aspectRatio="16:9" />,
                    <Image src="https://picsum.photos/1200/1200" aspectRatio="16:9" />,
                ]}
                initialPageIndex={props.initialActiveIndex}
                autoplay={props.autoplay}
                withBullets={props.withBullets}
                withControls={props.withControls}
            />
        ),
    }
);

// Mobile
figma.connect(
    Carousel,
    'https://www.figma.com/design/WCkDDzlXE16R6yXaljxddj/M%C3%ADstica-Mobile?node-id=4229%3A8914',
    {
        props: {
            ...carouselProps,

            itemsPerPage: figma.enum('Items per page', {
                '1': 1,
                '2': 2,
            }),
            initialActiveItem: figma.enum('Current slide', {
                '#1': 0,
                '#2': 1,
                '#3': 2,
                '#4': 3,
                '#5': 4,
            }),
        },
        example: (props) => (
            <Carousel
                items={Array.from({length: 6}, (_, idx) => (
                    <MediaCard
                        headline={<Tag type="promo">Headline</Tag>}
                        title={'Card ' + idx}
                        description="Description"
                        imageSrc="https://picsum.photos/1200/1200"
                        buttonPrimary={
                            <ButtonPrimary small onPress={() => {}}>
                                Action
                            </ButtonPrimary>
                        }
                        buttonLink={
                            <ButtonLink small onPress={() => {}}>
                                Link
                            </ButtonLink>
                        }
                    />
                ))}
                itemsPerPage={props.itemsPerPage}
                initialActiveItem={props.initialActiveItem}
                autoplay={props.autoplay}
                withBullets={props.withBullets}
                withControls={props.withControls}
            />
        ),
    }
);
