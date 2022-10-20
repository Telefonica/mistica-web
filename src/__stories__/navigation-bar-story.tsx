import * as React from 'react';
import {
    NavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    useScreenSize,
    IconSearchRegular,
    Avatar,
} from '..';

export default {
    title: 'Components/Navigation bars/Navigation bar',
    component: NavigationBar,
    parameters: {
        fullScreen: true,
    },
};

type Args = {isInverse: boolean; withBorder: boolean};

export const Default: StoryComponent<Args> = ({isInverse, withBorder}) => {
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <NavigationBar
            withBorder={withBorder}
            isInverse={isInverse}
            onBack={() => {}}
            title="Settings"
            right={
                <NavigationBarActionGroup>
                    <NavigationBarAction aria-label="search" onPress={() => {}}>
                        <IconSearchRegular color="currentColor" />
                        {isDesktopOrBigger && 'Search'}
                    </NavigationBarAction>
                </NavigationBarActionGroup>
            }
        />
    );
};

Default.storyName = 'Navigation bar';

Default.args = {
    isInverse: false,
    withBorder: true,
};

export const Custom: StoryComponent<Args> = ({isInverse, withBorder}) => {
    return (
        <NavigationBar
            withBorder={withBorder}
            isInverse={isInverse}
            onBack={() => {}}
            title="Settings"
            right={
                <NavigationBarActionGroup>
                    <Avatar size={32} />
                </NavigationBarActionGroup>
            }
        />
    );
};

Custom.storyName = 'Navigation bar custom right children';

Custom.args = {
    isInverse: false,
    withBorder: true,
};
