import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AiCard} from '../community';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

beforeAll(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: jest.fn().mockImplementation((callback: IntersectionObserverCallback) => ({
            observe: jest.fn((element: Element) => {
                callback(
                    [{isIntersecting: true, target: element} as IntersectionObserverEntry],
                    {} as IntersectionObserver
                );
            }),
            disconnect: jest.fn(),
            unobserve: jest.fn(),
        })),
    });
});

afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
});

const mockPrefersReducedMotion = () => {
    jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        media: query,
        onchange: null,
        dispatchEvent: jest.fn(),
    }));
};

test('renders static text', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <AiCard text="Hello world" />
        </ThemeContextProvider>
    );

    expect(screen.getByTestId('AiCard').textContent).toContain('Hello world');
});

test('is non-interactive when no onPress is provided', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <AiCard text="Hello" />
        </ThemeContextProvider>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('renders as an accessible button when onPress is provided', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <AiCard text="Hello" onPress={() => {}} />
        </ThemeContextProvider>
    );

    expect(screen.getByRole('button', {name: 'Hello'})).toBeInTheDocument();
});

test('renders as an accessible link when href is provided', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <AiCard text="Hello " words={['world']} href="https://example.com" />
        </ThemeContextProvider>
    );

    expect(screen.getByRole('link', {name: 'Hello world'})).toBeInTheDocument();
});

test('calls onPress when clicked', async () => {
    const handlePress = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <AiCard text="Hello" onPress={handlePress} />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(handlePress).toHaveBeenCalledTimes(1);
});

test('shows the last word immediately when user prefers reduced motion', () => {
    mockPrefersReducedMotion();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <AiCard text="" words={['weather', 'news']} onPress={() => {}} />
        </ThemeContextProvider>
    );

    expect(screen.getByRole('button', {name: 'news'})).toBeInTheDocument();
});

test('animates words: typed word appears in the card', () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <AiCard text="" words={['hi']} onPress={() => {}} />
        </ThemeContextProvider>
    );

    React.act(() => jest.advanceTimersByTime(500));

    expect(screen.getByTestId('AiCard').textContent).toContain('hi');
});

test('passes dataAttributes to the container element', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <AiCard text="Hello" dataAttributes={{testid: 'my-ai-card'}} />
        </ThemeContextProvider>
    );

    expect(screen.getByTestId('my-ai-card')).toBeInTheDocument();
});
