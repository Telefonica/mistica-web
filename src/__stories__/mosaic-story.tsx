import * as React from 'react';
import {
    HorizontalMosaic,
    ResponsiveLayout,
    VerticalMosaic,
    PosterCard,
    Box,
    Stack,
    Callout,
    IconInformationRegular,
} from '..';
import usingVrImg from './images/using-vr.jpg';

export default {
    title: 'Components/Mosaic',
    parameters: {fullScreen: true},
};

type Props = {
    items: number;
};

const renderItem = (index: number) => (
    <PosterCard backgroundImage={usingVrImg} width="100%" height="100%" key={index} title={`Card ${index}`} />
);

export const VerticalMosaicStory: StoryComponent<Props> = ({items}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <VerticalMosaic
                    items={Array.from({length: items}, (_, index) => renderItem(index + 1))}
                    dataAttributes={{testid: 'vertical-mosaic'}}
                />
            </Box>
        </ResponsiveLayout>
    );
};

VerticalMosaicStory.storyName = 'VerticalMosaic';
VerticalMosaicStory.args = {items: 3};
VerticalMosaicStory.argTypes = {
    items: {
        control: {type: 'range', min: 1, max: 20, step: 1},
    },
};

type HorizontalMosaicProps = Props & {withBullets: boolean; free: boolean};

export const HorizontalMosaicStory: StoryComponent<HorizontalMosaicProps> = ({items, withBullets, free}) => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <Stack space={16}>
                    <Callout
                        description="Arrow controls disappear in touch devices"
                        icon={<IconInformationRegular />}
                    />
                    <HorizontalMosaic
                        items={Array.from({length: items}, (_, index) => renderItem(index + 1))}
                        withBullets={withBullets}
                        free={free}
                        dataAttributes={{testid: 'horizontal-mosaic'}}
                    />
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

HorizontalMosaicStory.storyName = 'HorizontalMosaic';
HorizontalMosaicStory.args = {items: 3, withBullets: false, free: false};
HorizontalMosaicStory.argTypes = {
    items: {
        control: {type: 'range', min: 1, max: 20, step: 1},
    },
};
