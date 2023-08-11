import * as React from 'react';
import BottomSheet, {
    ActionsBottomSheet,
    ActionsListBottomSheet,
    InfoBottomSheet,
    RadioListBottomSheet,
} from '../bottom-sheet';
import {act, render, screen, waitForElementToBeRemoved, within} from '@testing-library/react';
import {BottomSheetRoot, ButtonPrimary, showBottomSheet, ThemeContextProvider, Title1} from '..';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';

test('BottomSheet', async () => {
    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <BottomSheet
                        onClose={() => {
                            setShowModal(false);
                        }}
                    >
                        {({closeModal, modalTitleId}) => (
                            <>
                                <Title1 id={modalTitleId}>Sheet title</Title1>
                                <ButtonPrimary onPress={closeModal}>Close</ButtonPrimary>
                            </>
                        )}
                    </BottomSheet>
                )}
            </>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const openButton = screen.getByRole('button', {name: 'Open'});
    await userEvent.click(openButton);
    const sheet = await screen.findByRole('dialog', {name: 'Sheet title'});

    expect(sheet).toBeInTheDocument();

    const closeButton = await within(sheet).findByRole('button', {name: 'Close'});

    await userEvent.click(closeButton);
    await waitForElementToBeRemoved(sheet);
});

test('RadioListBottomSheet', async () => {
    const selectSpy = jest.fn();

    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <RadioListBottomSheet
                        title="Choose an item"
                        onSelect={selectSpy}
                        onClose={() => {
                            setShowModal(false);
                        }}
                        selectedId="2"
                        items={[
                            {id: '1', title: 'Item 1'},
                            {id: '2', title: 'Item 2'},
                        ]}
                    />
                )}
            </>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const openButton = screen.getByRole('button', {name: 'Open'});
    await userEvent.click(openButton);
    const sheet = await screen.findByRole('dialog', {name: 'Choose an item'});

    expect(sheet).toBeInTheDocument();

    const item1 = await within(sheet).findByRole('radio', {name: 'Item 1'});
    const item2 = await within(sheet).findByRole('radio', {name: 'Item 2'});
    const continueButton = await within(sheet).findByRole('button', {name: 'Continuar'});
    expect(item2).toBeChecked();

    await userEvent.click(item1);
    await userEvent.click(continueButton);

    await waitForElementToBeRemoved(sheet);
    expect(selectSpy).toHaveBeenCalledWith('1');
});

test('ActionsListBottomSheet', async () => {
    const selectSpy = jest.fn();

    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <ActionsListBottomSheet
                        title="Choose an action"
                        onSelect={selectSpy}
                        onClose={() => {
                            setShowModal(false);
                        }}
                        items={[
                            {id: '1', title: 'Action 1'},
                            {id: '2', title: 'Action 2'},
                        ]}
                    />
                )}
            </>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const openButton = screen.getByRole('button', {name: 'Open'});
    await userEvent.click(openButton);
    const sheet = await screen.findByRole('dialog', {name: 'Choose an action'});

    expect(sheet).toBeInTheDocument();

    const action1 = await within(sheet).findByRole('button', {name: 'Action 1'});
    const action2 = await within(sheet).findByRole('button', {name: 'Action 2'});

    expect(action1).toBeInTheDocument();
    expect(action2).toBeInTheDocument();

    await userEvent.click(action1);

    await waitForElementToBeRemoved(sheet);
    expect(selectSpy).toHaveBeenCalledWith('1');
});

test('InfoBottomSheet', async () => {
    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <InfoBottomSheet
                        title="Title"
                        subtitle="Subtitle"
                        description="Description"
                        items={[
                            {id: '1', title: 'Item 1', icon: {type: 'bullet'}},
                            {id: '2', title: 'Item 2', icon: {type: 'bullet'}},
                        ]}
                    />
                )}
            </>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const openButton = screen.getByRole('button', {name: 'Open'});
    await userEvent.click(openButton);
    const sheet = await screen.findByRole('dialog', {name: 'Title'});

    expect(sheet).toBeInTheDocument();

    const title = await within(sheet).findByRole('heading', {name: 'Title'});
    expect(title).toBeInTheDocument();

    const subtitle = await within(sheet).findByText('Subtitle');
    expect(subtitle).toBeInTheDocument();

    const description = await within(sheet).findByText('Description');
    expect(description).toBeInTheDocument();

    const itemList = await within(sheet).findByRole('list');
    expect(itemList).toBeInTheDocument();

    const items = await within(itemList).findAllByRole('listitem');
    expect(items).toHaveLength(2);
});

test('ActionsBottomSheet', async () => {
    const onPressButtonSpy = jest.fn();

    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <ActionsBottomSheet
                        title="Title"
                        subtitle="Subtitle"
                        description="Description"
                        button={{text: 'Button'}}
                        secondaryButton={{text: 'Secondary button'}}
                        buttonLink={{text: 'Button link'}}
                        onPressButton={onPressButtonSpy}
                        onClose={() => {
                            setShowModal(false);
                        }}
                    />
                )}
            </>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const openDialog = async () => {
        const openButton = screen.getByRole('button', {name: 'Open'});
        await userEvent.click(openButton);
        return await screen.findByRole('dialog', {name: 'Title'});
    };

    const sheet = await openDialog();

    expect(sheet).toBeInTheDocument();

    const primary = await within(sheet).findByRole('button', {name: 'Button'});
    const secondary = await within(sheet).findByRole('button', {name: 'Secondary button'});
    const link = await within(sheet).findByRole('button', {name: 'Button link'});

    expect(primary).toBeInTheDocument();
    expect(secondary).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    await userEvent.click(secondary);

    await waitForElementToBeRemoved(sheet);
    expect(onPressButtonSpy).toHaveBeenCalledWith('SECONDARY');
});

test('showBottomSheet INFO', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot />
        </ThemeContextProvider>
    );

    act(() => {
        showBottomSheet({
            type: 'INFO',
            props: {
                title: 'Title',
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        }).then(resultSpy);
    });

    const sheet = await screen.findByRole('dialog', {name: 'Title'});
    expect(sheet).toBeInTheDocument();

    const closeButton = await screen.findByRole('button', {name: 'Cerrar'});
    await userEvent.click(closeButton);

    await waitForElementToBeRemoved(sheet);
    expect(resultSpy).toHaveBeenCalledWith(undefined);
});

test('showBottomSheet ACTIONS_LIST', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot />
        </ThemeContextProvider>
    );

    act(() => {
        showBottomSheet({
            type: 'ACTIONS_LIST',
            props: {
                title: 'Title',
                items: [
                    {id: '1', title: 'Item 1'},
                    {id: '2', title: 'Item 2'},
                ],
            },
        }).then(resultSpy);
    });

    const sheet = await screen.findByRole('dialog', {name: 'Title'});
    expect(sheet).toBeInTheDocument();

    const item1 = await screen.findByRole('button', {name: 'Item 2'});

    await userEvent.click(item1);

    await waitForElementToBeRemoved(sheet);
    expect(resultSpy).toHaveBeenCalledWith({action: 'SUBMIT', selectedId: '2'});
});

test('showBottomSheet ACTIONS_LIST dismiss', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot />
        </ThemeContextProvider>
    );

    act(() => {
        showBottomSheet({
            type: 'ACTIONS_LIST',
            props: {
                title: 'Title',
                items: [
                    {id: '1', title: 'Item 1'},
                    {id: '2', title: 'Item 2'},
                ],
            },
        }).then(resultSpy);
    });

    const sheet = await screen.findByRole('dialog', {name: 'Title'});
    expect(sheet).toBeInTheDocument();

    const closeButton = await screen.findByRole('button', {name: 'Cerrar'});
    await userEvent.click(closeButton);

    await waitForElementToBeRemoved(sheet);
    expect(resultSpy).toHaveBeenCalledWith({action: 'DISMISS'});
});

test('showBottomSheet RADIO_LIST', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot />
        </ThemeContextProvider>
    );

    act(() => {
        showBottomSheet({
            type: 'RADIO_LIST',
            props: {
                title: 'Title',
                items: [
                    {id: '1', title: 'Item 1'},
                    {id: '2', title: 'Item 2'},
                ],
            },
        }).then(resultSpy);
    });

    const sheet = await screen.findByRole('dialog', {name: 'Title'});
    expect(sheet).toBeInTheDocument();

    const item1 = await screen.findByRole('radio', {name: 'Item 2'});
    const continueButton = await screen.findByRole('button', {name: 'Continuar'});

    await userEvent.click(item1);
    await userEvent.click(continueButton);

    await waitForElementToBeRemoved(sheet);
    expect(resultSpy).toHaveBeenCalledWith({action: 'SUBMIT', selectedId: '2'});
});

test('showBottomSheet RADIO_LIST dismiss', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot />
        </ThemeContextProvider>
    );

    act(() => {
        showBottomSheet({
            type: 'RADIO_LIST',
            props: {
                title: 'Title',
                items: [
                    {id: '1', title: 'Item 1'},
                    {id: '2', title: 'Item 2'},
                ],
            },
        }).then(resultSpy);
    });

    const sheet = await screen.findByRole('dialog', {name: 'Title'});
    expect(sheet).toBeInTheDocument();

    const closeButton = await screen.findByRole('button', {name: 'Cerrar'});
    await userEvent.click(closeButton);

    await waitForElementToBeRemoved(sheet);
    expect(resultSpy).toHaveBeenCalledWith({action: 'DISMISS'});
});

test('showBottomSheet ACTIONS', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot />
        </ThemeContextProvider>
    );

    act(() => {
        showBottomSheet({
            type: 'ACTIONS',
            props: {
                title: 'Title',
                subtitle: 'Subtitle',
                description: 'Description',
                button: {text: 'Button'},
                secondaryButton: {text: 'Secondary button'},
                link: {text: 'Button link', withChevron: true},
            },
        }).then(resultSpy);
    });

    const sheet = await screen.findByRole('dialog', {name: 'Title'});
    expect(sheet).toBeInTheDocument();

    const primary = await screen.findByRole('button', {name: 'Button'});
    const secondary = await screen.findByRole('button', {name: 'Secondary button'});
    const link = await screen.findByRole('button', {name: 'Button link'});

    expect(primary).toBeInTheDocument();
    expect(secondary).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    await userEvent.click(link);

    await waitForElementToBeRemoved(sheet);
    expect(resultSpy).toHaveBeenCalledWith({action: 'LINK'});
});

test('showBottomSheet ACTIONS dismiss', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot />
        </ThemeContextProvider>
    );

    act(() => {
        showBottomSheet({
            type: 'ACTIONS',
            props: {
                title: 'Title',
                subtitle: 'Subtitle',
                description: 'Description',
                button: {text: 'Button'},
                secondaryButton: {text: 'Secondary button'},
                link: {text: 'Button link', withChevron: true},
            },
        }).then(resultSpy);
    });

    const sheet = await screen.findByRole('dialog', {name: 'Title'});
    expect(sheet).toBeInTheDocument();

    const closeButton = await screen.findByRole('button', {name: 'Cerrar'});
    await userEvent.click(closeButton);

    await waitForElementToBeRemoved(sheet);
    expect(resultSpy).toHaveBeenCalledWith({action: 'DISMISS'});
});

test('showBottomSheet fails if BottomSheetRoot is not rendered', async () => {
    await expect(
        showBottomSheet({
            type: 'INFO',
            props: {
                title: 'Title',
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        })
    ).rejects.toThrow('Tried to show a BottomSheet but the BottomSheetRoot component was not mounted');
});

test('showBottomSheet fails if there is already a sheet open', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot />
        </ThemeContextProvider>
    );

    act(() => {
        showBottomSheet({
            type: 'INFO',
            props: {
                title: 'Title',
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        });
    });

    await expect(
        showBottomSheet({
            type: 'INFO',
            props: {
                title: 'Title',
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        })
    ).rejects.toThrow('Tried to show a BottomSheet but there is already one open');
});

test('showBottomSheet with native implementation INFO', async () => {
    const resultSpy = jest.fn();

    const nativeImplementation = {
        INFO: jest.fn(() => Promise.resolve()),
        ACTIONS_LIST: jest.fn(),
        RADIO_LIST: jest.fn(),
        ACTIONS: jest.fn(),
    };
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot nativeImplementation={nativeImplementation} />
        </ThemeContextProvider>
    );

    await act(() =>
        showBottomSheet({
            type: 'INFO',
            props: {
                title: 'Title',
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        }).then(resultSpy)
    );

    expect(nativeImplementation.INFO).toHaveBeenCalledWith({
        title: 'Title',
        items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
    });

    expect(resultSpy).toHaveBeenCalled();
});

test('showBottomSheet with native implementation ACTIONS_LIST', async () => {
    const resultSpy = jest.fn();
    const nativeImplementation = {
        INFO: jest.fn(),
        ACTIONS_LIST: jest.fn(() => Promise.resolve({action: 'SUBMIT', selectedId: '2'} as const)),
        RADIO_LIST: jest.fn(),
        ACTIONS: jest.fn(),
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot nativeImplementation={nativeImplementation} />
        </ThemeContextProvider>
    );

    await act(() =>
        showBottomSheet({
            type: 'ACTIONS_LIST',
            props: {
                title: 'Title',
                items: [
                    {id: '1', title: 'Item 1'},
                    {id: '2', title: 'Item 2'},
                ],
            },
        }).then(resultSpy)
    );

    expect(nativeImplementation.ACTIONS_LIST).toHaveBeenCalledWith({
        title: 'Title',
        items: [
            {id: '1', title: 'Item 1'},
            {id: '2', title: 'Item 2'},
        ],
    });

    expect(resultSpy).toHaveBeenCalledWith({action: 'SUBMIT', selectedId: '2'});
});

test('showBottomSheet with native implementation RADIO_LIST', async () => {
    const resultSpy = jest.fn();
    const nativeImplementation = {
        INFO: jest.fn(),
        ACTIONS_LIST: jest.fn(),
        RADIO_LIST: jest.fn(() => Promise.resolve({action: 'SUBMIT', selectedId: '2'} as const)),
        ACTIONS: jest.fn(),
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot nativeImplementation={nativeImplementation} />
        </ThemeContextProvider>
    );

    await act(() =>
        showBottomSheet({
            type: 'RADIO_LIST',
            props: {
                title: 'Title',
                items: [
                    {id: '1', title: 'Item 1'},
                    {id: '2', title: 'Item 2'},
                ],
            },
        }).then(resultSpy)
    );

    expect(nativeImplementation.RADIO_LIST).toHaveBeenCalledWith({
        title: 'Title',
        items: [
            {id: '1', title: 'Item 1'},
            {id: '2', title: 'Item 2'},
        ],
    });

    expect(resultSpy).toHaveBeenCalledWith({action: 'SUBMIT', selectedId: '2'});
});

test('showBottomSheet with native implementation ACTIONS', async () => {
    const resultSpy = jest.fn();
    const nativeImplementation = {
        INFO: jest.fn(),
        ACTIONS_LIST: jest.fn(),
        RADIO_LIST: jest.fn(),
        ACTIONS: jest.fn(() => Promise.resolve({action: 'LINK'} as const)),
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BottomSheetRoot nativeImplementation={nativeImplementation} />
        </ThemeContextProvider>
    );

    await act(() =>
        showBottomSheet({
            type: 'ACTIONS',
            props: {
                title: 'Title',
                subtitle: 'Subtitle',
                description: 'Description',
                button: {text: 'Button'},
                secondaryButton: {text: 'Secondary button'},
                link: {text: 'Button link', withChevron: true},
            },
        }).then(resultSpy)
    );

    expect(nativeImplementation.ACTIONS).toHaveBeenCalledWith({
        title: 'Title',
        subtitle: 'Subtitle',
        description: 'Description',
        button: {text: 'Button'},
        secondaryButton: {text: 'Secondary button'},
        link: {text: 'Button link', withChevron: true},
    });

    expect(resultSpy).toHaveBeenCalledWith({action: 'LINK'});
});
