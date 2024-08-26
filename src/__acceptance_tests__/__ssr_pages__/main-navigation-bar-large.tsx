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
        large
        sections={['Start', 'Account', 'Explore', 'Support'].map((title) => ({
            title,
            to: `/${title}`,
        }))}
        logo={<span>LOGO</span>}
        right={
            <NavigationBarActionGroup>
                <NavigationBarAction onPress={() => {}} aria-label="shopping cart with 2 items">
                    <Badge value={2}>
                        <IconShoppingCartRegular color="currentColor" />
                    </Badge>
                </NavigationBarAction>
                <NavigationBarAction onPress={() => {}} aria-label="Open profile">
                    <Avatar size={24} initials="ML" src="avatar.jpg" />
                </NavigationBarAction>
            </NavigationBarActionGroup>
        }
    />
);

export default NavigationBarTest;
