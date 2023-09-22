import * as React from 'react';
import {Touchable, Menu, Stack, Inline, Text3, Box, Checkbox, IconKebabMenuLight, DataCard, Text2} from '..';

export default {
    title: 'Components/Menu',
    component: Menu,
    argTypes: {
        horizontalPosition: {
            options: ['right', 'left'],
            control: {type: 'select'},
        },
        verticalPosition: {
            options: ['top', 'bottom'],
            control: {type: 'select'},
        },
    },
};

type MenuArgs = {
    menuOptionsCount: number;
    horizontalPosition: 'right' | 'left';
    verticalPosition: 'top' | 'bottom';
};

export const Default: StoryComponent<MenuArgs> = ({
    menuOptionsCount,
    horizontalPosition,
    verticalPosition,
}) => {
    const [valuesState, setValuesState] = React.useState<ReadonlyArray<string>>([]);

    const setValues = (val: string) => {
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
                        width={320}
                        renderTarget={({ref, onPress, isMenuOpen}) => (
                            <Touchable
                                ref={ref}
                                onPress={onPress}
                                style={{width: 100}}
                                data-testid="menuTarget"
                            >
                                <Inline space={16}>
                                    <IconKebabMenuLight />
                                    <Text3 regular>{isMenuOpen ? 'Close' : 'Open'}</Text3>
                                </Inline>
                            </Touchable>
                        )}
                        renderMenu={({ref, className, close}) => (
                            <div ref={ref} className={className}>
                                {[...Array(menuOptionsCount).keys()].map((optionIndex) => (
                                    <Box paddingX={16} paddingY={8} key={optionIndex}>
                                        <Checkbox
                                            name={`Option ${optionIndex}`}
                                            onChange={() => {
                                                setValues(`value${optionIndex}`);
                                            }}
                                            checked={valuesState.includes(`value${optionIndex}`)}
                                        >
                                            {`Option ${optionIndex + 1}`}
                                        </Checkbox>
                                    </Box>
                                ))}
                                <Box paddingX={16} paddingY={8} key="closingOption">
                                    <Checkbox
                                        name="closing"
                                        onChange={() => {
                                            setTimeout(() => {
                                                close();
                                            }, 400);

                                            setValues('closing');
                                        }}
                                        checked={valuesState.includes('closing')}
                                    >
                                        Click to close the menu
                                    </Checkbox>
                                </Box>
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
                                        <Box paddingX={16} paddingY={8} key={optionIndex}>
                                            <Text2 regular>{`Option ${optionIndex}`}</Text2>
                                        </Box>
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
