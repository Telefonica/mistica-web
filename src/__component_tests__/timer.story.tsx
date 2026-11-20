import * as React from 'react';
import {TextTimer, ThemeContextProvider, Timer} from '..';
import {makeTheme} from '../test-utils/theme';

const SECOND = 1000;
const DAY = SECOND * 60 * 60 * 24;
export const Scenario1 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Timer minTimeUnit="seconds" maxTimeUnit="hours" endTimestamp={Date.now() + 60 * SECOND} />
        </ThemeContextProvider>
    );
};
export const Scenario2 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Timer minTimeUnit="seconds" maxTimeUnit="hours" endTimestamp={Date.now() - SECOND} />
        </ThemeContextProvider>
    );
};
export const Scenario3 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Timer endTimestamp={Date.now() + 61 * SECOND} minTimeUnit="minutes" maxTimeUnit="days" />
        </ThemeContextProvider>
    );
};
export const Scenario4 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Timer endTimestamp={Date.now() + DAY} minTimeUnit="hours" maxTimeUnit="minutes" />
        </ThemeContextProvider>
    );
};
export const Scenario5 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Timer minTimeUnit="seconds" maxTimeUnit="days" endTimestamp={Date.now() + DAY} />
        </ThemeContextProvider>
    );
};
export const Scenario6 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Timer minTimeUnit="seconds" maxTimeUnit="seconds" endTimestamp={Date.now() + DAY} />
        </ThemeContextProvider>
    );
};
export const Scenario7 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Timer
                minTimeUnit="seconds"
                maxTimeUnit="hours"
                endTimestamp={Date.now() + SECOND}
                aria-label="A label"
            />
        </ThemeContextProvider>
    );
};
export const Scenario8 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <TextTimer minTimeUnit="seconds" maxTimeUnit="days" endTimestamp={Date.now() + DAY} />
        </ThemeContextProvider>
    );
};
export const Scenario9 = (): JSX.Element => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <TextTimer
                minTimeUnit="seconds"
                maxTimeUnit="hours"
                endTimestamp={Date.now() + SECOND}
                aria-label="A label"
            />
        </ThemeContextProvider>
    );
};
