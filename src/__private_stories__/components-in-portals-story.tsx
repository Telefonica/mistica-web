import * as React from 'react';
import {
    Box,
    ButtonFixedFooterLayout,
    ButtonPrimary,
    Inline,
    MainNavigationBar,
    MenuItem,
    ResponsiveLayout,
    Select,
    Sheet,
    Stack,
    useDialog,
    SheetBody,
    useSnackbar,
    Placeholder,
    LoadingBar,
    Callout,
    Menu,
} from '..';

export default {
    title: 'Private/Components inside portals',
    parameters: {fullScreen: true},
};

export const Default: StoryComponent = () => {
    const {dialog} = useDialog();
    const {openSnackbar} = useSnackbar();
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);
    const [isDialogSheetOpen, setIsDialogSheetOpen] = React.useState(false);

    const dialogButtonOnPress = () => {
        dialog({
            title: 'Title',
            message: 'Message',
            extra: (
                <Stack space={8}>
                    <Inline space={8}>
                        <Menu
                            renderTarget={({ref, onPress}) => (
                                <ButtonPrimary onPress={onPress} ref={ref} aria-label="dialog-menu-button">
                                    Open Menu
                                </ButtonPrimary>
                            )}
                            renderMenu={({ref, className}) => (
                                <div ref={ref} className={className}>
                                    <MenuItem key="option 1" label="Option 1" onPress={() => {}} />
                                    <MenuItem key="option 2" label="Option 2" onPress={() => {}} />
                                </div>
                            )}
                        />

                        <ButtonPrimary
                            onPress={() => setIsDialogSheetOpen(true)}
                            aria-label="dialog-sheet-button"
                        >
                            Open sheet
                        </ButtonPrimary>
                    </Inline>
                    <Select
                        options={[
                            {value: 'option 1', text: 'option 1'},
                            {value: 'option 2', text: 'option 2'},
                        ]}
                        label="Select"
                        name="select"
                    />
                </Stack>
            ),
        });
    };

    return (
        <ButtonFixedFooterLayout
            button={
                <ButtonPrimary
                    aria-haspopup="dialog"
                    onPress={() =>
                        openSnackbar({message: 'Snackbar', withDismiss: true, duration: 'PERSISTENT'})
                    }
                    aria-label="snackbar-button"
                >
                    Open snackbar
                </ButtonPrimary>
            }
        >
            <LoadingBar visible />
            <MainNavigationBar
                sections={[
                    {title: 'Section 1', onPress: () => {}},
                    {title: 'Section 2', onPress: () => {}},
                    {title: 'Section 3', onPress: () => {}},
                ]}
            />
            <ResponsiveLayout>
                <Box paddingY={16}>
                    <Stack space={16}>
                        <ButtonPrimary
                            aria-haspopup="dialog"
                            onPress={dialogButtonOnPress}
                            aria-label="dialog-button"
                        >
                            Open Dialog
                        </ButtonPrimary>

                        <ButtonPrimary
                            aria-haspopup="dialog"
                            onPress={() => setIsSheetOpen(true)}
                            aria-label="sheet-button"
                        >
                            Open Sheet
                        </ButtonPrimary>

                        <div
                            style={{
                                position: 'relative',
                                zIndex: 5,
                            }}
                        >
                            <Callout title="This content has large z-index value" description="" />
                        </div>

                        <Placeholder />
                        <Placeholder />
                        <Placeholder />
                        <Placeholder />
                        <Placeholder />

                        {isSheetOpen && (
                            <Sheet
                                onClose={() => {
                                    setIsSheetOpen(false);
                                }}
                            >
                                {({closeModal, modalTitleId}) => (
                                    <SheetBody title="Title" modalTitleId={modalTitleId}>
                                        <Box paddingBottom={{desktop: 0, mobile: 16}}>
                                            <Stack space={8}>
                                                <ButtonPrimary
                                                    aria-haspopup="dialog"
                                                    onPress={dialogButtonOnPress}
                                                    aria-label="sheet-dialog-button"
                                                >
                                                    Open Dialog
                                                </ButtonPrimary>

                                                <ButtonPrimary
                                                    onPress={closeModal}
                                                    aria-label="sheet-close-button"
                                                >
                                                    Close sheet
                                                </ButtonPrimary>

                                                <Select
                                                    options={[
                                                        {value: 'option 1', text: 'option 1'},
                                                        {value: 'option 2', text: 'option 2'},
                                                    ]}
                                                    label="Select"
                                                    name="select"
                                                />

                                                <ButtonPrimary
                                                    aria-haspopup="dialog"
                                                    onPress={() =>
                                                        openSnackbar({
                                                            message: 'Snackbar',
                                                            withDismiss: true,
                                                            duration: 'PERSISTENT',
                                                        })
                                                    }
                                                    aria-label="sheet-snackbar-button"
                                                >
                                                    Open snackbar
                                                </ButtonPrimary>
                                            </Stack>
                                        </Box>
                                    </SheetBody>
                                )}
                            </Sheet>
                        )}

                        {isDialogSheetOpen && (
                            <Sheet
                                onClose={() => {
                                    setIsDialogSheetOpen(false);
                                }}
                            >
                                {({closeModal, modalTitleId}) => (
                                    <SheetBody title="Title" modalTitleId={modalTitleId}>
                                        <Box paddingBottom={{desktop: 0, mobile: 16}}>
                                            <Stack space={8}>
                                                <ButtonPrimary
                                                    onPress={closeModal}
                                                    aria-label="sheet-close-button"
                                                >
                                                    Close sheet
                                                </ButtonPrimary>

                                                <ButtonPrimary
                                                    aria-haspopup="dialog"
                                                    onPress={() =>
                                                        openSnackbar({
                                                            message: 'Snackbar',
                                                            withDismiss: true,
                                                            duration: 'PERSISTENT',
                                                        })
                                                    }
                                                    aria-label="sheet-snackbar-button"
                                                >
                                                    Open snackbar
                                                </ButtonPrimary>
                                            </Stack>
                                        </Box>
                                    </SheetBody>
                                )}
                            </Sheet>
                        )}
                    </Stack>
                </Box>
            </ResponsiveLayout>
        </ButtonFixedFooterLayout>
    );
};

Default.storyName = 'Components inside portals';
