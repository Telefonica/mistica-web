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
                    media={<Image src="tennis.jpg" aspectRatio="16:9" />}
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
