import React from 'react';
import {render, screen} from '@testing-library/react';
import {useIconGradient} from '../icon-gradient';

const TestComponent = ({color}: {color?: string}) => {
    const {fillValue, gradientDef} = useIconGradient(color);

    return (
        <>
            <div data-testid="fill-value">{fillValue}</div>
            <div data-testid="gradient-type">{gradientDef ? String(gradientDef.type) : 'null'}</div>
        </>
    );
};

test('useIconGradient returns solid color unchanged', () => {
    render(<TestComponent color="#ff0000" />);

    expect(screen.getByTestId('fill-value')).toHaveTextContent('#ff0000');
    expect(screen.getByTestId('gradient-type')).toHaveTextContent('null');
});

test('useIconGradient creates linear gradient definition', () => {
    render(<TestComponent color="linear-gradient(to right, red, blue)" />);

    expect(screen.getByTestId('fill-value')).toHaveTextContent('url(#');
    expect(screen.getByTestId('gradient-type')).toHaveTextContent('linearGradient');
});

test('useIconGradient creates radial gradient definition', () => {
    render(<TestComponent color="radial-gradient(circle at center, red, blue)" />);

    expect(screen.getByTestId('fill-value')).toHaveTextContent('url(#');
    expect(screen.getByTestId('gradient-type')).toHaveTextContent('radialGradient');
});

test('useIconGradient ignores invalid gradient string', () => {
    render(<TestComponent color="gradient(foo)" />);

    expect(screen.getByTestId('fill-value')).toHaveTextContent('gradient(foo)');
    expect(screen.getByTestId('gradient-type')).toHaveTextContent('null');
});

test('useIconGradient handles undefined inputs safely', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('fill-value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('gradient-type')).toHaveTextContent('null');
});

test('useIconGradient applies default values for missing radial positions', () => {
    render(<TestComponent color="radial-gradient(red, blue)" />);

    expect(screen.getByTestId('fill-value')).toHaveTextContent('url(#');
    expect(screen.getByTestId('gradient-type')).toHaveTextContent('radialGradient');
});

test('useIconGradient applies default angle for missing linear directions', () => {
    render(<TestComponent color="linear-gradient(red, blue)" />);

    expect(screen.getByTestId('fill-value')).toHaveTextContent('url(#');
    expect(screen.getByTestId('gradient-type')).toHaveTextContent('linearGradient');
});

test('useIconGradient applies explicit radius for radial gradients', () => {
    render(<TestComponent color="radial-gradient(25% at center, red, blue)" />);

    expect(screen.getByTestId('fill-value')).toHaveTextContent('url(#');
    expect(screen.getByTestId('gradient-type')).toHaveTextContent('radialGradient');
});
