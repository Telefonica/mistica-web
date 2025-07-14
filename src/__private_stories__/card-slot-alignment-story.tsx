import * as React from 'react';
import {
    ButtonLink,
    Inline,
    MediaCard,
    Placeholder,
    Image,
    Stack,
    DataCard,
    SnapCard,
    NakedCard,
    SmallNakedCard,
} from '..';
import tennisImg from '../__stories__/images/tennis.jpg';

export default {
    title: 'Private/Card Slot alignment',
    parameters: {
        fullScreen: true,
    },
};

const IMAGE_SRC = tennisImg;

export const SlotAlignment: StoryComponent = () => {
    return (
        <Stack space={32} dataAttributes={{testid: 'story'}}>
            <Inline space={16}>
                <MediaCard
                    title="Default"
                    subtitle="Media card"
                    media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                    extra={<Placeholder height={100} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
                <MediaCard
                    title="Content"
                    subtitle="Media card"
                    slotAlignment="content"
                    media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                    extra={<Placeholder height={50} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
                <MediaCard
                    title="Bottom"
                    subtitle="Media card"
                    slotAlignment="bottom"
                    media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                    extra={<Placeholder height={50} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
            </Inline>
            <Inline space={16}>
                <NakedCard
                    title="Default"
                    subtitle="Naked card"
                    media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                    extra={<Placeholder height={100} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
                <NakedCard
                    title="Content"
                    subtitle="Naked card"
                    slotAlignment="content"
                    media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                    extra={<Placeholder height={50} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
                <NakedCard
                    title="Bottom"
                    subtitle="Naked card"
                    slotAlignment="bottom"
                    media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                    extra={<Placeholder height={50} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
            </Inline>
            <Inline space={16}>
                <SmallNakedCard
                    title="Default"
                    subtitle="Small Naked card"
                    media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                    extra={<Placeholder height={100} />}
                />
                <SmallNakedCard
                    title="Content"
                    subtitle="Small Naked card"
                    slotAlignment="content"
                    media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                    extra={<Placeholder height={50} />}
                />
                <SmallNakedCard
                    title="Bottom"
                    subtitle="Small Naked card"
                    slotAlignment="bottom"
                    media={<Image aspectRatio="16:9" src={IMAGE_SRC} />}
                    extra={<Placeholder height={50} />}
                />
            </Inline>
            <Inline space={16}>
                <DataCard
                    title="Default"
                    subtitle="Data card"
                    extra={<Placeholder height={100} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
                <DataCard
                    title="Content"
                    subtitle="Data card"
                    slotAlignment="content"
                    extra={<Placeholder height={50} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
                <DataCard
                    title="Bottom"
                    subtitle="Data card"
                    slotAlignment="bottom"
                    extra={<Placeholder height={50} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
            </Inline>
            <Inline space={16}>
                <SnapCard title="Default" subtitle="Snap card" extra={<Placeholder height={100} />} />
                <SnapCard
                    title="Content"
                    subtitle="Snap card"
                    slotAlignment="content"
                    extra={<Placeholder height={50} />}
                />
                <SnapCard
                    title="Bottom"
                    subtitle="Snap card"
                    slotAlignment="bottom"
                    extra={<Placeholder height={50} />}
                />
            </Inline>
        </Stack>
    );
};

SlotAlignment.storyName = 'Card Slot alignment';
