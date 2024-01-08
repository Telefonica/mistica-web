import * as React from 'react';
import {
    Avatar,
    Badge,
    IconShoppingCartRegular,
    MainNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
} from '../../..';

const NavigationBarTest = (): JSX.Element => (
    <MainNavigationBar
        sections={['Start', 'Account', 'Explore', 'Support'].map((title) => ({
            title,
            to: `/${title}`,
        }))}
        right={
            <NavigationBarActionGroup>
                <NavigationBarAction onPress={() => {}} aria-label="shopping cart with 2 items">
                    <Badge value={2}>
                        <IconShoppingCartRegular color="currentColor" />
                    </Badge>
                </NavigationBarAction>
                <NavigationBarAction onPress={() => {}} aria-label="Open profile">
                    <Avatar size={24} initials="ML" src="https://source.unsplash.com/600x600/?face" />
                </NavigationBarAction>
            </NavigationBarActionGroup>
        }
    />
);

export default NavigationBarTest;
