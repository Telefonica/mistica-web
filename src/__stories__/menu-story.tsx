import * as React from 'react';
import {fruitEntries} from './helpers';
import {Touchable, Menu, Stack, Inline, Text3, Box, Checkbox, IconKebabMenuLight} from '..';
import SectionTitle from '../section-title';

export default {
    title: 'Components/Controls/Menu',
    component: Menu,
};

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));

export const Default: StoryComponent = () => {
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
            <Menu
                width={200}
                renderTarget={({ref, onPress, isMenuOpen}) => (
                    <Touchable elementRef={ref} onPress={onPress}>
                        <Inline space={16}>
                            <IconKebabMenuLight />
                            <Text3 regular>{isMenuOpen ? 'Close' : 'Open'}</Text3>
                        </Inline>
                    </Touchable>
                )}
                renderMenu={({ref, className}) => (
                    <div ref={ref} className={className}>
                        {fruitOptions.map((fruit) => (
                            <Box paddingX={16} paddingY={8}>
                                <Checkbox
                                    name={fruit.text}
                                    onChange={() => setValues(fruit.value)}
                                    checked={valuesState.includes(fruit.value)}
                                >
                                    {fruit.text}
                                </Checkbox>
                            </Box>
                        ))}
                    </div>
                )}
            />
        </Stack>
    );
};

Default.storyName = 'Menu';
