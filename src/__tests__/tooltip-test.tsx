import * as React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import Tooltip from '../tooltip';
import {ButtonPrimary, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';

type Props = Omit<React.ComponentProps<typeof Tooltip>, 'children' | 'target'>;

const TestTooltip = (props: Props) => (
    <ThemeContextProvider theme={makeTheme()}>
        <Tooltip
            {...props}
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

test('render content after press down target', async () => {
    render(<TestTooltip position="bottom" />);

    await userEvent.click(screen.getByText('Press me!'));

    expect(screen.getByText('Content')).toBeInTheDocument();
});

test('set title and description', async () => {
    render(<TestTooltip title="Title" description="Description" />);

    await userEvent.click(screen.getByText('Press me!'));

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
});

test('click anchor does not close tooltip', async () => {
    const linkSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Tooltip target={<span className="target">Press me!</span>} delay={false}>
                <div className="content">
                    Content
                    <a tabIndex={-1} role="link" onClick={() => linkSpy()}>
                        Link
                    </a>
                </div>
            </Tooltip>
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByText('Press me!'));

    fireEvent.click(screen.getByText('Link'));

    expect(linkSpy).toHaveBeenCalled();
    expect(screen.getByText('Content')).toBeInTheDocument();
});

test('tooltip with controlled value', async () => {
    const TooltipWrapper = () => {
        const [open, setOpen] = React.useState(false);
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <Tooltip
                    open={open}
                    target={<span className="target">Press me!</span>}
                    extra={<div className="content">Content</div>}
                    delay={false}
                />
                <ButtonPrimary onPress={() => setOpen(!open)}>Button</ButtonPrimary>
            </ThemeContextProvider>
        );
    };

    render(<TooltipWrapper />);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Content')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
});
