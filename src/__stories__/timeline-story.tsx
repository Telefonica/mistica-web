import * as React from 'react';
import {ResponsiveLayout, Placeholder, Timeline, TimelineItem, Circle, skinVars, IconShopRegular} from '..';

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
    asset: 'icon' | 'number' | 'dot';
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
                            asset === 'dot' ? (
                                {kind: 'dot'}
                            ) : asset === 'number' ? (
                                {kind: 'number', number: index + 1}
                            ) : (
                                <Circle size={40} border>
                                    <IconShopRegular color={skinVars.colors.brand} />
                                </Circle>
                            )
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
        options: ['icon', 'number', 'dot'],
        control: {type: 'select'},
    },
};
