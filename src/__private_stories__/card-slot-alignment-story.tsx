import * as React from 'react';
import {ButtonLink, Inline, MediaCard, Placeholder, Stack, DataCard, NakedCard} from '..';
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
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={<Placeholder height={100} />}
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
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={<Placeholder height={50} />}
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
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={<Placeholder height={50} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
                <MediaCard
                    title="Space Between"
                    subtitle="Media card"
                    slotAlignment="space-between"
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={[<Placeholder height={30} />, <Placeholder height={30} />]}
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
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={<Placeholder height={100} />}
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
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={<Placeholder height={50} />}
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
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={<Placeholder height={50} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
                <NakedCard
                    title="Space Between"
                    subtitle="Naked card"
                    slotAlignment="space-between"
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={[<Placeholder height={30} />, <Placeholder height={30} />]}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
            </Inline>
            <Inline space={16}>
                <NakedCard
                    size="snap"
                    title="Default"
                    subtitle="Small Naked card"
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={<Placeholder height={100} />}
                />
                <NakedCard
                    size="snap"
                    title="Content"
                    subtitle="Small Naked card"
                    slotAlignment="content"
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={<Placeholder height={50} />}
                />
                <NakedCard
                    size="snap"
                    title="Bottom"
                    subtitle="Small Naked card"
                    slotAlignment="bottom"
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={<Placeholder height={50} />}
                />
                <NakedCard
                    size="snap"
                    title="Space Between"
                    subtitle="Small Naked card"
                    slotAlignment="space-between"
                    imageSrc={IMAGE_SRC}
                    aspectRatio="16:9"
                    slot={[<Placeholder height={30} />, <Placeholder height={30} />]}
                />
            </Inline>
            <Inline space={16}>
                <DataCard
                    title="Default"
                    subtitle="Data card"
                    slot={<Placeholder height={100} />}
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
                    slot={<Placeholder height={50} />}
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
                    slot={<Placeholder height={50} />}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
                <DataCard
                    title="Space Between"
                    subtitle="Data card"
                    slotAlignment="space-between"
                    slot={[<Placeholder height={30} />, <Placeholder height={30} />]}
                    buttonLink={
                        <ButtonLink small href="https://google.com">
                            Link
                        </ButtonLink>
                    }
                />
            </Inline>
            <Inline space={16}>
                <DataCard
                    size="snap"
                    title="Default"
                    subtitle="Snap card"
                    slot={<Placeholder height={100} />}
                />
                <DataCard
                    size="snap"
                    title="Content"
                    subtitle="Snap card"
                    slotAlignment="content"
                    slot={<Placeholder height={50} />}
                />
                <DataCard
                    size="snap"
                    title="Bottom"
                    subtitle="Snap card"
                    slotAlignment="bottom"
                    slot={<Placeholder height={50} />}
                />
                <DataCard
                    size="snap"
                    title="Space Between"
                    subtitle="Snap card"
                    slotAlignment="space-between"
                    slot={[<Placeholder height={30} />, <Placeholder height={30} />]}
                />
            </Inline>
        </Stack>
    );
};

SlotAlignment.storyName = 'Card Slot alignment';
