import * as React from 'react';
import {
    BottomSheet,
    Box,
    ButtonFixedFooterLayout,
    ButtonPrimary,
    ButtonSecondary,
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
import ButtonGroup from '../button-group';

export default {
    title: 'Components/BottomSheet',
    component: BottomSheet,
};

export const Default: StoryComponent = () => {
    const [open, setOpen] = React.useState(false);
    const [fixedFooter, setFixedFooter] = React.useState(false);
    const [counter, setCounter] = React.useState(1);

    const inc = () => setCounter((c) => c + 1);

    return (
        <Box paddingY={24}>
            <ResponsiveLayout>
                <ButtonPrimary
                    disabled={open}
                    onPress={() => {
                        setOpen(true);
                        setFixedFooter(false);
                    }}
                >
                    Open sheet
                </ButtonPrimary>

                <ButtonPrimary
                    disabled={open}
                    onPress={() => {
                        setOpen(true);
                        setFixedFooter(true);
                    }}
                >
                    Open fixed footer sheet
                </ButtonPrimary>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <ButtonPrimary
                    disabled={open}
                    onPress={() => {
                        setOpen(true);
                        setFixedFooter(false);
                    }}
                >
                    Open sheet
                </ButtonPrimary>

                <ButtonPrimary
                    disabled={open}
                    onPress={() => {
                        setOpen(true);
                        setFixedFooter(true);
                    }}
                >
                    Open fixed footer sheet
                </ButtonPrimary>
                <Placeholder />
                <Placeholder />
                <Placeholder />
                <Placeholder />

                {open && (
                    <BottomSheet
                        onClose={() => {
                            setOpen(false);
                            setCounter(1);
                        }}
                    >
                        {({closeModal}) =>
                            fixedFooter ? (
                                <ButtonFixedFooterLayout
                                    button={<ButtonPrimary onPress={closeModal}>Close</ButtonPrimary>}
                                    secondaryButton={
                                        <ButtonSecondary onPress={inc}>More content</ButtonSecondary>
                                    }
                                >
                                    {Array.from({length: counter}).map((_, i) => (
                                        <Placeholder key={i} />
                                    ))}
                                </ButtonFixedFooterLayout>
                            ) : (
                                <ResponsiveLayout>
                                    <Box paddingBottom={16}>
                                        {Array.from({length: counter}).map((_, i) => (
                                            <Placeholder key={i} />
                                        ))}
                                        <ButtonGroup
                                            primaryButton={
                                                <ButtonPrimary onPress={closeModal}>Close</ButtonPrimary>
                                            }
                                            secondaryButton={
                                                <ButtonSecondary onPress={inc}>More content</ButtonSecondary>
                                            }
                                        />
                                    </Box>
                                </ResponsiveLayout>
                            )
                        }
                    </BottomSheet>
                )}
            </ResponsiveLayout>
        </Box>
    );
};

Default.storyName = 'BottomSheet';

export const RadioList: StoryComponent = () => {
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
                        title="Select an fruit"
                        subitile="Subtitle"
                        description="Description"
                        selectedId="2"
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

export const ActionList: StoryComponent = () => {
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
                        title="Title"
                        subitile="Subtitle"
                        description="Description"
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

export const Info: StoryComponent = () => {
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
                        title="Title"
                        subitile="Subtitle"
                        description="Description"
                        items={[
                            {
                                id: '1',
                                title: 'List item',
                                description: 'Description',
                                icon: {type: 'bullet'},
                            },
                            {
                                id: '2',
                                title: 'List item two',
                                description: 'Description',
                                icon: {type: 'regular', Icon: IconCocktailRegular},
                            },
                            {
                                id: '3',
                                title: 'List item three',
                                description: 'Description',
                                icon: {type: 'small', Icon: IconCheckRegular},
                            },
                        ]}
                    />
                )}
            </ResponsiveLayout>
        </Box>
    );
};

Info.storyName = 'InfoBottomSheet';

export const Actions: StoryComponent = () => {
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
                        title="Title"
                        subitile="Subtitle"
                        description={'Description '.repeat(500)}
                        button={{
                            text: 'Button',
                        }}
                        buttonLink={{
                            text: 'Link',
                            withChevron: true,
                        }}
                    />
                )}
            </ResponsiveLayout>
        </Box>
    );
};

Actions.storyName = 'ActionsBottomSheet';
