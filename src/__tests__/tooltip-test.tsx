import * as React from 'react';
import {render, fireEvent, screen, waitForElementToBeRemoved} from '@testing-library/react';
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

    fireEvent.pointerOver(screen.getByText('Press me!'));

    expect(screen.getByText('Content')).toBeInTheDocument();
});

test('tooltip is accessible', async () => {
    render(<TestTooltip position="bottom" />);

    expect(screen.getByLabelText('help text')).toBeInTheDocument();
    fireEvent.focus(screen.getByLabelText('help text'));
    expect(screen.getByText('Content')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByLabelText('help text'), {key: 'tab', keyCode: 9});

    await waitForElementToBeRemoved(screen.queryByText('Content'));
});

test('set default width', () => {
    render(<TestTooltip position="bottom" />);

    fireEvent.pointerOver(screen.getByText('Press me!'));
    const content = screen.getByText('Content');

    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveStyle('width: 340px; top: 16px; left: -170px;');
});

test('set custom width', () => {
    render(<TestTooltip position="bottom" width={500} />);

    fireEvent.pointerOver(screen.getByText('Press me!'));
    const content = screen.getByText('Content');

    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveStyle('width: 500px; top: 16px; left: -250px;');
});

test('set title and description', () => {
    render(<TestTooltip title="Title" description="Description" />);

    fireEvent.pointerOver(screen.getByText('Press me!'));

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
});

const targetTop = 500;
const targetRight = 840;
const targetBottom = 600;
const targetLeft = 500;
const targetHeight = 100;
const targetWidth = 100;
const distanceToTarget = 16;
const scrollY = 0;
const scrollX = 0;
const defaultWidth = 340;

const getBoundingClientRect = () =>
    ({
        top: targetTop,
        right: targetRight,
        bottom: targetBottom,
        left: targetLeft,
        height: targetHeight,
        width: targetWidth,
    } as DOMRect);

test('check container styles for right position', () => {
    jest.spyOn(global.Element.prototype, 'getBoundingClientRect').mockReturnValue(getBoundingClientRect());

    render(<TestTooltip position="right" />);

    fireEvent.pointerOver(screen.getByText('Press me!'));
    const content = screen.getByText('Content');

    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveStyle(`width: ${defaultWidth}px;
        top: ${scrollY + targetTop + targetHeight / 2}px;
        left: ${targetRight + distanceToTarget}px;`);
});

test('check container styles for left position', () => {
    jest.spyOn(global.Element.prototype, 'getBoundingClientRect').mockReturnValue(getBoundingClientRect());

    render(<TestTooltip position="left" />);

    fireEvent.pointerOver(screen.getByText('Press me!'));
    const content = screen.getByText('Content');

    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveStyle(`width: ${defaultWidth}px;
        top: ${scrollY + targetTop + targetHeight / 2}px;
        left: ${targetLeft - defaultWidth - distanceToTarget}px;`);
});

test('check container styles for top position', () => {
    jest.spyOn(global.Element.prototype, 'getBoundingClientRect').mockReturnValue(getBoundingClientRect());

    render(<TestTooltip position="top" />);

    fireEvent.pointerOver(screen.getByText('Press me!'));
    const content = screen.getByText('Content');

    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveStyle(`width: ${defaultWidth}px;
    top: ${scrollY + targetTop - distanceToTarget}px;
    left: ${scrollX + targetLeft + targetWidth / 2 - defaultWidth / 2}px;`);
});

test('check container styles for bottom position', () => {
    jest.spyOn(global.Element.prototype, 'getBoundingClientRect').mockReturnValue(getBoundingClientRect());

    render(<TestTooltip position="bottom" />);

    fireEvent.pointerOver(screen.getByText('Press me!'));
    const content = screen.getByText('Content');

    expect(content).toBeInTheDocument();
    expect(content.parentElement).toHaveStyle(`width: ${defaultWidth}px;
    top: ${scrollY + targetBottom + distanceToTarget}px;
    left: ${scrollX + targetLeft + targetWidth / 2 - defaultWidth / 2}px;`);
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

    fireEvent.pointerOver(screen.getByText('Press me!'));

    fireEvent.click(screen.getByText('Link'));

    expect(linkSpy).toHaveBeenCalled();
    expect(screen.getByText('Content')).toBeInTheDocument();
});
