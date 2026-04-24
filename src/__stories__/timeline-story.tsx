import * as React from 'react';
import {ResponsiveLayout, Placeholder, Timeline, TimelineItem, Icon} from '..';

import type {Variant} from '../theme-variant-context';
import type {IconPropsWithoutName} from '../icon';

export default {
    title: 'Components/Timeline',
    parameters: {fullScreen: true},
};

type Args = {
    variantOutside: Variant;
    items: number;
    activeItem: number;
    orientation: 'horizontal' | 'vertical';
    asset: 'icon' | 'circled-icon' | 'number' | 'dot';
};

const IconShopRegular = (props: IconPropsWithoutName) => <Icon {...props} name="shop-regular" />;

export const TimelineStory: StoryComponent<Args> = ({
    variantOutside,
    orientation,
    asset,
    items,
    activeItem,
}) => {
    return (
        <ResponsiveLayout fullWidth variant={variantOutside}>
            <Timeline orientation={orientation}>
                {Array.from({length: items}).map((_, index) => (
                    <TimelineItem
                        key={index}
                        state={
                            index < activeItem ? 'completed' : index === activeItem ? 'active' : 'inactive'
                        }
                        asset={
                            asset === 'dot'
                                ? {kind: 'dot'}
                                : asset === 'number'
                                  ? {kind: 'number', number: index + 1}
                                  : asset === 'icon'
                                    ? {kind: 'icon', Icon: IconShopRegular}
                                    : {kind: 'circled-icon', Icon: IconShopRegular}
                        }
                    >
                        <Placeholder />
                    </TimelineItem>
                ))}
            </Timeline>
        </ResponsiveLayout>
    );
};

TimelineStory.storyName = 'Timeline';
TimelineStory.args = {
    variantOutside: 'default',
    items: 3,
    activeItem: 1,
    orientation: 'vertical',
    asset: 'dot',
};
TimelineStory.argTypes = {
    variantOutside: {
        options: ['default', 'brand', 'negative', 'alternative'],
        control: {type: 'select'},
    },
    orientation: {
        options: ['horizontal', 'vertical'],
        control: {type: 'select'},
    },
    asset: {
        options: ['icon', 'circled-icon', 'number', 'dot'],
        control: {type: 'select'},
    },
};
