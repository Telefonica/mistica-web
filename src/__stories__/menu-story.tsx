import * as React from 'react';
import {fruitEntries} from './helpers';
import {Touchable, Menu, Stack, MenuProvider, useMenu, MenuItems, MenuOption, Box, Text3, Checkbox} from '..';
import SectionTitle from '../section-title';
import {ButtonPrimary} from '../button';

export default {
    title: 'Components/Forms/Menu',
    component: Menu,
};

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));

const Story: React.FC = () => {
    const {
        isOpen,
        closeMenu,
        targetProps: {ref: targetRef, onPress: onPressTarget},
        menuProps,
    } = useMenu();
    const [valuesState, setValuesState] = React.useState<ReadonlyArray<string>>([]);

    const setValues = (val: string) => {
        if (valuesState.includes(val)) {
            setValuesState(valuesState.filter((value) => value !== val));
        } else {
            setValuesState([...valuesState, val]);
        }
    };

    return (
        <>
            <Touchable elementRef={targetRef} onPress={onPressTarget} style={{width: 'auto'}}>
                <ButtonPrimary fake>{isOpen ? 'Close' : 'Open'}</ButtonPrimary>
            </Touchable>

            <Menu>
                <MenuItems
                    menuProps={menuProps}
                    options={fruitOptions}
                    isOpen={isOpen}
                    closeMenu={closeMenu}
                    onItemSelectIndex={(index) => {
                        setValues(fruitOptions[index].value);
                    }}
                    renderOptions={({index, cursorIndex, text, value: val}) => (
                        <MenuOption
                            key={val}
                            value={val}
                            text={text}
                            selected={valuesState.includes(val)}
                            hover={cursorIndex === index}
                            onPress={() => setValues(val)}
                            renderOption={(text, value, selected) => (
                                <Box paddingY={8}>
                                    <Text3 medium as="p">
                                        <Checkbox checked={selected} name={value}>
                                            {text}
                                        </Checkbox>
                                    </Text3>
                                </Box>
                            )}
                        />
                    )}
                />
            </Menu>
        </>
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
