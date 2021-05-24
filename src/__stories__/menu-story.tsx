import * as React from 'react';
import {fruitEntries} from './helpers';
import {
    Touchable,
    Menu,
    Stack,
    MenuProvider,
    MenuItems,
    MenuItem,
    Box,
    Text3,
    Checkbox,
    MenuTarget,
} from '..';
import SectionTitle from '../section-title';
import {ButtonPrimary} from '../button';

export default {
    title: 'Components/Controls/Menu',
    component: Menu,
};

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));

const Story: React.FC = () => {
    const [valuesState, setValuesState] = React.useState<ReadonlyArray<string>>([]);

    const setValues = (val: string) => {
        if (valuesState.includes(val)) {
            setValuesState(valuesState.filter((value) => value !== val));
        } else {
            setValuesState([...valuesState, val]);
        }
    };

    return (
        <Menu>
            <MenuTarget
                render={({ref, onPress, isMenuOpen}) => (
                    <Touchable elementRef={ref} onPress={onPress} style={{width: 'auto'}}>
                        <ButtonPrimary fake>{isMenuOpen ? 'Close' : 'Open'}</ButtonPrimary>
                    </Touchable>
                )}
            />
            <MenuItems
                items={fruitOptions}
                onSelect={(value) => {
                    setValues(value);
                }}
                renderItem={({text, value}) => (
                    <MenuItem value={value} selected={valuesState.includes(value)}>
                        <Box paddingY={8}>
                            <Text3 medium as="p">
                                <Checkbox checked={valuesState.includes(value)} name={value}>
                                    {text}
                                </Checkbox>
                            </Text3>
                        </Box>
                    </MenuItem>
                )}
            />
        </Menu>
    );
};

export const Default: StoryComponent = () => (
    <Stack space={16}>
        <SectionTitle>Menu</SectionTitle>
        <MenuProvider>
            <Story />
        </MenuProvider>
    </Stack>
);

Default.storyName = 'Menu';
