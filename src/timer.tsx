'use client';
import * as React from 'react';
import {useIsomorphicLayoutEffect} from './hooks';
import ScreenReaderOnly from './screen-reader-only';

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

const Timer: React.FC<Props> = ({endTime, labelType = 'none'}) => {
    const {days, hours, minutes, seconds} = useRemainingTime(endTime);

    const renderFormattedValue = (value: number, timeUnit: TimeUnit) => {
        const digitCount =
            value < 10 &&
            (labelType === 'long' || (labelType === 'short' && (timeUnit === 'days' || timeUnit === 'hours')))
                ? 1
                : 2;

        return (
            <span style={{minWidth: `${digitCount}ch`, display: 'flex', justifyContent: 'center'}}>
                {String(value).padStart(digitCount, '0')}
            </span>
        );
    };
    const renderTime = () => {
        switch (labelType) {
            case 'none':
                return (
                    <>
                        {renderFormattedValue(days, 'days')}:{renderFormattedValue(hours, 'hours')}:
                        {renderFormattedValue(minutes, 'minutes')}:{renderFormattedValue(seconds, 'seconds')}
                    </>
                );
            case 'short':
                return (
                    <>
                        <div style={{display: 'inline-flex'}}>
                            {renderFormattedValue(days, 'days')}
                            {' d '}
                        </div>

                        <div style={{display: 'inline-flex'}}>
                            {renderFormattedValue(hours, 'hours')}
                            {' h '}
                        </div>

                        <div style={{display: 'inline-flex'}}>
                            {renderFormattedValue(minutes, 'minutes')}
                            {' min '}
                        </div>

                        <div style={{display: 'inline-flex'}}>
                            {renderFormattedValue(seconds, 'seconds')}
                            {' s'}
                        </div>
                    </>
                );
            case 'long':
            default:
                return (
                    <>
                        {renderFormattedValue(days, 'days')}
                        {` day${days === 1 ? '' : 's'}, `}

                        {renderFormattedValue(hours, 'hours')}
                        {` hour${hours === 1 ? '' : 's'}, `}

                        {renderFormattedValue(minutes, 'minutes')}
                        {` minute${minutes === 1 ? '' : 's'} and `}

                        {renderFormattedValue(seconds, 'seconds')}
                        {` second${seconds === 1 ? '' : 's'}`}
                    </>
                );
        }
    };

    return (
        <div style={{display: 'inline-block'}}>
            <ScreenReaderOnly>
                <span>{getTimestampLabel({days, hours, minutes, seconds})}</span>
            </ScreenReaderOnly>

            <div aria-hidden style={{display: 'inline-flex', flexWrap: 'wrap', whiteSpace: 'break-spaces'}}>
                {renderTime()}
            </div>
        </div>
    );
};

export default Timer;
