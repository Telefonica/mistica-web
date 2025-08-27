import * as React from 'react';
import {ResponsiveLayout, Box, Text3, Timer, TextTimer, Stack, Title1, Text2} from '..';
import {isEqual} from '../utils/helpers';
import mediaBackgroundImg from './images/beach.jpg';

import type {RemainingTime, TimeUnit} from '../timer';
import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Timer',
    parameters: {fullScreen: true},
};

interface BaseArgs {
    themeVariant: Variant;
    minTimeUnit: TimeUnit;
    maxTimeUnit: TimeUnit;
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
    minTimeUnit: 'seconds',
    maxTimeUnit: 'hours',
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
};

const baseArgTypes = {
    themeVariant: {
        options: ['default', 'inverse', 'alternative', 'media'],
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
    const [remainingTime, setRemainingTime] = React.useState<RemainingTime>();
    const [endTimestamp, setEndTimestamp] = React.useState(
        Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds
    );

    React.useEffect(() => {
        setEndTimestamp(Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds);
    }, [days, hours, minutes, seconds]);

    return (
        <ResponsiveLayout fullWidth variant={themeVariant}>
            <Box padding={16}>
                <Stack space={16}>
                    <Text3 regular>
                        <TextTimer
                            dataAttributes={{testid: 'timer'}}
                            endTimestamp={endTimestamp}
                            labelType={labelType}
                            minTimeUnit={minTimeUnit}
                            maxTimeUnit={maxTimeUnit}
                            onProgress={(currentValue) => {
                                if (!isEqual(currentValue, remainingTime)) {
                                    setRemainingTime(currentValue);
                                }
                            }}
                        />
                    </Text3>
                    <Stack space={8}>
                        <Title1 as="h2">onProgress callback value</Title1>
                        {remainingTime && (
                            <Text2 regular as="pre">
                                {JSON.stringify(remainingTime, null, 2)}
                            </Text2>
                        )}
                        <div style={{width: '1ch', height: '1ch', border: '1px solid red'}} />
                    </Stack>
                </Stack>
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
    const [remainingTime, setRemainingTime] = React.useState<RemainingTime>();
    const [endTimestamp, setEndTimestamp] = React.useState(
        Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds
    );

    React.useEffect(() => {
        setEndTimestamp(Date.now() + DAY * days + HOUR * hours + MINUTE * minutes + SECOND * seconds);
    }, [days, hours, minutes, seconds]);

    return (
        <ResponsiveLayout fullWidth variant={themeVariant}>
            <div
                style={{
                    background:
                        themeVariant === 'media' ? `url(${mediaBackgroundImg}) center/cover` : 'transparent',
                }}
            >
                <Box padding={16}>
                    <Stack space={16}>
                        <Timer
                            dataAttributes={{testid: 'timer'}}
                            endTimestamp={endTimestamp}
                            minTimeUnit={minTimeUnit}
                            maxTimeUnit={maxTimeUnit}
                            boxed={boxed}
                            onProgress={(currentValue) => {
                                if (!isEqual(currentValue, remainingTime)) {
                                    setRemainingTime(currentValue);
                                }
                            }}
                        />

                        <Stack space={8}>
                            <Title1 as="h2">onProgress callback value</Title1>
                            {remainingTime && (
                                <Text2 regular as="pre">
                                    {JSON.stringify(remainingTime, null, 2)}
                                </Text2>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </div>
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
