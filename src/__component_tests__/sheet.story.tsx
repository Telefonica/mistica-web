import * as React from 'react';
import Sheet from '../sheet-common';
import {SheetRoot, ButtonPrimary, showSheet, ThemeContextProvider, Title1} from '..';
import {makeTheme} from '../test-utils/theme';
import RadioListSheet from '../sheet-radio-list';
import ActionsListSheet from '../sheet-actions-list';
import InfoSheet from '../sheet-info';
import ActionsSheet from '../sheet-actions';

export const Scenario1 = (): JSX.Element => {
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
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <TestComponent />
            </ThemeContextProvider>
        </>
    );
};
export const Scenario2 = (): JSX.Element => {
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
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <TestComponent />
            </ThemeContextProvider>
        </>
    );
};
export const Scenario3 = ({selectSpy}: {selectSpy: (...args: Array<any>) => any}): JSX.Element => {
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
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <TestComponent />
            </ThemeContextProvider>
        </>
    );
};
export const Scenario4 = ({selectSpy}: {selectSpy: (...args: Array<any>) => any}): JSX.Element => {
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
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <TestComponent />
            </ThemeContextProvider>
        </>
    );
};
export const Scenario5 = (): JSX.Element => {
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
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <TestComponent />
            </ThemeContextProvider>
        </>
    );
};
export const Scenario6 = ({
    onPressButtonSpy,
}: {
    onPressButtonSpy: (...args: Array<any>) => any;
}): JSX.Element => {
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
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <TestComponent />
            </ThemeContextProvider>
        </>
    );
};
export const Scenario7 = ({resultSpy}: {resultSpy: (...args: Array<any>) => any}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot />
            </ThemeContextProvider>
            <button
                onClick={() => {
                    showSheet({
                        type: 'INFO',
                        props: {
                            title: 'Title',
                            items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
                        },
                    }).then(resultSpy);
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario8 = ({resultSpy}: {resultSpy: (...args: Array<any>) => any}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot />
            </ThemeContextProvider>
            <button
                onClick={() => {
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
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario9 = ({resultSpy}: {resultSpy: (...args: Array<any>) => any}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot />
            </ThemeContextProvider>
            <button
                onClick={() => {
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
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario10 = ({resultSpy}: {resultSpy: (...args: Array<any>) => any}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot />
            </ThemeContextProvider>
            <button
                onClick={() => {
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
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario11 = ({resultSpy}: {resultSpy: (...args: Array<any>) => any}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot />
            </ThemeContextProvider>
            <button
                onClick={() => {
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
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario12 = ({resultSpy}: {resultSpy: (...args: Array<any>) => any}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot />
            </ThemeContextProvider>
            <button
                onClick={() => {
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
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario13 = ({resultSpy}: {resultSpy: (...args: Array<any>) => any}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot />
            </ThemeContextProvider>
            <button
                onClick={() => {
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
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario14 = ({
    resultSpy,
    nativeImplementation,
}: {
    resultSpy: (...args: Array<any>) => any;
    nativeImplementation: (...args: Array<any>) => any;
}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot nativeImplementation={nativeImplementation} />
            </ThemeContextProvider>
            <button
                onClick={() => {
                    showSheet({
                        type: 'INFO',
                        props: {
                            title: 'Title',
                            items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}],
                        },
                    }).then(resultSpy);
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario15 = ({
    resultSpy,
    nativeImplementation,
}: {
    resultSpy: (...args: Array<any>) => any;
    nativeImplementation: (...args: Array<any>) => any;
}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot nativeImplementation={nativeImplementation} />
            </ThemeContextProvider>
            <button
                onClick={() => {
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
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario16 = ({
    resultSpy,
    nativeImplementation,
}: {
    resultSpy: (...args: Array<any>) => any;
    nativeImplementation: (...args: Array<any>) => any;
}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot nativeImplementation={nativeImplementation} />
            </ThemeContextProvider>
            <button
                onClick={() => {
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
                    }).then(resultSpy);
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario17 = ({
    resultSpy,
    nativeImplementation,
}: {
    resultSpy: (...args: Array<any>) => any;
    nativeImplementation: (...args: Array<any>) => any;
}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot nativeImplementation={nativeImplementation} />
            </ThemeContextProvider>
            <button
                onClick={() => {
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
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Scenario18 = ({
    nativeImplementation,
    resultSpy,
}: {
    nativeImplementation: (...args: Array<any>) => any;
    resultSpy: (...args: Array<any>) => any;
}): JSX.Element => {
    return (
        <>
            <ThemeContextProvider theme={makeTheme()}>
                <SheetRoot nativeImplementation={nativeImplementation} />
            </ThemeContextProvider>
            <button
                onClick={() => {
                    showSheet({
                        type: 'ACTIONS',
                        props: {
                            title: 'Title',
                            button: {text: 'Button'},
                            link: {text: 'Button link'},
                        },
                    }).then(resultSpy);
                }}
            >
                Open sheet
            </button>
        </>
    );
};
export const Invalid = ({mounted}: {mounted: boolean}): JSX.Element => {
    const [error, setError] = React.useState('');
    return (
        <>
            {mounted && <SheetRoot />}
            <button
                onClick={() => {
                    showSheet({
                        type: 'INFO',
                        props: {title: 'Title', items: [{id: '1', title: 'Item 1', icon: {type: 'bullet'}}]},
                    }).catch((error) => setError(error.message));
                }}
            >
                Open sheet
            </button>
            <input type="hidden" data-testid="sheet-error" value={error} />
        </>
    );
};
