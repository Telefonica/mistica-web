import * as React from 'react';
import {
    Box,
    ButtonPrimary,
    Circle,
    IconCheckRegular,
    IconCocktailRegular,
    IconLightningRegular,
    IconMobileDeviceRegular,
    IconTrashCanRegular,
    SheetRoot,
    skinVars,
    Stack,
    Text3,
} from '..';
import RadioListSheet from '../sheet-radio-list';
import InfoSheet from '../sheet-info';
import ActionsSheet from '../sheet-actions';
import ActionsListSheet from '../sheet-actions-list';

export default {
    title: 'Private/Sheet Presets',
    component: SheetRoot,
    parameters: {
        fullScreen: true,
    },
};

type SheetArgs = {
    title: string;
    subtitle: string;
    description: string;
    multiparagraphDescription: boolean;
};

type RadioListSheetArgs = SheetArgs & {
    selectedId: string;
};

export const RadioList: StoryComponent<RadioListSheetArgs> = ({
    title,
    subtitle,
    description,
    multiparagraphDescription,
    selectedId,
}) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
        <Box paddingY={24} paddingX={16}>
            <Stack space={16}>
                <ButtonPrimary
                    disabled={open}
                    aria-expanded={open}
                    aria-haspopup="dialog"
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
                        description && multiparagraphDescription ? [description, description] : description
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
    multiparagraphDescription: false,
    selectedId: 'none',
};
RadioList.argTypes = {
    selectedId: {
        control: {type: 'select'},
        options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'none'],
    },
    multiparagraphDescription: {
        if: {arg: 'description'},
    },
};

export const ActionsList: StoryComponent<SheetArgs> = ({
    title,
    subtitle,
    description,
    multiparagraphDescription,
}) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    return (
        <Box paddingY={24} paddingX={16}>
            <Stack space={16}>
                <ButtonPrimary
                    disabled={open}
                    aria-expanded={open}
                    aria-haspopup="dialog"
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
                        description && multiparagraphDescription ? [description, description] : description
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
    multiparagraphDescription: false,
};
ActionsList.argTypes = {
    multiparagraphDescription: {
        if: {arg: 'description'},
    },
};

type InfoSheetArgs = SheetArgs & {
    numItems: number;
    buttonText: string;
    iconType: 'bullet' | 'regular' | 'small';
};

export const Info: StoryComponent<InfoSheetArgs> = ({
    title,
    subtitle,
    description,
    buttonText,
    multiparagraphDescription,
    numItems,
    iconType,
}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box paddingY={24} paddingX={16}>
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

            {open && (
                <InfoSheet
                    onClose={() => {
                        setOpen(false);
                    }}
                    button={buttonText ? {text: buttonText} : undefined}
                    title={title}
                    subtitle={subtitle}
                    description={
                        description && multiparagraphDescription ? [description, description] : description
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
    buttonText: '',
    description: 'Description',
    numItems: 5,
    iconType: 'bullet',
    multiparagraphDescription: false,
};
Info.argTypes = {
    iconType: {
        control: {type: 'select'},
        options: ['bullet', 'regular', 'small'],
    },
    multiparagraphDescription: {
        if: {arg: 'description'},
    },
};

type ActionsSheetArgs = SheetArgs & {
    buttonText: string;
    secondaryButtonText: string;
    buttonLinkText: string;
    chevron: boolean;
};

export const Actions: StoryComponent<ActionsSheetArgs> = ({
    title,
    subtitle,
    description,
    multiparagraphDescription,
    buttonText,
    secondaryButtonText,
    buttonLinkText,
    chevron,
}) => {
    const [open, setOpen] = React.useState(false);
    const [pressedButton, setPressedButton] = React.useState<string | null>(null);

    return (
        <Box paddingY={24} paddingX={16}>
            <Stack space={16}>
                <ButtonPrimary
                    disabled={open}
                    aria-expanded={open}
                    aria-haspopup="dialog"
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
                        description && multiparagraphDescription ? [description, description] : description
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
                                  withChevron: chevron,
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
    multiparagraphDescription: false,
    buttonText: 'Button',
    secondaryButtonText: 'Secondary button',
    buttonLinkText: 'Link',
    chevron: false,
};
Actions.argTypes = {
    chevron: {
        control: {type: 'boolean'},
        if: {arg: 'buttonLinkText'},
    },
    multiparagraphDescription: {
        if: {arg: 'description'},
    },
};
