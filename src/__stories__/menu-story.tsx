import * as React from 'react';
import {fruitEntries} from './helpers';
import {Touchable, Menu, Stack, Inline, Text3, Box, Checkbox} from '..';
import SectionTitle from '../section-title';
import {ButtonPrimary} from '../button';

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
                renderTarget={({ref, onPress, isMenuOpen}) => (
                    <Touchable elementRef={ref} onPress={onPress} style={{width: 'auto'}}>
                        <ButtonPrimary fake>{isMenuOpen ? 'Close' : 'Open'}</ButtonPrimary>
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
                                    render={(checkboxElement) => (
                                        <Inline alignItems="center" space={16}>
                                            {checkboxElement}
                                            <Text3 regular>{fruit.text}</Text3>
                                        </Inline>
                                    )}
                                />
                            </Box>
                        ))}
                    </div>
                )}
            />
        </Stack>
    );
};

Default.storyName = 'Menu';
