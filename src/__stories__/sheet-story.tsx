import * as React from 'react';
import {
    Sheet,
    SheetRoot,
    Box,
    ButtonPrimary,
    Inline,
    Placeholder,
    SheetBody,
    showSheet,
    Stack,
    Text2,
    Title1,
    Callout,
    IconInformationRegular,
    ButtonLink,
} from '..';
import avatarImg from './images/avatar.jpg';

export default {
    title: 'Components/Modals/Sheet',
    component: Sheet,
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box paddingY={24} paddingX={16}>
            <Stack space={16}>
                <ButtonPrimary
                    disabled={open}
                    aria-expanded={open}
                    aria-haspopup="dialog"
                    onPress={() => {
                        setOpen(true);
                    }}
                >
                    Open
                </ButtonPrimary>
                <Callout
                    description="Check Sheet component docs for more info."
                    asset={<IconInformationRegular />}
                    buttonLink={
                        <ButtonLink
                            small
                            href="https://github.com/Telefonica/mistica-web/blob/master/doc/sheet.md"
                        >
                            See docs
                        </ButtonLink>
                    }
                />
            </Stack>

            {open && (
                <Sheet
                    onClose={() => {
                        setOpen(false);
                    }}
                >
                    {({modalTitleId}) => (
                        <SheetBody modalTitleId={modalTitleId}>
                            <Box paddingBottom={{mobile: 16, desktop: 0}}>
                                <Placeholder />
                            </Box>
                        </SheetBody>
                    )}
                </Sheet>
            )}
        </Box>
    );
};

Default.storyName = 'Sheet';

type ShowSheetArgs = {
    title: string;
    subtitle: string;
    description: string;
    multiparagraphDescription: boolean;
};

export const ShowSheet: StoryComponent<ShowSheetArgs> = ({
    title,
    subtitle,
    description,
    multiparagraphDescription,
}) => {
    const [response, setResponse] = React.useState<unknown>();
    const [openDialogType, setOpenDialogType] = React.useState<string>();
    return (
        <Box paddingY={24} paddingX={16}>
            <SheetRoot />
            <Stack space={16}>
                <Inline space={16}>
                    <ButtonPrimary
                        aria-haspopup="dialog"
                        aria-expanded={openDialogType === 'INFO'}
                        onPress={() => {
                            setResponse(undefined);
                            setOpenDialogType('INFO');
                            showSheet({
                                type: 'INFO',
                                props: {
                                    title,
                                    subtitle,
                                    description:
                                        description && multiparagraphDescription
                                            ? [description, description]
                                            : description,
                                    items: [
                                        {
                                            id: '1',
                                            title: 'Item 1',
                                            description: 'Description',
                                            icon: {
                                                type: 'bullet',
                                            },
                                        },
                                        {
                                            id: '2',
                                            title: 'Item 2',
                                            description: 'Description',
                                            icon: {
                                                type: 'bullet',
                                            },
                                        },
                                    ],
                                    button: {text: 'Dismiss'},
                                },
                            }).then((response) => {
                                setOpenDialogType(undefined);
                                setResponse(response);
                            });
                        }}
                    >
                        'INFO'
                    </ButtonPrimary>
                    <ButtonPrimary
                        aria-haspopup="dialog"
                        aria-expanded={openDialogType === 'ACTIONS_LIST'}
                        onPress={() => {
                            setResponse(undefined);
                            setOpenDialogType('ACTIONS_LIST');
                            showSheet({
                                type: 'ACTIONS_LIST',
                                props: {
                                    title,
                                    subtitle,
                                    description:
                                        description && multiparagraphDescription
                                            ? [description, description]
                                            : description,
                                    items: [
                                        {
                                            id: '1',
                                            title: 'Action 1',
                                            icon: {
                                                url: avatarImg,
                                            },
                                        },
                                        {
                                            id: '2',
                                            title: 'Destructive',
                                            style: 'destructive',
                                        },
                                    ],
                                },
                            }).then((response) => {
                                setOpenDialogType(undefined);
                                setResponse(response);
                            });
                        }}
                    >
                        'ACTIONS_LIST'
                    </ButtonPrimary>
                    <ButtonPrimary
                        aria-haspopup="dialog"
                        aria-expanded={openDialogType === 'ACTIONS'}
                        onPress={() => {
                            setResponse(undefined);
                            setOpenDialogType('ACTIONS');
                            showSheet({
                                type: 'ACTIONS',
                                props: {
                                    title,
                                    subtitle,
                                    description:
                                        description && multiparagraphDescription
                                            ? [description, description]
                                            : description,
                                    button: {
                                        text: 'Button',
                                    },
                                    link: {
                                        text: 'Link',
                                        withChevron: true,
                                    },
                                },
                            }).then((response) => {
                                setOpenDialogType(undefined);
                                setResponse(response);
                            });
                        }}
                    >
                        'ACTIONS'
                    </ButtonPrimary>
                    <ButtonPrimary
                        aria-haspopup="dialog"
                        aria-expanded={openDialogType === 'RADIO_LIST'}
                        onPress={() => {
                            setResponse(undefined);
                            setOpenDialogType('RADIO_LIST');
                            showSheet({
                                type: 'RADIO_LIST',
                                props: {
                                    title,
                                    subtitle,
                                    description:
                                        description && multiparagraphDescription
                                            ? [description, description]
                                            : description,
                                    selectedId: '1',
                                    items: [
                                        {
                                            id: '1',
                                            title: 'Item 1',
                                            description: 'Description',
                                            icon: {
                                                url: avatarImg,
                                            },
                                        },
                                        {
                                            id: '2',
                                            title: 'Item 2',
                                            description: 'Description',
                                            icon: {
                                                url: 'unknownurl',
                                            },
                                        },
                                    ],
                                },
                            }).then((response) => {
                                setOpenDialogType(undefined);
                                setResponse(response);
                            });
                        }}
                    >
                        'RADIO_LIST'
                    </ButtonPrimary>
                </Inline>
                <Title1>Response:</Title1>
                <Text2 regular as="pre">
                    {JSON.stringify(response, null, 2)}
                </Text2>
            </Stack>
        </Box>
    );
};

ShowSheet.storyName = 'showSheet';
ShowSheet.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    multiparagraphDescription: false,
};
ShowSheet.argTypes = {
    multiparagraphDescription: {
        if: {arg: 'description'},
    },
};
