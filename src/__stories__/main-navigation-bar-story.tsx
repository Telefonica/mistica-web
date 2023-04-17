import * as React from 'react';
import {
    Avatar,
    Badge,
    IconShoppingCartRegular,
    Logo,
    MainNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    useScreenSize,
    VivoLogo,
} from '..';

export default {
    title: 'Components/Navigation bars/Main navigation bar',
    component: MainNavigationBar,
    parameters: {
        fullScreen: true,
    },
};

const sections = ['Start', 'Account', 'Explore', 'Support'];

type Args = {isInverse: boolean};

export const Default: StoryComponent<Args> = ({isInverse}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <MainNavigationBar
            isInverse={isInverse}
            sections={sections.map((title, idx) => ({title, onPress: () => setSelectedIndex(idx)}))}
            selectedIndex={selectedIndex}
            // todo WEB-761 more logo controls, like logoType? No explicit logo sample?
            logo={
                <Logo
                    logoType="imagotype"
                    onPress={() => {
                        alert('pressed');
                    }}
                />
            }
            right={
                <NavigationBarActionGroup>
                    <NavigationBarAction onPress={() => {}} aria-label="shopping cart with 2 items">
                        <Badge value={2}>
                            <IconShoppingCartRegular color="currentColor" />
                        </Badge>
                    </NavigationBarAction>
                    <NavigationBarAction onPress={() => {}} aria-label="Open profile">
                        <Avatar
                            src="https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                            size={isDesktopOrBigger ? 32 : 24}
                            initials="ML"
                        />
                        {isDesktopOrBigger && 'María López Serrano'}
                    </NavigationBarAction>
                </NavigationBarActionGroup>
            }
        />
    );
};

Default.storyName = 'Main navigation bar';

Default.args = {
    isInverse: false,
};
