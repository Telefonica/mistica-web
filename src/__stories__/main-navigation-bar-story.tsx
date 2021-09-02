import * as React from 'react';
import {
    Badge,
    Circle,
    IconShoppingCartRegular,
    MainNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    useScreenSize,
} from '..';

export default {
    title: 'Components/NavigationBar/MainNavigationBar',
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
            right={
                <NavigationBarActionGroup>
                    <NavigationBarAction onPress={() => {}} aria-label="shopping cart with 2 items">
                        <Badge value={2}>
                            <IconShoppingCartRegular color="currentColor" />
                        </Badge>
                    </NavigationBarAction>
                    <NavigationBarAction onPress={() => {}} aria-label="Open profile">
                        <Circle backgroundImage="https://i.pravatar.cc/100?img=31" size={32} />
                        {isDesktopOrBigger && 'María López Serrano'}
                    </NavigationBarAction>
                </NavigationBarActionGroup>
            }
        />
    );
};

Default.storyName = 'MainNavigationBar';

Default.args = {
    isInverse: false,
};
