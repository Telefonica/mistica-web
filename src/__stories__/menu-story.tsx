import * as React from 'react';
import {fruitEntries} from './helpers';
import {Touchable, Menu, Stack, MenuProvider, useMenu} from '..';
import SectionTitle from '../section-title';
import {ButtonPrimary} from '../button';
import {DataCard} from '../card';

export default {
    title: 'Components/Forms/Menu',
    component: Menu,
};

const fruitOptions = fruitEntries.map(([text, value]) => ({text, value}));

const Story: React.FC = () => {
    const {
        isOpen,
        targetProps: {ref: targetRef, onPress: onPressTarget},
        menuProps,
    } = useMenu();

    return (
        <>
            <Touchable elementRef={targetRef} onPress={onPressTarget}>
                <ButtonPrimary fake>{isOpen ? 'Close' : 'Open'}</ButtonPrimary>
            </Touchable>
            <Menu>
                <div {...menuProps}>
                    {fruitOptions.map((item, index) => (
                        <p key={index}>{item.text}</p>
                    ))}
                </div>
            </Menu>
        </>
    );
};

const StoryDataCard: React.FC = () => {
    const {
        isOpen,
        targetProps: {ref: targetRef, onPress: onPressTarget},
        menuProps,
    } = useMenu();

    return (
        <>
            <Touchable elementRef={targetRef} onPress={onPressTarget}>
                <ButtonPrimary fake>{isOpen ? 'Close' : 'Open'}</ButtonPrimary>
            </Touchable>
            <Menu>
                <div {...menuProps}>
                    <DataCard title="Title" description="Description" />
                </div>
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

export const DataCardMenu: StoryComponent = () => (
    <Stack space={16}>
        <SectionTitle>Menu</SectionTitle>
        <MenuProvider>
            <StoryDataCard />
        </MenuProvider>
    </Stack>
);

Default.storyName = 'Menu';
