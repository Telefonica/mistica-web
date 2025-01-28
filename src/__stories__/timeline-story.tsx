import * as React from 'react';
import {ResponsiveLayout, Placeholder, Timeline, TimelineItem, IconShopRegular} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Timeline',
    parameters: {fullScreen: true},
};

type Args = {
    themeVariant: Variant;
    items: number;
    activeItem: number;
    orientation: 'horizontal' | 'vertical';
    asset: 'icon' | 'circled-icon' | 'number' | 'dot';
};

export const TimelineStory: StoryComponent<Args> = ({
    themeVariant,
    orientation,
    asset,
    items,
    activeItem,
}) => {
    return (
        <ResponsiveLayout fullWidth variant={themeVariant}>
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
    themeVariant: 'default',
    items: 3,
    activeItem: 1,
    orientation: 'vertical',
    asset: 'dot',
};
TimelineStory.argTypes = {
    themeVariant: {
        options: ['default', 'inverse', 'alternative'],
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
