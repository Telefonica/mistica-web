import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {SlideSwap, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

afterEach(() => {
    jest.useRealTimers();
});

const SlideSwapWrapper = ({showSwappedContent}: {showSwappedContent: boolean}) => (
    <ThemeContextProvider theme={makeTheme()}>
        <SlideSwap
            showSwappedContent={showSwappedContent}
            swappedContent={<span role="status">swapped content</span>}
        >
            <span role="note">primary content</span>
        </SlideSwap>
    </ThemeContextProvider>
);

test('SlideSwap renders both contents, hiding the swapped one from screen readers', () => {
    render(<SlideSwapWrapper showSwappedContent={false} />);

    expect(screen.getByRole('note')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    // the swapped content is rendered, but hidden from the accessibility tree
    expect(screen.getByText('swapped content')).toBeInTheDocument();
});

test('SlideSwap hides the primary content from screen readers when swapped', () => {
    render(<SlideSwapWrapper showSwappedContent />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('note')).not.toBeInTheDocument();
    expect(screen.getByText('primary content')).toBeInTheDocument();
});

// jsdom doesn't implement TransitionEvent, so propertyName must be set manually
const fireTransitionEnd = (element: HTMLElement, propertyName: string) => {
    const event = new Event('transitionend', {bubbles: true});
    Object.defineProperty(event, 'propertyName', {value: propertyName});
    fireEvent(element, event);
};

test('SlideSwap calls onTransitionEnd once per swap, ignoring transitions from its contents', () => {
    const onTransitionEnd = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SlideSwap
                showSwappedContent
                swappedContent={<span>swapped content</span>}
                onTransitionEnd={onTransitionEnd}
            >
                <span>primary content</span>
            </SlideSwap>
        </ThemeContextProvider>
    );

    const swappedContent = screen.getByText('swapped content');
    // eslint-disable-next-line testing-library/no-node-access
    const swappedContentContainer = swappedContent.parentElement as HTMLElement;

    // transitions bubbling from the content itself are ignored
    fireTransitionEnd(swappedContent, 'opacity');
    // the transform transition ends at the same time as the opacity one, so it is ignored too
    fireTransitionEnd(swappedContentContainer, 'transform');
    expect(onTransitionEnd).not.toHaveBeenCalled();

    fireTransitionEnd(swappedContentContainer, 'opacity');
    expect(onTransitionEnd).toHaveBeenCalledTimes(1);
});

const AnnouncingSlideSwap = ({showSwappedContent}: {showSwappedContent: boolean}) => (
    <ThemeContextProvider theme={makeTheme()}>
        <SlideSwap
            announcements={{swapped: 'Sending message'}}
            showSwappedContent={showSwappedContent}
            swappedContent={<span>Sending…</span>}
        >
            <span>Send</span>
        </SlideSwap>
    </ThemeContextProvider>
);

test('SlideSwap does not render a live region without announcements', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SlideSwap showSwappedContent={false} swappedContent={<span>Sending…</span>}>
                <span>Send</span>
            </SlideSwap>
        </ThemeContextProvider>
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

test('SlideSwap announces the text of the content that appears, but not on mount nor without a text', () => {
    const {rerender} = render(<AnnouncingSlideSwap showSwappedContent={false} />);
    expect(screen.getByRole('status')).toHaveTextContent(/^$/);

    rerender(<AnnouncingSlideSwap showSwappedContent />);
    expect(screen.getByRole('status')).toHaveTextContent(/^Sending message$/);

    // the primary content has no announcement, so the text of the swapped content is cleared
    rerender(<AnnouncingSlideSwap showSwappedContent={false} />);
    expect(screen.getByRole('status')).toHaveTextContent(/^$/);
});

test('SlideSwap replaces the announcement when the content that appears has the same text', () => {
    const SameTextSlideSwap = ({showSwappedContent}: {showSwappedContent: boolean}) => (
        <ThemeContextProvider theme={makeTheme()}>
            <SlideSwap
                announcements={{primary: 'Updated', swapped: 'Updated'}}
                showSwappedContent={showSwappedContent}
                swappedContent={<span>B</span>}
            >
                <span>A</span>
            </SlideSwap>
        </ThemeContextProvider>
    );
    const {rerender} = render(<SameTextSlideSwap showSwappedContent={false} />);

    rerender(<SameTextSlideSwap showSwappedContent />);
    // eslint-disable-next-line testing-library/no-node-access
    const firstTextNode = screen.getByRole('status').firstChild;

    rerender(<SameTextSlideSwap showSwappedContent={false} />);
    expect(screen.getByRole('status')).toHaveTextContent(/^Updated$/);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('status').firstChild).not.toBe(firstTextNode);
});

test('SlideSwap clears the announcement after a second, so it is not left next to the visible content', () => {
    jest.useFakeTimers();
    const {rerender} = render(<AnnouncingSlideSwap showSwappedContent={false} />);

    rerender(<AnnouncingSlideSwap showSwappedContent />);
    expect(screen.getByRole('status')).toHaveTextContent(/^Sending message$/);

    React.act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByRole('status')).toHaveTextContent(/^$/);
});
