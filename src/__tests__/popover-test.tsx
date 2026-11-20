import * as React from 'react';
import {fireEvent, render, waitFor, screen} from '@testing-library/react';
import Popover from '../popover';
import {ButtonPrimary, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

type Props = Omit<React.ComponentProps<typeof Popover>, 'description' | 'target'>;

const TestPopover = ({children, ...props}: Props) => (
    <ThemeContextProvider theme={makeTheme()}>
        <Popover {...props} description="Content" target={<span>Press me!</span>} />
    </ThemeContextProvider>
);

const UncontrolledWrapper = ({onCloseSpy}: {onCloseSpy: () => void}) => {
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Popover
                description="Content"
                onClose={onCloseSpy}
                target={<ButtonPrimary onPress={() => {}}>Press me!</ButtonPrimary>}
            />
        </ThemeContextProvider>
    );
};

const ControlledWrapper = ({onCloseSpy}: {onCloseSpy: () => void}) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const handleClose = () => {
        onCloseSpy();
        setIsVisible(false);
    };
    return (
        <ThemeContextProvider theme={makeTheme()}>
            <Popover
                open={isVisible}
                description="Content"
                onClose={handleClose}
                target={<ButtonPrimary onPress={() => setIsVisible(!isVisible)}>Press me!</ButtonPrimary>}
            />
        </ThemeContextProvider>
    );
};

const AnyIcon = () => <svg data-testid="icon" />;

test('target is painted', () => {
    render(<TestPopover />);

    expect(screen.getByText('Press me!')).toBeInTheDocument();
});

test('popover is painted if open property is true', () => {
    render(<TestPopover open />);

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByLabelText('Cerrar')).toBeInTheDocument();
});

test('popover is not painted if open property is false', () => {
    render(<TestPopover open={false} />);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
});

test('set title and description', () => {
    render(<TestPopover title="Title" open />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
});

test('set title and asset', () => {
    render(<TestPopover title="Title" asset={<AnyIcon />} open />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('popover - controlled', async () => {
    const onCloseSpy = jest.fn();
    render(<ControlledWrapper onCloseSpy={onCloseSpy} />);

    const target = screen.getByText('Press me!');

    // Initially closed
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    // Opened after click on target
    fireEvent.click(target);
    expect(screen.getByText('Content')).toBeInTheDocument();

    // Closed after second click on target
    fireEvent.click(target);
    await waitFor(() => {
        expect(onCloseSpy).not.toHaveBeenCalled();
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    // Opened after third click on target
    fireEvent.click(target);
    expect(screen.getByText('Content')).toBeInTheDocument();

    // Closed after click on close button
    fireEvent.click(screen.getByLabelText('Cerrar'));
    await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalled();
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
});

test('popover - uncontrolled', async () => {
    const onCloseSpy = jest.fn();
    render(<UncontrolledWrapper onCloseSpy={onCloseSpy} />);

    const target = screen.getByText('Press me!');

    // Initially closed
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    // Opened after click on target
    fireEvent.click(target);
    expect(screen.getByText('Content')).toBeInTheDocument();

    // Closed after second click on target
    fireEvent.click(target);
    await waitFor(() => {
        expect(onCloseSpy).not.toHaveBeenCalled();
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    // Opened after third click on target
    fireEvent.click(target);
    expect(screen.getByText('Content')).toBeInTheDocument();

    // Closed after click on close button
    fireEvent.click(screen.getByLabelText('Cerrar'));
    await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalled();
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
});

test('popover- close button label is customizable', async () => {
    render(<TestPopover title="Title" closeButtonLabel="custom close label" />);

    const target = screen.getByText('Press me!');

    // Initially closed, the button is not visible
    expect(screen.queryByLabelText('custom close label')).not.toBeInTheDocument();

    // Opened after click on target, the button is visible
    fireEvent.click(target);
    expect(screen.getByLabelText('custom close label')).toBeInTheDocument();
});
