import * as React from 'react';
import {ResponsiveLayout, Box, Text3, Timer, TimerDisplay, BoxedTimerDisplay} from '..';

import type {TimeUnit} from '../timer';
import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Timer',
    parameters: {fullScreen: true},
};

interface TimerDisplayArgs {
    themeVariant: Variant;
    minTimeUnit: TimeUnit | 'undefined';
    maxTimeUnit: TimeUnit | 'undefined';
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

type TimerArgs = TimerDisplayArgs & {labelType: 'none' | 'short' | 'long'};

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const baseArgs: TimerDisplayArgs = {
    themeVariant: 'default',
    minTimeUnit: 'undefined',
    maxTimeUnit: 'undefined',
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
};

const baseArgTypes = {
    themeVariant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
    },
    minTimeUnit: {
        options: ['undefined', 'seconds', 'minutes', 'hours', 'days'],
        control: {type: 'select'},
    },
    maxTimeUnit: {
        options: ['undefined', 'seconds', 'minutes', 'hours', 'days'],
        control: {type: 'select'},
    },
};

export const TimerStory: StoryComponent<TimerArgs> = ({
    labelType,
    themeVariant,
    minTimeUnit,
    maxTimeUnit,
    days,
    hours,
    minutes,
    seconds,
}) => {
    const [endTimestamp, setEndTimestamp] = React.useState(
        Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds
    );

    React.useEffect(() => {
        setEndTimestamp(Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds);
    }, [days, hours, minutes, seconds]);

    return (
        <ResponsiveLayout fullWidth variant={themeVariant}>
            <Box padding={16}>
                <Text3 regular>
                    <Timer
                        dataAttributes={{testid: 'timer'}}
                        endTimestamp={endTimestamp}
                        labelType={labelType}
                        minTimeUnit={minTimeUnit === 'undefined' ? undefined : minTimeUnit}
                        maxTimeUnit={maxTimeUnit === 'undefined' ? undefined : maxTimeUnit}
                    />
                </Text3>
            </Box>
        </ResponsiveLayout>
    );
};

TimerStory.storyName = 'Timer';
TimerStory.args = {
    labelType: 'none',
    ...baseArgs,
};
TimerStory.argTypes = {
    ...baseArgTypes,
    labelType: {
        options: ['none', 'short', 'long'],
        control: {type: 'select'},
    },
};

export const TimerDisplayStory: StoryComponent<TimerDisplayArgs> = ({
    themeVariant,
    minTimeUnit,
    maxTimeUnit,
    days,
    hours,
    minutes,
    seconds,
}) => {
    const [endTimestamp, setEndTimestamp] = React.useState(
        Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds
    );

    React.useEffect(() => {
        setEndTimestamp(Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds);
    }, [days, hours, minutes, seconds]);

    return (
        <ResponsiveLayout fullWidth variant={themeVariant}>
            <Box padding={16}>
                <TimerDisplay
                    dataAttributes={{testid: 'timer'}}
                    endTimestamp={endTimestamp}
                    minTimeUnit={minTimeUnit === 'undefined' ? undefined : minTimeUnit}
                    maxTimeUnit={maxTimeUnit === 'undefined' ? undefined : maxTimeUnit}
                />
            </Box>
        </ResponsiveLayout>
    );
};

TimerDisplayStory.storyName = 'TimerDisplay';
TimerDisplayStory.args = {
    ...baseArgs,
};
TimerDisplayStory.argTypes = {
    ...baseArgTypes,
};

export const BoxedTimerDisplayStory: StoryComponent<TimerDisplayArgs> = ({
    themeVariant,
    minTimeUnit,
    maxTimeUnit,
    days,
    hours,
    minutes,
    seconds,
}) => {
    const [endTimestamp, setEndTimestamp] = React.useState(
        Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds
    );

    React.useEffect(() => {
        setEndTimestamp(Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds);
    }, [days, hours, minutes, seconds]);

    return (
        <ResponsiveLayout fullWidth variant={themeVariant}>
            <Box padding={16}>
                <BoxedTimerDisplay
                    dataAttributes={{testid: 'timer'}}
                    endTimestamp={endTimestamp}
                    minTimeUnit={minTimeUnit === 'undefined' ? undefined : minTimeUnit}
                    maxTimeUnit={maxTimeUnit === 'undefined' ? undefined : maxTimeUnit}
                />
            </Box>
        </ResponsiveLayout>
    );
};

BoxedTimerDisplayStory.storyName = 'BoxedTimerDisplay';
BoxedTimerDisplayStory.args = {
    ...baseArgs,
};
BoxedTimerDisplayStory.argTypes = {
    ...baseArgTypes,
};
