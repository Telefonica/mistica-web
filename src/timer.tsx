'use client';
import classNames from 'classnames';
import * as React from 'react';
import {useIsomorphicLayoutEffect, useTheme} from './hooks';
import Inline from './inline';
import ScreenReaderOnly from './screen-reader-only';
import {Text2, Text6} from './text';
import {ThemeVariant, useThemeVariant} from './theme-variant-context';
import * as styles from './timer.css';
import {getPrefixedDataAttributes} from './utils/dom';
import {isEqual} from './utils/helpers';
import {isRunningAcceptanceTest} from './utils/platform';
import * as tokens from './text-tokens';

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

export interface RemainingTime {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

interface BaseProps {
    endTimestamp: Date | number;
    minTimeUnit: TimeUnit;
    maxTimeUnit: TimeUnit;
    dataAttributes?: DataAttributes;
    onProgress?: (value: RemainingTime) => void;
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
    minTimeUnit: TimeUnit,
    maxTimeUnit: TimeUnit,
    labelType?: Label
) => {
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
    timestamp: RemainingTime,
    minTimeUnit: TimeUnit,
    maxTimeUnit: TimeUnit,
    labelType?: Label
) => {
    return (
        [
            {unit: 'days', value: timestamp.days},
            {unit: 'hours', value: timestamp.hours},
            {unit: 'minutes', value: timestamp.minutes},
            {unit: 'seconds', value: timestamp.seconds},
        ] as Array<{unit: TimeUnit; value: number}>
    ).filter((item) => shouldRenderUnit(item.unit, minTimeUnit, maxTimeUnit, labelType));
};

const getRemainingTime = (endTimestamp: Date | number) => {
    // Always return 0 ms remaining for screenshot tests to avoid unstable values caused by delays in browser
    if (isRunningAcceptanceTest()) {
        return 0;
    }

    return Math.max(
        0,
        (typeof endTimestamp === 'object' ? endTimestamp : new Date(endTimestamp)).valueOf() - Date.now()
    );
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
    minTimeUnit: TimeUnit;
    maxTimeUnit: TimeUnit;
    onProgress?: (value: RemainingTime) => void;
}) => {
    const [remainingTime, setRemainingTime] = React.useState(getRemainingTime(endTimestamp));

    useIsomorphicLayoutEffect(() => {
        let intervalId: NodeJS.Timeout;

        const updateCurrentTime = () => {
            const currentRemainingTime = getRemainingTime(endTimestamp);
            setRemainingTime(currentRemainingTime);

            // Stop computing values if there is no time remaining
            if (!currentRemainingTime) {
                clearInterval(intervalId);
            }
        };

        if (!isRunningAcceptanceTest()) {
            updateCurrentTime();
            intervalId = setInterval(updateCurrentTime, SECOND_IN_MS);
            return () => clearInterval(intervalId);
        }
    }, [endTimestamp]);

    const shouldRenderDays = shouldRenderUnit('days', minTimeUnit, maxTimeUnit, labelType);
    const shouldRenderHours = shouldRenderUnit('hours', minTimeUnit, maxTimeUnit, labelType);
    const shouldRenderMinutes = shouldRenderUnit('minutes', minTimeUnit, maxTimeUnit, labelType);

    const maximumRenderedUnit = shouldRenderDays
        ? 'days'
        : shouldRenderHours
          ? 'hours'
          : shouldRenderMinutes
            ? 'minutes'
            : 'seconds';

    const currentHours = Math.floor(remainingTime / HOUR_IN_MS) % 24;
    const currentMinutes = Math.floor(remainingTime / MINUTE_IN_MS) % 60;
    const currentSeconds = Math.floor(remainingTime / SECOND_IN_MS) % 60;

    const days = Math.floor(remainingTime / DAY_IN_MS);

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
        getFilteredTimerValue({days, hours, minutes, seconds}, minTimeUnit, maxTimeUnit, labelType)
    );

    React.useEffect(() => {
        const currentTimerValue = getFilteredTimerValue(
            {days, hours, minutes, seconds},
            minTimeUnit,
            maxTimeUnit,
            labelType
        );

        if (!isEqual(currentTimerValue, timerValue)) {
            setTimerValue(currentTimerValue);
            const timestampValue: RemainingTime = {};
            currentTimerValue.forEach((item) => (timestampValue[item.unit] = item.value));
            onProgress?.(timestampValue);
        }
    }, [days, hours, minutes, seconds, labelType, minTimeUnit, maxTimeUnit, timerValue, onProgress]);

    return timerValue;
};

export const TextTimer = ({
    endTimestamp,
    labelType = 'none',
    minTimeUnit,
    maxTimeUnit,
    onProgress,
    dataAttributes,
    'aria-label': ariaLabel,
}: TextTimerProps): JSX.Element => {
    const {texts, t} = useTheme();
    const labelId = React.useId();

    const timerValue = useTimerState({endTimestamp, labelType, minTimeUnit, maxTimeUnit, onProgress});

    const unitShortLabel: {[key in TimeUnit]: string} = {
        days: texts.timerDaysShortLabel || t(tokens.timerDaysShortLabel),
        hours: texts.timerHoursShortLabel || t(tokens.timerHoursShortLabel),
        minutes: texts.timerMinutesShortLabel || t(tokens.timerMinutesShortLabel),
        seconds: texts.timerSecondsShortLabel || t(tokens.timerSecondsShortLabel),
    };

    const unitLabel: {[key in TimeUnit]: string} = {
        days: texts.timerDayLongLabel || t(tokens.timerDayLongLabel),
        hours: texts.timerHourLongLabel || t(tokens.timerHourLongLabel),
        minutes: texts.timerMinuteLongLabel || t(tokens.timerMinuteLongLabel),
        seconds: texts.timerSecondLongLabel || t(tokens.timerSecondLongLabel),
    };

    const unitLabelPlural: {[key in TimeUnit]: string} = {
        days: texts.timerDaysLongLabel || t(tokens.timerDaysLongLabel),
        hours: texts.timerHoursLongLabel || t(tokens.timerHoursLongLabel),
        minutes: texts.timerMinutesLongLabel || t(tokens.timerMinutesLongLabel),
        seconds: texts.timerSecondsLongLabel || t(tokens.timerSecondsLongLabel),
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
                        {index > 0 && ':'}
                        {renderFormattedNumber(item.value)}
                    </React.Fragment>
                ));

            case 'short':
                return timerValue.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && ' '}
                        <span className={styles.shortLabelText}>
                            {renderFormattedNumber(item.value)}
                            {` ${unitShortLabel[item.unit]}`}
                        </span>
                    </React.Fragment>
                ));

            case 'long':
            default:
                return timerValue.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && ' '}
                        {renderFormattedNumber(item.value)}
                        {` ${item.value === 1 ? unitLabel[item.unit] : unitLabelPlural[item.unit]}`}
                        {index === timerValue.length - 2 && ` ${texts.timerAnd || t(tokens.timerAnd)}`}
                        {index < timerValue.length - 2 && ','}
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
                          ? ` ${texts.timerAnd || t(tokens.timerAnd)} `
                          : ', '
                }`
        )
        .join('');

    return (
        <span
            role="timer"
            aria-labelledby={labelId}
            className={styles.inlineText}
            style={{
                // try to keep the timer in the same line without wrapping only when label is not long
                display: labelType !== 'long' ? 'inline-block' : undefined,
            }}
            {...getPrefixedDataAttributes(dataAttributes, 'TextTimer')}
        >
            <ScreenReaderOnly>
                <span id={labelId}>{ariaLabel ? `${ariaLabel}. ${timerLabel}` : timerLabel}</span>
            </ScreenReaderOnly>

            <span aria-hidden className={styles.inlineText}>
                {renderTime()}
            </span>
        </span>
    );
};

export const Timer = ({
    boxed,
    endTimestamp,
    minTimeUnit,
    maxTimeUnit,
    onProgress,
    dataAttributes,
    'aria-label': ariaLabel,
}: TimerProps): JSX.Element => {
    const {texts, t} = useTheme();
    const labelId = React.useId();
    const themeVariant = useThemeVariant();

    const timerValue = useTimerState({endTimestamp, minTimeUnit, maxTimeUnit, onProgress});

    const displayLabel: {[key in TimeUnit]: string} = {
        days: texts.timerDayLongLabel || t(tokens.timerDayLongLabel),
        hours: texts.timerHourLongLabel || t(tokens.timerHourLongLabel),
        minutes: texts.timerDisplayMinutesLabel || t(tokens.timerDisplayMinutesLabel),
        seconds: texts.timerDisplaySecondsLabel || t(tokens.timerDisplaySecondsLabel),
    };

    const displayLabelPlural: {[key in TimeUnit]: string} = {
        days: texts.timerDaysLongLabel || t(tokens.timerDaysLongLabel),
        hours: texts.timerHoursLongLabel || t(tokens.timerHoursLongLabel),
        minutes: texts.timerDisplayMinutesLabel || t(tokens.timerDisplayMinutesLabel),
        seconds: texts.timerDisplaySecondsLabel || t(tokens.timerDisplaySecondsLabel),
    };

    const unitLabel: {[key in TimeUnit]: string} = {
        days: texts.timerDayLongLabel || t(tokens.timerDayLongLabel),
        hours: texts.timerHourLongLabel || t(tokens.timerHourLongLabel),
        minutes: texts.timerMinuteLongLabel || t(tokens.timerMinuteLongLabel),
        seconds: texts.timerSecondLongLabel || t(tokens.timerSecondLongLabel),
    };

    const unitLabelPlural: {[key in TimeUnit]: string} = {
        days: texts.timerDaysLongLabel || t(tokens.timerDaysLongLabel),
        hours: texts.timerHoursLongLabel || t(tokens.timerHoursLongLabel),
        minutes: texts.timerMinutesLongLabel || t(tokens.timerMinutesLongLabel),
        seconds: texts.timerSecondsLongLabel || t(tokens.timerSecondsLongLabel),
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
                          ? ` ${texts.timerAnd || t(tokens.timerAnd)} `
                          : ', '
                }`
        )
        .join('');

    const renderTime = () => {
        return timerValue.map((item, index) => (
            <div
                className={classNames({
                    [styles.boxedTimerValueContainer[themeVariant]]: boxed,
                })}
                key={index}
            >
                <ThemeVariant variant={boxed ? 'default' : themeVariant}>
                    <div
                        className={classNames(styles.timerDisplayValue, {
                            [styles.boxedTimerDisplayValue]: boxed,
                        })}
                    >
                        {renderFormattedNumber(item.value)}
                        <Text2 regular>
                            {item.value === 1 ? displayLabel[item.unit] : displayLabelPlural[item.unit]}
                        </Text2>
                    </div>
                </ThemeVariant>
            </div>
        ));
    };

    return (
        <div
            role="timer"
            aria-labelledby={labelId}
            className={styles.timerWrapper}
            {...getPrefixedDataAttributes(dataAttributes, 'Timer')}
        >
            <ScreenReaderOnly>
                <span id={labelId}>{ariaLabel ? `${ariaLabel}. ${timerLabel}` : timerLabel}</span>
            </ScreenReaderOnly>

            <div aria-hidden>
                <Inline space={boxed ? 8 : 16} wrap>
                    {renderTime()}
                </Inline>
            </div>
        </div>
    );
};
