import * as React from 'react';
import {
    Sheet,
    SheetRoot,
    Box,
    ButtonPrimary,
    Circle,
    IconCheckRegular,
    IconCocktailRegular,
    IconLightningRegular,
    IconMobileDeviceRegular,
    IconTrashCanRegular,
    Inline,
    Placeholder,
    ResponsiveLayout,
    showSheet,
    skinVars,
    Stack,
    Text2,
    Text3,
    Title1,
    Callout,
    IconInformationRegular,
    ButtonLink,
} from '..';
import {ActionsSheet, ActionsListSheet, InfoSheet, RadioListSheet} from '../sheet';
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
                    onPress={() => {
                        setOpen(true);
                    }}
                >
                    Open
                </ButtonPrimary>
                <Callout
                    description="Check Sheet component docs for more info."
                    icon={<IconInformationRegular />}
                    buttonLink={
                        <ButtonLink href="https://github.com/Telefonica/mistica-web/blob/master/doc/sheet.md">
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
                    <ResponsiveLayout>
                        <Box paddingBottom={{mobile: 16, desktop: 40}} paddingTop={{mobile: 0, desktop: 40}}>
                            <Placeholder />
                        </Box>
                    </ResponsiveLayout>
                </Sheet>
            )}
        </Box>
    );
};

Default.storyName = 'Sheet';

type SheetArgs = {
    title: string;
    subtitle: string;
    description: string;
    multilineDescription: boolean;
};

type RadioListSheetArgs = SheetArgs & {
    selectedId: string;
};

export const RadioList: StoryComponent<RadioListSheetArgs> = ({
    title,
    subtitle,
    description,
    multilineDescription,
    selectedId,
}) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
        <Box paddingY={24} paddingX={16}>
            <Stack space={16}>
                <ButtonPrimary
                    disabled={open}
                    onPress={() => {
                        setOpen(true);
                        setSelected(null);
                    }}
                >
                    Open
                </ButtonPrimary>
                {selected && (
                    <Text3 regular as="p">
                        selectedId: {selected}
                    </Text3>
                )}
            </Stack>

            {open && (
                <RadioListSheet
                    onClose={() => {
                        setOpen(false);
                    }}
                    onSelect={(item) => {
                        setSelected(item);
                    }}
                    title={title}
                    subtitle={subtitle}
                    description={
                        description && multilineDescription ? [description, description] : description
                    }
                    selectedId={selectedId === 'none' ? undefined : selectedId}
                    items={[
                        'Apple',
                        'Banana',
                        'Pineapple',
                        'Mango',
                        'Peach',
                        'Pear',
                        'Strawberry',
                        'Watermelon',
                        'Kiwi',
                        'Cherry',
                        'Grape',
                        'Lemon',
                        'Lime',
                    ].map((fruit, idx) => ({
                        id: String(idx),
                        title: fruit,
                        description: 'Description',
                        asset: (
                            <Circle backgroundColor={skinVars.colors.brandLow} size={40}>
                                <IconMobileDeviceRegular color={skinVars.colors.brand} />
                            </Circle>
                        ),
                    }))}
                />
            )}
        </Box>
    );
};

RadioList.storyName = 'RadioListSheet';
RadioList.args = {
    title: 'Select a fruit',
    subtitle: 'Subtitle',
    description: 'Description',
    multilineDescription: false,
    selectedId: 'none',
};
RadioList.argTypes = {
    selectedId: {
        control: {type: 'select'},
        options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none'],
    },
    multilineDescription: {
        if: {arg: 'description'},
    },
};

export const ActionsList: StoryComponent<SheetArgs> = ({
    title,
    subtitle,
    description,
    multilineDescription,
}) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
        <Box paddingY={24} paddingX={16}>
            <Stack space={16}>
                <ButtonPrimary
                    disabled={open}
                    onPress={() => {
                        setOpen(true);
                        setSelected(null);
                    }}
                >
                    Open
                </ButtonPrimary>
                {selected && (
                    <Text3 regular as="p">
                        selectedId: {selected}
                    </Text3>
                )}
            </Stack>

            {open && (
                <ActionsListSheet
                    onClose={() => {
                        setOpen(false);
                    }}
                    onSelect={(item) => {
                        setSelected(item);
                    }}
                    title={title}
                    subtitle={subtitle}
                    description={
                        description && multilineDescription ? [description, description] : description
                    }
                    items={[
                        {
                            id: '1',
                            title: 'Action with icon',
                            icon: {
                                Icon: IconLightningRegular,
                            },
                        },
                        {
                            id: '2',
                            title: 'Action without icon',
                        },
                        {
                            id: '3',
                            title: 'Destructive action',
                            style: 'destructive',
                            icon: {
                                Icon: IconTrashCanRegular,
                            },
                        },
                    ]}
                />
            )}
        </Box>
    );
};

ActionsList.storyName = 'ActionsListSheet';
ActionsList.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    multilineDescription: false,
};
ActionsList.argTypes = {
    multilineDescription: {
        if: {arg: 'description'},
    },
};

type InfoSheetArgs = SheetArgs & {
    numItems: number;
    iconType: 'bullet' | 'regular' | 'small';
};

export const Info: StoryComponent<InfoSheetArgs> = ({
    title,
    subtitle,
    description,
    multilineDescription,
    numItems,
    iconType,
}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box paddingY={24} paddingX={16}>
            <ButtonPrimary
                disabled={open}
                onPress={() => {
                    setOpen(true);
                }}
            >
                Open
            </ButtonPrimary>

            {open && (
                <InfoSheet
                    onClose={() => {
                        setOpen(false);
                    }}
                    title={title}
                    subtitle={subtitle}
                    description={
                        description && multilineDescription ? [description, description] : description
                    }
                    items={Array.from({length: numItems}, (_, idx) => ({
                        id: String(idx),
                        title: 'Item ' + idx,
                        description: 'Description',
                        icon:
                            iconType === 'bullet'
                                ? {type: 'bullet'}
                                : {
                                      type: iconType,
                                      Icon: {
                                          regular: IconCocktailRegular,
                                          small: IconCheckRegular,
                                      }[iconType],
                                  },
                    }))}
                />
            )}
        </Box>
    );
};

Info.storyName = 'InfoSheet';
Info.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    numItems: 5,
    iconType: 'bullet',
    multilineDescription: false,
};
Info.argTypes = {
    iconType: {
        control: {type: 'select'},
        options: ['bullet', 'regular', 'small'],
    },
    multilineDescription: {
        if: {arg: 'description'},
    },
};

type ActionsSheetArgs = SheetArgs & {
    buttonText: string;
    secondaryButtonText: string;
    buttonLinkText: string;
    withChevron: boolean;
};

export const Actions: StoryComponent<ActionsSheetArgs> = ({
    title,
    subtitle,
    description,
    multilineDescription,
    buttonText,
    secondaryButtonText,
    buttonLinkText,
    withChevron,
}) => {
    const [open, setOpen] = React.useState(false);
    const [pressedButton, setPressedButton] = React.useState<string | null>(null);

    return (
        <Box paddingY={24} paddingX={16}>
            <Stack space={16}>
                <ButtonPrimary
                    disabled={open}
                    onPress={() => {
                        setOpen(true);
                        setPressedButton(null);
                    }}
                >
                    Open
                </ButtonPrimary>
                {pressedButton && (
                    <Text3 regular as="p">
                        pressedButton: {pressedButton}
                    </Text3>
                )}
            </Stack>

            {open && (
                <ActionsSheet
                    onClose={() => {
                        setOpen(false);
                    }}
                    onPressButton={setPressedButton}
                    title={title}
                    subtitle={subtitle}
                    description={
                        description && multilineDescription ? [description, description] : description
                    }
                    button={{
                        text: buttonText,
                    }}
                    secondaryButton={
                        secondaryButtonText
                            ? {
                                  text: secondaryButtonText,
                              }
                            : undefined
                    }
                    buttonLink={
                        buttonLinkText
                            ? {
                                  text: buttonLinkText,
                                  withChevron,
                              }
                            : undefined
                    }
                />
            )}
        </Box>
    );
};

Actions.storyName = 'ActionsSheet';
Actions.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    multilineDescription: false,
    buttonText: 'Button',
    secondaryButtonText: 'Secondary button',
    buttonLinkText: 'Link',
    withChevron: false,
};
Actions.argTypes = {
    withChevron: {
        control: {type: 'boolean'},
        if: {arg: 'buttonLinkText'},
    },
    multilineDescription: {
        if: {arg: 'description'},
    },
};

type RootArgs = {
    title: string;
    subtitle: string;
    description: string;
    multilineDescription: boolean;
};

export const Root: StoryComponent<RootArgs> = ({title, subtitle, description, multilineDescription}) => {
    const [response, setResponse] = React.useState<unknown>();
    return (
        <Box paddingY={24} paddingX={16}>
            <SheetRoot />
            <Stack space={16}>
                <Inline space={16}>
                    <ButtonPrimary
                        onPress={() => {
                            setResponse(undefined);
                            showSheet({
                                type: 'INFO',
                                props: {
                                    title,
                                    subtitle,
                                    description:
                                        description && multilineDescription
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
                                },
                            }).then(setResponse);
                        }}
                    >
                        'INFO'
                    </ButtonPrimary>
                    <ButtonPrimary
                        onPress={() => {
                            setResponse(undefined);
                            showSheet({
                                type: 'ACTIONS_LIST',
                                props: {
                                    title,
                                    subtitle,
                                    description:
                                        description && multilineDescription
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
                            }).then(setResponse);
                        }}
                    >
                        'ACTIONS_LIST'
                    </ButtonPrimary>
                    <ButtonPrimary
                        onPress={() => {
                            setResponse(undefined);
                            showSheet({
                                type: 'ACTIONS',
                                props: {
                                    title,
                                    subtitle,
                                    description:
                                        description && multilineDescription
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
                            }).then(setResponse);
                        }}
                    >
                        'ACTIONS'
                    </ButtonPrimary>
                    <ButtonPrimary
                        onPress={() => {
                            setResponse(undefined);
                            showSheet({
                                type: 'RADIO_LIST',
                                props: {
                                    title,
                                    subtitle,
                                    description:
                                        description && multilineDescription
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
                            }).then(setResponse);
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

Root.storyName = 'SheetRoot';
Root.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    multilineDescription: false,
};
Root.argTypes = {
    multilineDescription: {
        if: {arg: 'description'},
    },
};
