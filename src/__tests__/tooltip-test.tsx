import * as React from 'react';
import {render, fireEvent, screen, act} from '@testing-library/react';
import Tooltip from '../tooltip';
import {ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

type Props = Omit<React.ComponentProps<typeof Tooltip>, 'children' | 'targetLabel' | 'target'>;

const TestTooltip: React.FC<Props> = (props) => (
    <ThemeContextProvider theme={makeTheme()}>
        <Tooltip
            {...props}
            targetLabel="help text"
            target={<span className="target">Press me!</span>}
            extra={<div className="content">Content</div>}
            delay={false}
        />
    </ThemeContextProvider>
);

test('target was painted', () => {
    render(<TestTooltip position="bottom" />);

    expect(screen.getByText('Press me!')).toBeInTheDocument();
});

test('does not render content initially', () => {
    render(<TestTooltip position="bottom" />);

    expect(screen.queryByText('Content')).toBe(null);
});

test('render content after press down target', () => {
    render(<TestTooltip position="bottom" />);

    act(() => {
        screen.getByText('Press me!').click();
    });

    expect(screen.getByText('Content')).toBeInTheDocument();
});

test('set title and description', () => {
    render(<TestTooltip title="Title" description="Description" />);

    act(() => {
        screen.getByText('Press me!').click();
    });

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
});

test('click anchor does not close tooltip', () => {
    const linkSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Tooltip targetLabel="help text" target={<span className="target">Press me!</span>} delay={false}>
                <div className="content">
                    Content
                    <a tabIndex={-1} role="link" onClick={() => linkSpy()}>
                        Link
                    </a>
                </div>
            </Tooltip>
        </ThemeContextProvider>
    );

    act(() => {
        screen.getByText('Press me!').click();
    });

    fireEvent.click(screen.getByText('Link'));

    expect(linkSpy).toHaveBeenCalled();
    expect(screen.getByText('Content')).toBeInTheDocument();
});
