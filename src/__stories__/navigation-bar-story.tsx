import * as React from 'react';
import {
    NavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    useScreenSize,
    IconSearchRegular,
} from '..';

export default {
    title: 'Components/Navigation bars/NavigationBar',
    component: NavigationBar,
    parameters: {
        fullScreen: true,
    },
};

type Args = {isInverse: boolean; withBorder: boolean; withDivider: boolean};

export const Default: StoryComponent<Args> = ({isInverse, withBorder, withDivider}) => {
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <NavigationBar
            withBorder={withBorder}
            withDivider={withDivider}
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

Default.storyName = 'NavigationBar';

Default.args = {
    isInverse: false,
    withBorder: true,
    withDivider: true,
};
