import * as React from 'react';
import {
    Touchable,
    Menu,
    Stack,
    Inline,
    Text3,
    IconKebabMenuLight,
    DataCard,
    Text2,
    MenuItem,
    IconLightningRegular,
    MenuSection,
    useDialog,
} from '..';

export default {
    title: 'Components/Menu',
    component: Menu,
};

type MenuArgs = {
    menuOptionsCount: number;
    horizontalPosition: 'right' | 'left';
    verticalPosition: 'top' | 'bottom';
    icon: boolean;
    checkbox: boolean;
};

export const Default: StoryComponent<MenuArgs> = ({
    menuOptionsCount,
    horizontalPosition,
    verticalPosition,
    icon,
    checkbox,
}) => {
    const {alert} = useDialog();
    const [valuesState, setValuesState] = React.useState<ReadonlyArray<number>>([]);

    const setValues = (val: number) => {
        if (valuesState.includes(val)) {
            setValuesState(valuesState.filter((value) => value !== val));
        } else {
            setValuesState([...valuesState, val]);
        }
    };

    return (
        <div
            style={{
                height: 'calc(100vh - 32px)',
                minHeight: '600px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: verticalPosition === 'top' ? 'initial' : 'end',
            }}
        >
            <Stack space={16}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: horizontalPosition === 'left' ? 'initial' : 'end',
                    }}
                >
                    <Menu
                        position={horizontalPosition}
                        width={280}
                        renderTarget={({ref, onPress, isMenuOpen}) => (
                            <Touchable
                                ref={ref}
                                onPress={onPress}
                                style={{width: 'fit-content'}}
                                data-testid="menuTarget"
                            >
                                <Inline space={16} alignItems="center">
                                    <IconKebabMenuLight />
                                    <Text3 regular>{isMenuOpen ? 'Close' : 'Open'}</Text3>
                                </Inline>
                            </Touchable>
                        )}
                        renderMenu={({ref, className}) => (
                            <div ref={ref} className={className}>
                                <MenuSection>
                                    {[...Array(menuOptionsCount).keys()].map((optionIndex) => (
                                        <MenuItem
                                            key={optionIndex}
                                            label={`Option ${optionIndex + 1}`}
                                            onPress={(item) => {
                                                if (checkbox) {
                                                    setValues(item);
                                                } else {
                                                    alert({title: `Item ${item + 1}`, message: 'pressed'});
                                                }
                                            }}
                                            {...(checkbox && {
                                                controlType: 'checkbox' as const,
                                                checked: valuesState.includes(optionIndex),
                                            })}
                                            Icon={icon ? IconLightningRegular : undefined}
                                        />
                                    ))}
                                </MenuSection>
                                <MenuSection>
                                    <MenuItem
                                        key="closingOption"
                                        label="Click to close the menu"
                                        onPress={() => {}}
                                        destructive
                                    />
                                </MenuSection>
                            </div>
                        )}
                    />
                </div>
            </Stack>
        </div>
    );
};

Default.storyName = 'Menu';
Default.args = {
    menuOptionsCount: 4,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    icon: false,
    checkbox: true,
};
Default.argTypes = {
    horizontalPosition: {
        options: ['right', 'left'],
        control: {type: 'select'},
    },
    verticalPosition: {
        options: ['top', 'bottom'],
        control: {type: 'select'},
    },
    menuOptionsCount: {
        control: {type: 'range', min: 1, max: 30, step: 1},
    },
};

export const InsideCard: StoryComponent = () => {
    return (
        <Stack space={16}>
            <Text2 regular>
                Example of a menu being rendered inside a data card. This story is used to check that the menu
                can be rendered inside a div having overflow: hidden
            </Text2>
            <DataCard
                title="Data card"
                extra={
                    <div style={{display: 'flex', justifyContent: 'right'}}>
                        <Menu
                            position="right"
                            width={200}
                            renderTarget={({ref, onPress}) => (
                                <Touchable ref={ref} onPress={onPress} data-testid="menuTarget">
                                    <Inline space={16}>
                                        <IconKebabMenuLight />
                                    </Inline>
                                </Touchable>
                            )}
                            renderMenu={({ref, className}) => (
                                <div ref={ref} className={className}>
                                    {[...Array(3).keys()].map((optionIndex) => (
                                        <MenuItem
                                            key={optionIndex + 1}
                                            label={`Option ${optionIndex + 1}`}
                                            onPress={() => null}
                                        />
                                    ))}
                                </div>
                            )}
                        />
                    </div>
                }
            />
        </Stack>
    );
};

InsideCard.storyName = 'Menu inside a card';
