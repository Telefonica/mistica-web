import * as React from 'react';
import {ButtonPrimary, Carousel, MediaCard, Image, Tag, ButtonLink, ResponsiveLayout} from '../../..';

const CarouselTest = (): JSX.Element => (
    <ResponsiveLayout>
        <Carousel
            withBullets
            items={Array.from({length: 3}, (_, idx) => (
                <MediaCard
                    headline={<Tag type="promo">Headline</Tag>}
                    title={'Card ' + idx}
                    description="Description"
                    media={
                        <Image
                            src="https://images.unsplash.com/photo-1575903013621-1387ce8caa74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                            aspectRatio="16:9"
                        />
                    }
                    button={
                        <ButtonPrimary small onPress={() => {}}>
                            Action
                        </ButtonPrimary>
                    }
                    buttonLink={<ButtonLink onPress={() => {}}>Link</ButtonLink>}
                />
            ))}
        />
    </ResponsiveLayout>
);

export default CarouselTest;
