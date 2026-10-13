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
    Image,
    MenuSection,
    useDialog,
} from '..';
import avatarImg from './images/avatar.jpg';

import type {MenuProps} from '../menu';

export default {
    title: 'Components/Menu',
    component: Menu,
};

type MenuArgs = {
    menuOptionsCount: number;
    horizontalPosition: 'right' | 'left' | 'center';
    verticalPosition: 'top' | 'bottom' | 'center';
    placement: MenuProps['placement'] | 'default';
    alignment: MenuProps['alignment'] | 'default';
    width: MenuProps['width'];
    icon: boolean;
    asset: boolean;
    checkbox: boolean;
    description: boolean;
};

export const Default: StoryComponent<MenuArgs> = ({
    menuOptionsCount,
    horizontalPosition,
    verticalPosition,
    placement,
    alignment,
    width,
    icon,
    asset,
    checkbox,
    description,
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
                justifyContent:
                    verticalPosition === 'top' ? 'initial' : verticalPosition === 'bottom' ? 'end' : 'center',
            }}
        >
            <Stack space={16}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent:
                            horizontalPosition === 'left'
                                ? 'initial'
                                : horizontalPosition === 'right'
                                  ? 'end'
                                  : 'center',
                    }}
                >
                    <Menu
                        placement={placement === 'default' ? undefined : placement}
                        alignment={
                            alignment === 'default'
                                ? undefined
                                : alignment ?? (horizontalPosition === 'right' ? 'end' : 'start')
                        }
                        width={width}
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
                                            description={
                                                description
                                                    ? `Description for option ${optionIndex + 1}`
                                                    : undefined
                                            }
                                            onPress={() => {
                                                if (checkbox) {
                                                    setValues(optionIndex);
                                                } else {
                                                    alert({
                                                        title: `Item ${optionIndex + 1}`,
                                                        message: 'pressed',
                                                    });
                                                }
                                            }}
                                            {...(checkbox && {
                                                controlType: 'checkbox' as const,
                                                checked: valuesState.includes(optionIndex),
                                            })}
                                            Icon={icon ? IconLightningRegular : undefined}
                                            asset={
                                                asset ? (
                                                    <Image src={avatarImg} width={40} aspectRatio="1:1" />
                                                ) : undefined
                                            }
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
    placement: 'bottom',
    alignment: undefined,
    width: 280,
    icon: false,
    asset: false,
    checkbox: true,
    description: false,
};
Default.argTypes = {
    width: {control: {type: 'number'}},
    placement: {
        options: ['default', 'top', 'bottom', 'left', 'right'],
        control: {type: 'select'},
    },
    alignment: {
        options: ['default', 'start', 'middle', 'end'],
        control: {type: 'select'},
    },
    horizontalPosition: {
        options: ['right', 'left', 'center'],
        control: {type: 'select'},
    },
    verticalPosition: {
        options: ['top', 'bottom', 'center'],
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
                slot={
                    <div style={{display: 'flex', justifyContent: 'right'}}>
                        <Menu
                            position="right"
                            width={200}
                            renderTarget={({ref, onPress}) => (
                                <Touchable
                                    ref={ref}
                                    onPress={onPress}
                                    data-testid="menuTarget"
                                    aria-label="Menu"
                                >
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
                                            onPress={() => {}}
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
