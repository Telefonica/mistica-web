import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {SlideSwap, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

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
