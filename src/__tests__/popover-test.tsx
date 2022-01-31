import * as React from 'react';
import {fireEvent, render, waitFor, screen} from '@testing-library/react';
import Popover from '../popover';
import {ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

type Props = Omit<React.ComponentProps<typeof Popover>, 'description' | 'target'>;

const TestPopover: React.FC<Props> = ({children, ...props}) => (
    <ThemeContextProvider theme={makeTheme()}>
        <Popover {...props} description="Content" target={<span>Press me!</span>} />
    </ThemeContextProvider>
);

const TestWrapper = ({onCloseSpy}: {onCloseSpy: () => void}) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const handleClose = () => {
        onCloseSpy();
        setIsVisible(false);
    };
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Popover
                isVisible={isVisible}
                description="Content"
                onClose={handleClose}
                target={<span>Press me!</span>}
            />
        </ThemeContextProvider>
    );
};

const AnyIcon = () => <svg data-testid="icon" />;

test('target is painted', () => {
    render(<TestPopover />);

    expect(screen.getByText('Press me!')).toBeInTheDocument();
});

test('popover is painted by default', () => {
    render(<TestPopover />);

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByLabelText('Cerrar')).toBeInTheDocument();
});

test('popover is not painted if visible property is false', () => {
    render(<TestPopover isVisible={false} />);

    expect(screen.queryByText('Content')).toBe(null);
});

test('set title and description', () => {
    render(<TestPopover title="Title" />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
});

test('set title and asset', () => {
    render(<TestPopover title="Title" asset={<AnyIcon />} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('popover is not painted after click the close icon', async () => {
    const onCloseSpy = jest.fn();
    render(<TestWrapper onCloseSpy={onCloseSpy} />);
    expect(screen.getByText('Content')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Cerrar'));

    await waitFor(() => expect(onCloseSpy).toHaveBeenCalled());

    expect(screen.queryByText('Content')).toBe(null);
});

test('popover default(bottom) style', () => {
    const {container} = render(<TestPopover />);

    expect(container).toMatchSnapshot();
});

test('popover top style', () => {
    const {container} = render(<TestPopover position="top" />);

    expect(container).toMatchSnapshot();
});

test('popover right style', () => {
    const {container} = render(<TestPopover position="right" />);

    expect(container).toMatchSnapshot();
});

test('popover left style', () => {
    const {container} = render(<TestPopover position="left" />);

    expect(container).toMatchSnapshot();
});
