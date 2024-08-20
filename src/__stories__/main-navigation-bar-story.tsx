import * as React from 'react';
import {
    Avatar,
    Badge,
    IconShoppingCartRegular,
    MainNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    Placeholder,
    useScreenSize,
} from '..';
import avatarImg from './images/avatar.jpg';

export default {
    title: 'Components/Navigation bars/MainNavigationBar',
    component: MainNavigationBar,
    parameters: {
        fullScreen: true,
    },
};

const sectionTitles = ['Start', 'Account', 'Explore', 'Support'];

type Args = {
    inverse: boolean;
    border: boolean;
    burgerMenuExtra: boolean;
    large: boolean;
    sections: boolean;
};

export const Default: StoryComponent<Args> = ({inverse, border, burgerMenuExtra, large, sections}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <MainNavigationBar
            isInverse={inverse}
            large={large}
            withBorder={border}
            burgerMenuExtra={burgerMenuExtra ? <Placeholder /> : undefined}
            sections={
                sections
                    ? sectionTitles.map((title, idx) => ({title, onPress: () => setSelectedIndex(idx)}))
                    : undefined
            }
            selectedIndex={selectedIndex}
            right={
                <NavigationBarActionGroup>
                    <NavigationBarAction onPress={() => {}} aria-label="shopping cart with 2 items">
                        <Badge value={2}>
                            <IconShoppingCartRegular color="currentColor" />
                        </Badge>
                    </NavigationBarAction>
                    <NavigationBarAction onPress={() => {}} aria-label="Open profile">
                        <Avatar src={avatarImg} size={isDesktopOrBigger ? 32 : 24} initials="ML" />
                        {isDesktopOrBigger && 'María López Serrano'}
                    </NavigationBarAction>
                </NavigationBarActionGroup>
            }
        />
    );
};

Default.storyName = 'MainNavigationBar';

Default.args = {
    inverse: false,
    border: true,
    burgerMenuExtra: false,
    large: false,
    sections: true,
};
