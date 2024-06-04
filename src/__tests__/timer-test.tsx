import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {TextTimer, ThemeContextProvider, Timer} from '..';
import {makeTheme} from './test-utils';
import {act} from 'react-dom/test-utils';

const SECOND = 1000;
const DAY = SECOND * 60 * 60 * 24;

test('Timer', async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Timer minTimeUnit="seconds" maxTimeUnit="hours" endTimestamp={Date.now() + 60 * SECOND} />
        </ThemeContextProvider>
    );

    await screen.findByRole('timer');

    await screen.findByText('0 horas, 1 minuto y 0 segundos');

    act(() => jest.advanceTimersByTime(SECOND));
    await screen.findByText('0 horas, 0 minutos y 59 segundos');

    act(() => jest.advanceTimersByTime(SECOND * 29));
    await screen.findByText('0 horas, 0 minutos y 30 segundos');

    act(() => jest.runAllTimers());
    await screen.findByText('0 horas, 0 minutos y 0 segundos');
});

test('Timer - timestamp from the past', async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Timer minTimeUnit="seconds" maxTimeUnit="hours" endTimestamp={Date.now() - SECOND} />
        </ThemeContextProvider>
    );

    await screen.findByText('0 horas, 0 minutos y 0 segundos');

    act(() => jest.runAllTimers());
    await screen.findByText('0 horas, 0 minutos y 0 segundos');
});

test('Timer - from minutes to days', async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Timer endTimestamp={Date.now() + 61 * SECOND} minTimeUnit="minutes" maxTimeUnit="days" />
        </ThemeContextProvider>
    );

    await screen.findByText('0 días, 0 horas y 1 minuto');

    act(() => jest.advanceTimersByTime(SECOND));
    await screen.findByText('0 días, 0 horas y 1 minuto');

    act(() => jest.advanceTimersByTime(SECOND));
    await screen.findByText('0 días, 0 horas y 0 minutos');

    act(() => jest.runAllTimers());
    await screen.findByText('0 días, 0 horas y 0 minutos');
});

test('Timer - renders only minimum unit if minTimeUnit is bigger than maxTimeUnit', async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Timer endTimestamp={Date.now() + DAY} minTimeUnit="hours" maxTimeUnit="minutes" />
        </ThemeContextProvider>
    );

    await screen.findByText('24 horas');

    act(() => jest.runAllTimers());
    await screen.findByText('0 horas');
});

test('Timer - render days', async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Timer minTimeUnit="seconds" maxTimeUnit="days" endTimestamp={Date.now() + DAY} />
        </ThemeContextProvider>
    );

    await screen.findByText('1 día, 0 horas, 0 minutos y 0 segundos');

    act(() => jest.advanceTimersByTime(SECOND));
    await screen.findByText('0 días, 23 horas, 59 minutos y 59 segundos');

    act(() => jest.runAllTimers());
    await screen.findByText('0 días, 0 horas, 0 minutos y 0 segundos');
});

test('Timer - render only seconds', async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Timer minTimeUnit="seconds" maxTimeUnit="seconds" endTimestamp={Date.now() + DAY} />
        </ThemeContextProvider>
    );

    await screen.findByText('86400 segundos');

    act(() => jest.runAllTimers());
    await screen.findByText('0 segundos');
});

test('Timer - component is accessible', async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Timer
                minTimeUnit="seconds"
                maxTimeUnit="hours"
                endTimestamp={Date.now() + SECOND}
                aria-label="A label"
            />
        </ThemeContextProvider>
    );

    await screen.findByLabelText('A label. 0 horas, 0 minutos y 1 segundo');
});

test("TextTimer - doesn't render days", async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TextTimer minTimeUnit="seconds" maxTimeUnit="days" endTimestamp={Date.now() + DAY} />
        </ThemeContextProvider>
    );

    await screen.findByText('24 horas, 0 minutos y 0 segundos');

    act(() => jest.advanceTimersByTime(SECOND));
    await screen.findByText('23 horas, 59 minutos y 59 segundos');

    act(() => jest.runAllTimers());
    await screen.findByText('0 horas, 0 minutos y 0 segundos');
});

test('TextTimer - component is accessible', async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TextTimer
                minTimeUnit="seconds"
                maxTimeUnit="hours"
                endTimestamp={Date.now() + SECOND}
                aria-label="A label"
            />
        </ThemeContextProvider>
    );

    await screen.findByLabelText('A label. 0 horas, 0 minutos y 1 segundo');
});
