import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {SlideSwap, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

const SlideSwapWrapper = ({
    showSwappedContent,
    unmountSwappedContent,
}: {
    showSwappedContent: boolean;
    unmountSwappedContent?: boolean;
}) => (
    <ThemeContextProvider theme={makeTheme()}>
        <SlideSwap
            showSwappedContent={showSwappedContent}
            unmountSwappedContent={unmountSwappedContent}
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

test('SlideSwap with unmountSwappedContent does not render the swapped content when hidden', () => {
    render(<SlideSwapWrapper showSwappedContent={false} unmountSwappedContent />);

    expect(screen.getByText('primary content')).toBeInTheDocument();
    expect(screen.queryByText('swapped content')).not.toBeInTheDocument();
});

test('SlideSwap with unmountSwappedContent keeps the swapped content mounted until the transition ends', () => {
    const {rerender} = render(<SlideSwapWrapper showSwappedContent unmountSwappedContent />);

    expect(screen.getByText('swapped content')).toBeInTheDocument();

    rerender(<SlideSwapWrapper showSwappedContent={false} unmountSwappedContent />);

    // still mounted while the hide transition runs
    const swappedContent = screen.getByText('swapped content');
    expect(swappedContent).toBeInTheDocument();

    fireEvent.transitionEnd(swappedContent);

    expect(screen.queryByText('swapped content')).not.toBeInTheDocument();
});
