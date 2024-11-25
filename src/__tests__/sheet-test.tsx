import * as React from 'react';
import Sheet from '../sheet-common';
import {act, render, screen, waitFor, within} from '@testing-library/react';
import {SheetRoot, ButtonPrimary, showSheet, ThemeContextProvider, Title1} from '..';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';
import RadioListSheet from '../sheet-radio-list';
import ActionsListSheet from '../sheet-actions-list';
import InfoSheet from '../sheet-info';
import ActionsSheet from '../sheet-actions';

test('Sheet', async () => {
    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <Sheet
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
                    </Sheet>
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

    await waitFor(() => expect(sheet).not.toBeInTheDocument());
}, 30000);

test('RadioListSheet', async () => {
    const selectSpy = jest.fn();

    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <RadioListSheet
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

    await waitFor(() => expect(sheet).not.toBeInTheDocument());
    expect(selectSpy).toHaveBeenCalledWith('1');
}, 30000);

test('ActionsListSheet', async () => {
    const selectSpy = jest.fn();

    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <ActionsListSheet
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

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(selectSpy).toHaveBeenCalledWith('1');
}, 30000);

test('InfoSheet', async () => {
    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <InfoSheet
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
}, 30000);

test('ActionsSheet', async () => {
    const onPressButtonSpy = jest.fn();

    const TestComponent = () => {
        const [showModal, setShowModal] = React.useState(false);
        return (
            <>
                <ButtonPrimary onPress={() => setShowModal(true)}>Open</ButtonPrimary>
                {showModal && (
                    <ActionsSheet
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

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(onPressButtonSpy).toHaveBeenCalledWith('SECONDARY');
}, 30000);

test('showSheet INFO', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot />
        </ThemeContextProvider>
    );

    await act(async () => {
        showSheet({
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

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(resultSpy).toHaveBeenCalledWith({action: 'DISMISS'});
}, 30000);

test('showSheet ACTIONS_LIST', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot />
        </ThemeContextProvider>
    );

    await act(async () => {
        showSheet({
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

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(resultSpy).toHaveBeenCalledWith({action: 'SUBMIT', selectedId: '2'});
}, 30000);

test('showSheet ACTIONS_LIST dismiss', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot />
        </ThemeContextProvider>
    );

    await act(async () => {
        showSheet({
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

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(resultSpy).toHaveBeenCalledWith({action: 'DISMISS'});
}, 30000);

test('showSheet RADIO_LIST', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot />
        </ThemeContextProvider>
    );

    await act(async () => {
        showSheet({
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

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(resultSpy).toHaveBeenCalledWith({action: 'SUBMIT', selectedId: '2'});
}, 30000);

test('showSheet RADIO_LIST dismiss', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot />
        </ThemeContextProvider>
    );

    await act(async () => {
        showSheet({
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

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(resultSpy).toHaveBeenCalledWith({action: 'DISMISS'});
}, 30000);

test('showSheet ACTIONS', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot />
        </ThemeContextProvider>
    );

    await act(async () => {
        showSheet({
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

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(resultSpy).toHaveBeenCalledWith({action: 'LINK'});
}, 30000);

test('showSheet ACTIONS dismiss', async () => {
    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot />
        </ThemeContextProvider>
    );

    await act(async () => {
        showSheet({
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

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(resultSpy).toHaveBeenCalledWith({action: 'DISMISS'});
}, 30000);

test('showSheet fails if SheetRoot is not rendered', async () => {
    await expect(
        showSheet({
            type: 'INFO',
            props: {
                title: 'Title',
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        })
    ).rejects.toThrow('Tried to show a Sheet but the SheetRoot component was not mounted');
}, 30000);

test('showSheet fails if there is already a sheet open', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot />
        </ThemeContextProvider>
    );

    await act(async () => {
        showSheet({
            type: 'INFO',
            props: {
                title: 'Title',
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        });
    });

    const sheet = await screen.findByRole('dialog', {name: 'Title'});
    expect(sheet).toBeInTheDocument();

    await expect(
        showSheet({
            type: 'INFO',
            props: {
                title: 'Title',
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        })
    ).rejects.toThrow('Tried to show a Sheet but there is already one open');

    const closeButton = await screen.findByRole('button', {name: 'Cerrar'});
    await userEvent.click(closeButton);

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );
}, 30000);

test('showSheet with native implementation INFO', async () => {
    const resultSpy = jest.fn();

    const nativeImplementation = jest.fn(() => Promise.resolve({action: 'DISMISS' as const, result: []}));
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot nativeImplementation={nativeImplementation} />
        </ThemeContextProvider>
    );

    await act(async () =>
        showSheet({
            type: 'INFO',
            props: {
                title: 'Title',
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        }).then(resultSpy)
    );

    expect(nativeImplementation).toHaveBeenCalledWith({
        title: 'Title',
        content: [
            {
                type: 'LIST',
                id: 'list-0',
                listType: 'INFORMATIVE',
                autoSubmit: false,
                selectedIds: [],
                items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
            },
        ],
    });

    expect(resultSpy).toHaveBeenCalled();
}, 30000);

test('showSheet with native implementation ACTIONS_LIST', async () => {
    const resultSpy = jest.fn();
    const nativeImplementation = jest.fn(() =>
        Promise.resolve({
            action: 'SUBMIT' as const,
            result: [{id: 'list-0', selectedIds: ['2']}],
        })
    );

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot nativeImplementation={nativeImplementation} />
        </ThemeContextProvider>
    );

    await act(async () =>
        showSheet({
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

    expect(nativeImplementation).toHaveBeenCalledWith({
        title: 'Title',
        content: [
            {
                type: 'LIST',
                id: 'list-0',
                listType: 'ACTIONS',
                autoSubmit: true,
                selectedIds: [],
                items: [
                    {id: '1', title: 'Item 1'},
                    {id: '2', title: 'Item 2'},
                ],
            },
        ],
    });

    expect(resultSpy).toHaveBeenCalledWith({action: 'SUBMIT', selectedId: '2'});
}, 30000);

test('showSheet with native implementation RADIO_LIST', async () => {
    const resultSpy = jest.fn();
    const nativeImplementation = jest.fn(() =>
        Promise.resolve({
            action: 'SUBMIT' as const,
            result: [{id: 'list-0', selectedIds: ['2']}],
        })
    );

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot nativeImplementation={nativeImplementation} />
        </ThemeContextProvider>
    );

    await act(async () =>
        showSheet({
            type: 'RADIO_LIST',
            props: {
                title: 'Title',
                selectedId: '1',
                items: [
                    {id: '1', title: 'Item 1'},
                    {id: '2', title: 'Item 2'},
                ],
            },
        }).then(resultSpy)
    );

    expect(nativeImplementation).toHaveBeenCalledWith({
        title: 'Title',
        content: [
            {
                type: 'LIST',
                id: 'list-0',
                listType: 'SINGLE_SELECTION',
                autoSubmit: true,
                selectedIds: ['1'],
                items: [
                    {id: '1', title: 'Item 1'},
                    {id: '2', title: 'Item 2'},
                ],
            },
        ],
    });

    expect(resultSpy).toHaveBeenCalledWith({action: 'SUBMIT', selectedId: '2'});
}, 30000);

test('showSheet with native implementation ACTIONS', async () => {
    const resultSpy = jest.fn();
    const nativeImplementation = jest.fn(() =>
        Promise.resolve({
            action: 'SUBMIT' as const,
            result: [{id: 'bottom-actions-0', selectedIds: ['LINK']}],
        })
    );

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot nativeImplementation={nativeImplementation} />
        </ThemeContextProvider>
    );

    await act(async () =>
        showSheet({
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

    expect(nativeImplementation).toHaveBeenCalledWith({
        title: 'Title',
        subtitle: 'Subtitle',
        description: 'Description',
        content: [
            {
                type: 'BOTTOM_ACTIONS',
                id: 'bottom-actions-0',
                button: {text: 'Button'},
                secondaryButton: {text: 'Secondary button'},
                link: {text: 'Button link', withChevron: true},
            },
        ],
    });

    expect(resultSpy).toHaveBeenCalledWith({action: 'LINK'});
}, 30000);

test('showSheet with native implementation fallbacks to web if native fails', async () => {
    const nativeImplementation = jest.fn(() =>
        Promise.reject({
            code: '400',
        })
    );

    const resultSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SheetRoot nativeImplementation={nativeImplementation} />
        </ThemeContextProvider>
    );

    await act(async () => {
        showSheet({
            type: 'ACTIONS',
            props: {
                title: 'Title',
                button: {text: 'Button'},
                link: {text: 'Button link'},
            },
        }).then(resultSpy);
    });

    expect(nativeImplementation).toHaveBeenCalled();

    // web implementation is shown:
    const sheet = await screen.findByRole('dialog', {name: 'Title'});
    expect(sheet).toBeInTheDocument();

    const link = await screen.findByRole('button', {name: 'Button link'});
    await userEvent.click(link);

    await waitFor(
        () => {
            expect(sheet).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

    expect(resultSpy).toHaveBeenCalledWith({action: 'LINK'});
}, 30000);
