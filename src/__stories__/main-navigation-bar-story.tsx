import * as React from 'react';
import {
    Avatar,
    Badge,
    IconShoppingCartRegular,
    MainNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
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

const sections = ['Start', 'Account', 'Explore', 'Support'];

type Args = {inverse: boolean; withDivider: boolean};

export const Default: StoryComponent<Args> = ({inverse, withDivider}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <MainNavigationBar
            isInverse={inverse}
            withDivider={withDivider}
            sections={sections.map((title, idx) => ({title, onPress: () => setSelectedIndex(idx)}))}
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
    withDivider: true,
};
