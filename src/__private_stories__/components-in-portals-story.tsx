import * as React from 'react';
import {
    Box,
    ButtonFixedFooterLayout,
    ButtonPrimary,
    Inline,
    MainNavigationBar,
    Popover,
    ResponsiveLayout,
    Select,
    Sheet,
    Stack,
    useDialog,
    SheetBody,
    useSnackbar,
    Text4,
    Placeholder,
    LoadingBar,
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
                        <Popover
                            target={
                                <div style={{display: 'inline-block'}}>
                                    <ButtonPrimary onPress={() => {}} aria-label="popover-button">
                                        Open Popover
                                    </ButtonPrimary>
                                </div>
                            }
                            title="title"
                            description="description"
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
                    onPress={() => openSnackbar({message: 'Snackbar', withDismiss: true, duration: Infinity})}
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
                                border: '1px solid black',
                                display: 'inline-block',
                            }}
                        >
                            <Text4 regular>This content has large z-index value</Text4>
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
                                <SheetBody title="Title" modalTitleId="title">
                                    <Stack space={8}>
                                        <ButtonPrimary
                                            aria-haspopup="dialog"
                                            onPress={dialogButtonOnPress}
                                            aria-label="sheet-dialog-button"
                                        >
                                            Open Dialog
                                        </ButtonPrimary>

                                        <ButtonPrimary
                                            aria-haspopup="dialog"
                                            onPress={() =>
                                                openSnackbar({
                                                    message: 'Snackbar',
                                                    withDismiss: true,
                                                    duration: Infinity,
                                                })
                                            }
                                            aria-label="sheet-snackbar-button"
                                        >
                                            Open snackbar
                                        </ButtonPrimary>

                                        <Select
                                            options={[
                                                {value: 'option 1', text: 'option 1'},
                                                {value: 'option 2', text: 'option 2'},
                                            ]}
                                            label="Select"
                                            name="select"
                                        />
                                    </Stack>{' '}
                                </SheetBody>
                            </Sheet>
                        )}

                        {isDialogSheetOpen && (
                            <Sheet
                                onClose={() => {
                                    setIsDialogSheetOpen(false);
                                }}
                            >
                                <SheetBody title="Title" modalTitleId="title">
                                    <ButtonPrimary
                                        aria-haspopup="dialog"
                                        onPress={() =>
                                            openSnackbar({
                                                message: 'Snackbar',
                                                withDismiss: true,
                                                duration: Infinity,
                                            })
                                        }
                                        aria-label="sheet-snackbar-button"
                                    >
                                        Open snackbar
                                    </ButtonPrimary>{' '}
                                </SheetBody>
                            </Sheet>
                        )}
                    </Stack>
                </Box>
            </ResponsiveLayout>
        </ButtonFixedFooterLayout>
    );
};

Default.storyName = 'Components inside portals';
