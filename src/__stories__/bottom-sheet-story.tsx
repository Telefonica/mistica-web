import * as React from 'react';
import {
    BottomSheet,
    Box,
    ButtonPrimary,
    Circle,
    IconCheckRegular,
    IconCocktailRegular,
    IconLightningRegular,
    IconMobileDeviceRegular,
    IconTrashCanRegular,
    Placeholder,
    ResponsiveLayout,
    skinVars,
    Stack,
    Text3,
} from '..';
import {
    ActionsBottomSheet,
    ActionsListBottomSheet,
    InfoBottomSheet,
    RadioListBottomSheet,
} from '../bottom-sheet';

export default {
    title: 'Components/BottomSheet',
    component: BottomSheet,
};

export const Default: StoryComponent = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <ButtonPrimary
                    disabled={open}
                    onPress={() => {
                        setOpen(true);
                    }}
                >
                    Open sheet
                </ButtonPrimary>

                {open && (
                    <BottomSheet
                        onClose={() => {
                            setOpen(false);
                        }}
                    >
                        {() => (
                            <ResponsiveLayout>
                                <Box
                                    paddingBottom={{mobile: 16, desktop: 40}}
                                    paddingTop={{mobile: 0, desktop: 40}}
                                >
                                    <Placeholder />
                                </Box>
                            </ResponsiveLayout>
                        )}
                    </BottomSheet>
                )}
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'BottomSheet';

type SheetArgs = {
    title: string;
    subtitle: string;
    description: string;
};

type RadioListSheetArgs = SheetArgs & {
    selectedId: string;
};

export const RadioList: StoryComponent<RadioListSheetArgs> = ({title, subtitle, description, selectedId}) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <ButtonPrimary
                        disabled={open}
                        onPress={() => {
                            setOpen(true);
                            setSelected(null);
                        }}
                    >
                        Open sheet
                    </ButtonPrimary>
                    {selected && (
                        <Text3 regular as="p">
                            selectedId: {selected}
                        </Text3>
                    )}
                </Stack>

                {open && (
                    <RadioListBottomSheet
                        onClose={() => {
                            setOpen(false);
                        }}
                        onSelect={(item) => {
                            setSelected(item);
                        }}
                        title={title}
                        subtitle={subtitle}
                        description={description}
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
            </ResponsiveLayout>
        </Box>
    );
};

RadioList.storyName = 'RadioListBottomSheet';
RadioList.args = {
    title: 'Select a fruit',
    subtitle: 'Subtitle',
    description: 'Description',
    selectedId: 'none',
};
RadioList.argTypes = {
    selectedId: {
        control: {type: 'select'},
        options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none'],
    },
};

export const ActionList: StoryComponent<SheetArgs> = ({title, subtitle, description}) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <ButtonPrimary
                        disabled={open}
                        onPress={() => {
                            setOpen(true);
                            setSelected(null);
                        }}
                    >
                        Open sheet
                    </ButtonPrimary>
                    {selected && (
                        <Text3 regular as="p">
                            selectedId: {selected}
                        </Text3>
                    )}
                </Stack>

                {open && (
                    <ActionsListBottomSheet
                        onClose={() => {
                            setOpen(false);
                        }}
                        onSelect={(item) => {
                            setSelected(item);
                        }}
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        items={[
                            {
                                id: '1',
                                title: 'Action one',
                                Icon: IconLightningRegular,
                            },
                            {
                                id: '2',
                                title: 'Action two',
                                Icon: IconLightningRegular,
                            },
                            {
                                id: '3',
                                title: 'Action without icon',
                            },
                            {
                                id: '4',
                                title: 'Destructive action',
                                style: 'destructive',
                                Icon: IconTrashCanRegular,
                            },
                        ]}
                    />
                )}
            </ResponsiveLayout>
        </Box>
    );
};

ActionList.storyName = 'ActionListBottomSheet';
ActionList.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
};

type InfoSheetArgs = SheetArgs & {
    numItems: number;
    iconType: 'bullet' | 'regular' | 'small';
};

export const Info: StoryComponent<InfoSheetArgs> = ({title, subtitle, description, numItems, iconType}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <ButtonPrimary
                    disabled={open}
                    onPress={() => {
                        setOpen(true);
                    }}
                >
                    Open sheet
                </ButtonPrimary>

                {open && (
                    <InfoBottomSheet
                        onClose={() => {
                            setOpen(false);
                        }}
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        items={Array.from({length: numItems}, (_, idx) => ({
                            id: String(idx),
                            title: 'Item ' + idx,
                            description: 'Description',
                            icon: {
                                type: iconType,
                                Icon: {
                                    regular: IconCocktailRegular,
                                    small: IconCheckRegular,
                                    bullet: undefined as never,
                                }[iconType],
                            },
                        }))}
                    />
                )}
            </ResponsiveLayout>
        </Box>
    );
};

Info.storyName = 'InfoBottomSheet';
Info.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    numItems: 5,
    iconType: 'bullet',
};
Info.argTypes = {
    iconType: {
        control: {type: 'select'},
        options: ['bullet', 'regular', 'small'],
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
    buttonText,
    secondaryButtonText,
    buttonLinkText,
    withChevron,
}) => {
    const [open, setOpen] = React.useState(false);
    const [pressedButton, setPressedButton] = React.useState<string | null>(null);

    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <Stack space={16}>
                    <ButtonPrimary
                        disabled={open}
                        onPress={() => {
                            setOpen(true);
                            setPressedButton(null);
                        }}
                    >
                        Open sheet
                    </ButtonPrimary>
                    {pressedButton && (
                        <Text3 regular as="p">
                            pressedButton: {pressedButton}
                        </Text3>
                    )}
                </Stack>

                {open && (
                    <ActionsBottomSheet
                        onClose={() => {
                            setOpen(false);
                        }}
                        onPressButton={setPressedButton}
                        title={title}
                        subtitle={subtitle}
                        description={description}
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
            </ResponsiveLayout>
        </Box>
    );
};

Actions.storyName = 'ActionsBottomSheet';
Actions.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
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
};
