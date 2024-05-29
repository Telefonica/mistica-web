import * as React from 'react';
import {ResponsiveLayout, Box, Text3, Timer, TextTimer} from '..';

import type {TimeUnit} from '../timer';
import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Timer',
    parameters: {fullScreen: true},
};

interface BaseArgs {
    themeVariant: Variant;
    minTimeUnit: TimeUnit | 'undefined';
    maxTimeUnit: TimeUnit | 'undefined';
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const baseArgs: BaseArgs = {
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

type TextTimerArgs = BaseArgs & {labelType: 'none' | 'short' | 'long'};

export const TextTimerStory: StoryComponent<TextTimerArgs> = ({
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
                    <TextTimer
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

TextTimerStory.storyName = 'TextTimer';
TextTimerStory.args = {
    labelType: 'none',
    ...baseArgs,
};
TextTimerStory.argTypes = {
    ...baseArgTypes,
    labelType: {
        options: ['none', 'short', 'long'],
        control: {type: 'select'},
    },
};

type TimerArgs = BaseArgs & {boxed: boolean};

export const TimerStory: StoryComponent<TimerArgs> = ({
    themeVariant,
    minTimeUnit,
    maxTimeUnit,
    days,
    hours,
    minutes,
    seconds,
    boxed,
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
                <Timer
                    dataAttributes={{testid: 'timer'}}
                    endTimestamp={endTimestamp}
                    minTimeUnit={minTimeUnit === 'undefined' ? undefined : minTimeUnit}
                    maxTimeUnit={maxTimeUnit === 'undefined' ? undefined : maxTimeUnit}
                    boxed={boxed}
                />
            </Box>
        </ResponsiveLayout>
    );
};

TimerStory.storyName = 'Timer';
TimerStory.args = {
    ...baseArgs,
    boxed: false,
};
TimerStory.argTypes = {
    ...baseArgTypes,
};
