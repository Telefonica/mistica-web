'use client';
import classNames from 'classnames';
import * as React from 'react';
import Box from './box';
import {useIsomorphicLayoutEffect, useTheme} from './hooks';
import Inline from './inline';
import ScreenReaderOnly from './screen-reader-only';
import {Text2, Text6} from './text';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import * as styles from './timer.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {isEqual} from './utils/helpers';
import {isRunningAcceptanceTest} from './utils/platform';

import type {DataAttributes} from './utils/types';

const DAY_IN_HOURS = 24;
const HOUR_IN_MINUTES = 60;
const MINUTE_IN_SECONDS = 60;
const SECOND_IN_MS = 1000;

const MINUTE_IN_MS = MINUTE_IN_SECONDS * SECOND_IN_MS;
const HOUR_IN_MS = HOUR_IN_MINUTES * MINUTE_IN_MS;
const DAY_IN_MS = DAY_IN_HOURS * HOUR_IN_MS;

export type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';
type Label = 'none' | 'short' | 'long';

interface Timestamp {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

interface BaseProps {
    endTimestamp: Date | number;
    minTimeUnit?: TimeUnit;
    maxTimeUnit?: TimeUnit;
    children?: void;
    dataAttributes?: DataAttributes;
    onProgress?: (value: Timestamp) => void;
    'aria-label'?: string;
}

interface TextTimerProps extends BaseProps {
    labelType?: Label;
}

interface TimerProps extends BaseProps {
    boxed?: boolean;
}

const shouldRenderUnit = (
    unit: TimeUnit,
    labelType?: Label,
    minTimeUnit?: TimeUnit,
    maxTimeUnit?: TimeUnit
) => {
    if (!minTimeUnit && !maxTimeUnit) {
        minTimeUnit = 'seconds';
        maxTimeUnit = 'hours';
    }
    minTimeUnit = minTimeUnit ?? 'seconds';
    maxTimeUnit = maxTimeUnit ?? 'days';

    // If label is "none", days shouldn't be displayed
    minTimeUnit = labelType === 'none' && minTimeUnit === 'days' ? 'hours' : minTimeUnit;
    maxTimeUnit = labelType === 'none' && maxTimeUnit === 'days' ? 'hours' : maxTimeUnit;

    const unitsOrder: Array<TimeUnit> = ['seconds', 'minutes', 'hours', 'days'];

    const minValue = unitsOrder.indexOf(minTimeUnit);
    // If max < min, we display only the min unit
    const maxValue = Math.max(unitsOrder.indexOf(maxTimeUnit), minValue);
    const unitValue = unitsOrder.indexOf(unit);

    return minValue <= unitValue && unitValue <= maxValue;
};

const getFilteredTimerValue = (
    timestamp: Timestamp,
    labelType?: Label,
    minTimeUnit?: TimeUnit,
    maxTimeUnit?: TimeUnit
) => {
    return (
        [
            {unit: 'days', value: timestamp.days},
            {unit: 'hours', value: timestamp.hours},
            {unit: 'minutes', value: timestamp.minutes},
            {unit: 'seconds', value: timestamp.seconds},
        ] as Array<{unit: TimeUnit; value: number}>
    ).filter((item) => shouldRenderUnit(item.unit, labelType, minTimeUnit, maxTimeUnit));
};

const getRemainingTime = (endTimestamp: Date | number) => {
    // Always return 0 ms remaining for screenshot tests to avoid unstable values caused by delays in browser
    if (isRunningAcceptanceTest()) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }
    const remainingTime = Math.max(
        0,
        (typeof endTimestamp === 'object' ? endTimestamp : new Date(endTimestamp)).valueOf() - Date.now()
    );

    return {
        days: Math.floor(remainingTime / DAY_IN_MS),
        hours: Math.floor(remainingTime / HOUR_IN_MS) % 24,
        minutes: Math.floor(remainingTime / MINUTE_IN_MS) % 60,
        seconds: Math.floor(remainingTime / SECOND_IN_MS) % 60,
    };
};

const useTimerState = ({
    endTimestamp,
    labelType,
    minTimeUnit,
    maxTimeUnit,
    onProgress,
}: {
    endTimestamp: Date | number;
    labelType?: Label;
    minTimeUnit?: TimeUnit;
    maxTimeUnit?: TimeUnit;
    onProgress?: (value: Timestamp) => void;
}) => {
    const remainingTime = getRemainingTime(endTimestamp);
    const [currentDays, setCurrentDays] = React.useState(remainingTime.days);
    const [currentHours, setCurrentHours] = React.useState(remainingTime.hours);
    const [currentMinutes, setCurrentMinutes] = React.useState(remainingTime.minutes);
    const [currentSeconds, setCurrentSeconds] = React.useState(remainingTime.seconds);

    useIsomorphicLayoutEffect(() => {
        let intervalId: NodeJS.Timeout;

        const updateCurrentTime = () => {
            const remainingTime = getRemainingTime(endTimestamp);
            setCurrentDays(remainingTime.days);
            setCurrentHours(remainingTime.hours);
            setCurrentMinutes(remainingTime.minutes);
            setCurrentSeconds(remainingTime.seconds);

            // Stop computing values if there is no time remaining
            if (
                !remainingTime.days &&
                !remainingTime.hours &&
                !remainingTime.minutes &&
                !remainingTime.seconds
            ) {
                clearInterval(intervalId);
            }
        };

        if (!isRunningAcceptanceTest()) {
            updateCurrentTime();
            intervalId = setInterval(updateCurrentTime, SECOND_IN_MS);
            return () => clearInterval(intervalId);
        }
    }, [endTimestamp]);

    const shouldRenderDays = shouldRenderUnit('days', labelType, minTimeUnit, maxTimeUnit);
    const shouldRenderHours = shouldRenderUnit('hours', labelType, minTimeUnit, maxTimeUnit);
    const shouldRenderMinutes = shouldRenderUnit('minutes', labelType, minTimeUnit, maxTimeUnit);

    const maximumRenderedUnit = shouldRenderDays
        ? 'days'
        : shouldRenderHours
        ? 'hours'
        : shouldRenderMinutes
        ? 'minutes'
        : 'seconds';

    const days = currentDays;

    // if hours is the maximum unit, add remaining days
    const hours = maximumRenderedUnit === 'hours' ? currentHours + days * DAY_IN_HOURS : currentHours;

    // if minutes is the maximum unit, add remaining days and hours
    const minutes =
        maximumRenderedUnit === 'minutes'
            ? currentMinutes + HOUR_IN_MINUTES * (days * DAY_IN_HOURS + hours)
            : currentMinutes;

    // if minutes is the maximum unit, add remaining days, hours and minutes
    const seconds =
        maximumRenderedUnit === 'seconds'
            ? currentSeconds +
              MINUTE_IN_SECONDS * (days * DAY_IN_HOURS * HOUR_IN_MINUTES + hours * HOUR_IN_MINUTES + minutes)
            : currentSeconds;

    const [timerValue, setTimerValue] = React.useState(
        getFilteredTimerValue({days, hours, minutes, seconds}, labelType, minTimeUnit, maxTimeUnit)
    );

    React.useEffect(() => {
        const currentTimerValue = getFilteredTimerValue(
            {days, hours, minutes, seconds},
            labelType,
            minTimeUnit,
            maxTimeUnit
        );

        if (!isEqual(currentTimerValue, timerValue)) {
            setTimerValue(currentTimerValue);
            const timestampValue: Timestamp = {};
            currentTimerValue.forEach((item) => (timestampValue[item.unit] = item.value));
            onProgress?.(timestampValue);
        }
    }, [days, hours, minutes, seconds, labelType, minTimeUnit, maxTimeUnit, timerValue, onProgress]);

    return timerValue;
};

export const TextTimer: React.FC<TextTimerProps> = ({
    endTimestamp,
    labelType = 'none',
    minTimeUnit,
    maxTimeUnit,
    onProgress,
    dataAttributes,
    'aria-label': ariaLabel,
}) => {
    const {texts} = useTheme();

    const timerValue = useTimerState({endTimestamp, labelType, minTimeUnit, maxTimeUnit, onProgress});

    const unitShortLabel: {[key in TimeUnit]: string} = {
        days: texts.timerDaysShortLabel,
        hours: texts.timerHoursShortLabel,
        minutes: texts.timerMinutesShortLabel,
        seconds: texts.timerSecondsShortLabel,
    };

    const unitLabel: {[key in TimeUnit]: string} = {
        days: texts.timerDayLongLabel,
        hours: texts.timerHourLongLabel,
        minutes: texts.timerMinuteLongLabel,
        seconds: texts.timerSecondLongLabel,
    };

    const unitLabelPlural: {[key in TimeUnit]: string} = {
        days: texts.timerDaysLongLabel,
        hours: texts.timerHoursLongLabel,
        minutes: texts.timerMinutesLongLabel,
        seconds: texts.timerSecondsLongLabel,
    };

    const renderFormattedNumber = (value: number) => {
        const digitCount = Math.max(String(value).length, labelType === 'long' ? 1 : 2);

        // Set container's minWidth in ch to avoid it from updating it's width when numbers change
        return (
            <span className={styles.unitContainer} style={{minWidth: `${digitCount}ch`}}>
                {String(value).padStart(digitCount, '0')}
            </span>
        );
    };

    const renderTime = () => {
        switch (labelType) {
            case 'none':
                return timerValue.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderFormattedNumber(item.value)}
                        {index === timerValue.length - 1 ? '' : ':'}
                    </React.Fragment>
                ));

            case 'short':
                // Using a div to treat each unit and its value as a single element when wrapping is required
                return timerValue.map((item, index) => (
                    <div style={{display: 'inline-flex'}} key={index}>
                        {renderFormattedNumber(item.value)}
                        {` ${unitShortLabel[item.unit]}`}
                        {index === timerValue.length - 1 ? '' : ' '}
                    </div>
                ));

            case 'long':
            default:
                return timerValue.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderFormattedNumber(item.value)}
                        {` ${item.value === 1 ? unitLabel[item.unit] : unitLabelPlural[item.unit]}`}
                        {index === timerValue.length - 1
                            ? ''
                            : index === timerValue.length - 2
                            ? ` ${texts.timerAnd} `
                            : ', '}
                    </React.Fragment>
                ));
        }
    };

    const timerLabel = timerValue
        .map(
            (item, index) =>
                `${item.value} ${item.value === 1 ? unitLabel[item.unit] : unitLabelPlural[item.unit]}${
                    index === timerValue.length - 1
                        ? ''
                        : index === timerValue.length - 2
                        ? ` ${texts.timerAnd} `
                        : ', '
                }`
        )
        .join('');

    return (
        <div
            role="timer"
            className={styles.timerWrapper}
            {...getPrefixedDataAttributes(dataAttributes, 'TextTimer')}
        >
            <ScreenReaderOnly>
                <span>{ariaLabel ? `${ariaLabel}. ${timerLabel}` : timerLabel}</span>
            </ScreenReaderOnly>

            <div aria-hidden className={styles.content}>
                {renderTime()}
            </div>
        </div>
    );
};

export const Timer: React.FC<TimerProps> = ({
    boxed,
    endTimestamp,
    minTimeUnit,
    maxTimeUnit,
    onProgress,
    dataAttributes,
    'aria-label': ariaLabel,
}) => {
    const {texts} = useTheme();
    const themeVariant = useThemeVariant();

    const timerValue = useTimerState({endTimestamp, minTimeUnit, maxTimeUnit, onProgress});

    const displayLabel: {[key in TimeUnit]: string} = {
        days: texts.timerDayLongLabel,
        hours: texts.timerHourLongLabel,
        minutes: texts.timerDisplayMinutesLabel,
        seconds: texts.timerDisplaySecondsLabel,
    };

    const displayLabelPlural: {[key in TimeUnit]: string} = {
        days: texts.timerDaysLongLabel,
        hours: texts.timerHoursLongLabel,
        minutes: texts.timerDisplayMinutesLabel,
        seconds: texts.timerDisplaySecondsLabel,
    };

    const unitLabel: {[key in TimeUnit]: string} = {
        days: texts.timerDayLongLabel,
        hours: texts.timerHourLongLabel,
        minutes: texts.timerMinuteLongLabel,
        seconds: texts.timerSecondLongLabel,
    };

    const unitLabelPlural: {[key in TimeUnit]: string} = {
        days: texts.timerDaysLongLabel,
        hours: texts.timerHoursLongLabel,
        minutes: texts.timerMinutesLongLabel,
        seconds: texts.timerSecondsLongLabel,
    };

    const renderFormattedNumber = (value: number) => {
        const digitCount = Math.max(String(value).length, 2);

        // Set container's minWidth in ch to avoid it from updating it's width when numbers change
        return (
            <Text6>
                <div className={styles.unitContainer} style={{minWidth: `${digitCount}ch`}}>
                    {String(value).padStart(digitCount, '0')}
                </div>
            </Text6>
        );
    };

    const timerLabel = timerValue
        .map(
            (item, index) =>
                `${item.value} ${item.value === 1 ? unitLabel[item.unit] : unitLabelPlural[item.unit]}${
                    index === timerValue.length - 1
                        ? ''
                        : index === timerValue.length - 2
                        ? ` ${texts.timerAnd} `
                        : ', '
                }`
        )
        .join('');

    const renderTime = () => {
        return timerValue.map((item, index) => (
            <Box
                className={classNames({
                    [styles.boxedTimerValueContainer]: themeVariant === 'default' && boxed,
                    [styles.boxedTimerValueContainerInverse]: themeVariant !== 'default' && boxed,
                })}
                key={index}
            >
                <ThemeVariant variant={boxed ? 'default' : themeVariant}>
                    <div className={styles.timerDisplayValue}>
                        {renderFormattedNumber(item.value)}
                        <Text2 regular>
                            {item.value === 1 ? displayLabel[item.unit] : displayLabelPlural[item.unit]}
                        </Text2>
                    </div>
                </ThemeVariant>
            </Box>
        ));
    };

    return (
        <div
            role="timer"
            className={styles.timerWrapper}
            {...getPrefixedDataAttributes(dataAttributes, 'Timer')}
        >
            <ScreenReaderOnly>
                <span>{ariaLabel ? `${ariaLabel}. ${timerLabel}` : timerLabel}</span>
            </ScreenReaderOnly>

            <div aria-hidden>
                <Inline space={8} wrap>
                    {renderTime()}
                </Inline>
            </div>
        </div>
    );
};
