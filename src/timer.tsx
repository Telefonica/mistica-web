'use client';
import * as React from 'react';
import {useIsomorphicLayoutEffect} from './hooks';
import ScreenReaderOnly from './screen-reader-only';
import * as styles from './timer.css';
import {getPrefixedDataAttributes} from './utils/dom';

import type {DataAttributes} from './utils/types';

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = SECOND_IN_MS * 60;
const HOUR_IN_MS = MINUTE_IN_MS * 60;
const DAY_IN_MS = HOUR_IN_MS * 24;

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

type Timestamp = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

interface Props {
    endTime: string;
    labelType?: 'none' | 'short' | 'long';
    children?: void;
    dataAttributes?: DataAttributes;
}

const useRemainingTime = (endTime: string) => {
    const [currentDays, setCurrentDays] = React.useState(0);
    const [currentHours, setCurrentHours] = React.useState(0);
    const [currentMinutes, setCurrentMinutes] = React.useState(0);
    const [currentSeconds, setCurrentSeconds] = React.useState(0);

    useIsomorphicLayoutEffect(() => {
        const updateCurrentTime = () => {
            const remainingTime = Math.max(0, Date.parse(endTime) - Date.now());

            setCurrentDays(Math.floor(remainingTime / DAY_IN_MS));
            setCurrentHours(Math.floor(remainingTime / HOUR_IN_MS) % 24);
            setCurrentMinutes(Math.floor(remainingTime / MINUTE_IN_MS) % 60);
            setCurrentSeconds(Math.floor(remainingTime / SECOND_IN_MS) % 60);
        };

        updateCurrentTime();
        const intervalId = setInterval(updateCurrentTime, SECOND_IN_MS);

        return () => clearInterval(intervalId);
    }, [endTime]);

    return {days: currentDays, hours: currentHours, minutes: currentMinutes, seconds: currentSeconds};
};

const getTimestampLabel = ({days, hours, minutes, seconds}: Timestamp) => {
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

const Timer: React.FC<Props> = ({endTime, labelType = 'none', dataAttributes}) => {
    const {days, hours, minutes, seconds} = useRemainingTime(endTime);

    const renderFormattedValue = (value: number, timeUnit: TimeUnit) => {
        const digitCount =
            value < 10 &&
            (labelType === 'long' || (labelType === 'short' && (timeUnit === 'days' || timeUnit === 'hours')))
                ? 1
                : 2;

        return (
            <span className={styles.unitContainer} style={{minWidth: `${digitCount}ch`}}>
                {String(value).padStart(digitCount, '0')}
            </span>
        );
    };

    const visibleUnits: Array<{unit: TimeUnit; value: number}> = [
        {unit: 'days', value: days},
        {unit: 'hours', value: hours},
        {unit: 'minutes', value: minutes},
        {unit: 'seconds', value: seconds},
    ];

    const unitShortLabel: {[key in TimeUnit]: string} = {
        days: 'd',
        hours: 'h',
        minutes: 'm',
        seconds: 's',
    };

    const unitLongLabel: {[key in TimeUnit]: string} = {
        days: 'day',
        hours: 'hour',
        minutes: 'minute',
        seconds: 'second',
    };

    const renderTime = () => {
        switch (labelType) {
            case 'none':
                return visibleUnits.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderFormattedValue(item.value, item.unit)}
                        {index === visibleUnits.length - 1 ? '' : ':'}
                    </React.Fragment>
                ));

            case 'short':
                return visibleUnits.map((item, index) => (
                    <div style={{display: 'inline-flex'}} key={index}>
                        {renderFormattedValue(item.value, item.unit)}
                        {` ${unitShortLabel[item.unit]}`}
                        {index === visibleUnits.length - 1 ? '' : ' '}
                    </div>
                ));

            case 'long':
            default:
                return visibleUnits.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderFormattedValue(item.value, item.unit)}
                        {` ${unitLongLabel[item.unit]}${item.value === 1 ? '' : 's'}`}
                        {index === visibleUnits.length - 1
                            ? ''
                            : index === visibleUnits.length - 2
                            ? ' and '
                            : ', '}
                    </React.Fragment>
                ));
        }
    };

    return (
        <div className={styles.timerWrapper} {...getPrefixedDataAttributes(dataAttributes, 'Timer')}>
            <ScreenReaderOnly>
                <span>{getTimestampLabel({days, hours, minutes, seconds})}</span>
            </ScreenReaderOnly>

            <div aria-hidden className={styles.content}>
                {renderTime()}
            </div>
        </div>
    );
};

export default Timer;
