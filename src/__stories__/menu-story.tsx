import * as React from 'react';
import {Touchable, Menu, Stack, Inline, Text3, Box, Checkbox, IconKebabMenuLight} from '..';
import SectionTitle from '../section-title';

export default {
    title: 'Components/Controls/Menu',
    component: Menu,
    argTypes: {
        direction: {
            options: ['right', 'left'],
            control: {type: 'select'},
        },
    },
};

const options = [
    {
        text: 'Option 1',
        value: 'option1',
    },
    {
        text: 'Option 2',
        value: 'option2',
    },
    {
        text: 'Option 3 (checking this will close the menu)',
        value: 'option3',
    },
];

type MenuArgs = {
    direction: 'right' | 'left';
};

export const Default: StoryComponent<MenuArgs> = ({direction}) => {
    const [valuesState, setValuesState] = React.useState<ReadonlyArray<string>>([]);

    const setValues = (val: string) => {
        if (valuesState.includes(val)) {
            setValuesState(valuesState.filter((value) => value !== val));
        } else {
            setValuesState([...valuesState, val]);
        }
    };
    return (
        <Stack space={16}>
            <SectionTitle>Menu</SectionTitle>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Menu
                    direction={direction}
                    width={400}
                    renderTarget={({ref, onPress, isMenuOpen}) => (
                        <Touchable elementRef={ref} onPress={onPress} style={{width: 100}}>
                            <Inline space={16}>
                                <IconKebabMenuLight />
                                <Text3 regular>{isMenuOpen ? 'Close' : 'Open'}</Text3>
                            </Inline>
                        </Touchable>
                    )}
                    renderMenu={({ref, className, close}) => (
                        <div ref={ref} className={className}>
                            {options.map((option) => (
                                <Box paddingX={16} paddingY={8} key={option.value}>
                                    <Checkbox
                                        name={option.text}
                                        onChange={() => {
                                            if (option.value === 'option3') {
                                                setTimeout(() => {
                                                    close();
                                                }, 400);
                                            }
                                            setValues(option.value);
                                        }}
                                        checked={valuesState.includes(option.value)}
                                    >
                                        {option.text}
                                    </Checkbox>
                                </Box>
                            ))}
                        </div>
                    )}
                />
            </div>
        </Stack>
    );
};

Default.storyName = 'Menu';
