import * as React from 'react';
import {render, screen} from '@testing-library/react';
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

