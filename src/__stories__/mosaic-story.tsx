import * as React from 'react';
import {
    Circle,
    HorizontalMosaic,
    IconMobileDeviceRegular,
    ResponsiveLayout,
    SnapCard,
    VerticalMosaic,
    skinVars,
} from '..';

export default {
    title: 'Components/Mosaic',
};

type Props = {
    items: number;
};

const renderItem = (index: number) => (
    <SnapCard
        key={index}
        title={`Card ${index}`}
        icon={
            <Circle size={40} backgroundColor={skinVars.colors.brandLow}>
                <IconMobileDeviceRegular color={skinVars.colors.brand} />
            </Circle>
        }
    />
);

export const VerticalMosaicStory: StoryComponent<Props> = ({items}) => {
    return (
        <ResponsiveLayout>
            <VerticalMosaic
                items={Array.from({length: items}, (_, index) => renderItem(index + 1))}
                dataAttributes={{testid: 'vertical-mosaic'}}
            />
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
            <HorizontalMosaic
                items={Array.from({length: items}, (_, index) => renderItem(index + 1))}
                withBullets={withBullets}
                free={free}
                dataAttributes={{testid: 'horizontal-mosaic'}}
            />
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
