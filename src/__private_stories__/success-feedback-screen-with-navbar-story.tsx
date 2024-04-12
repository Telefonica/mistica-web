import * as React from 'react';
import {
    Avatar,
    Badge,
    ButtonPrimary,
    IconShoppingCartRegular,
    MainNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    SuccessFeedbackScreen,
    useScreenSize,
} from '..';

export default {
    title: 'Private/SuccessFeedbackScreenWithNavbar',
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    const {isDesktopOrBigger} = useScreenSize();
    const [index, setIndex] = React.useState(0);
    return (
        <>
            <MainNavigationBar
                isInverse
                sections={['Start', 'Account', 'Explore', 'Support'].map((title, index) => ({
                    title,
                    onPress: () => {
                        setIndex(index);
                    },
                }))}
                selectedIndex={index}
                right={
                    <NavigationBarActionGroup>
                        <NavigationBarAction onPress={() => {}} aria-label="shopping cart with 2 items">
                            <Badge value={2}>
                                <IconShoppingCartRegular color="currentColor" />
                            </Badge>
                        </NavigationBarAction>
                        <NavigationBarAction onPress={() => {}} aria-label="Open profile">
                            <Avatar size={isDesktopOrBigger ? 32 : 24} initials="ML" />
                            {isDesktopOrBigger && 'María López Serrano'}
                        </NavigationBarAction>
                    </NavigationBarActionGroup>
                }
            />

            <SuccessFeedbackScreen
                title="Some title"
                description="Some description text"
                primaryButton={<ButtonPrimary onPress={() => {}}>Action</ButtonPrimary>}
            />
        </>
    );
};

Default.storyName = 'SuccessFeedbackScreen with Navigation Bar';
