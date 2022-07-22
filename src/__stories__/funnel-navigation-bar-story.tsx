import * as React from 'react';
import {
    FunnelNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    useScreenSize,
    IconQuestionRegular,
    IconCloseRegular,
    Text2,
    useTheme,
} from '..';

export default {
    title: 'Components/Navigation bars/Funnel navigation bar',
    component: FunnelNavigationBar,
    parameters: {
        fullScreen: true,
    },
};

type Args = {isInverse: boolean};

export const Default: StoryComponent<Args> = ({isInverse}) => {
    const {colors} = useTheme();
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <FunnelNavigationBar
            isInverse={isInverse}
            right={
                <NavigationBarActionGroup>
                    <NavigationBarAction aria-label="need help?" href="/help">
                        <IconQuestionRegular color="currentColor" />
                        {isDesktopOrBigger && (
                            <Text2 regular color={colors.textLink}>
                                Need help?
                            </Text2>
                        )}
                    </NavigationBarAction>
                    <NavigationBarAction aria-label="exit" onPress={() => {}}>
                        {isDesktopOrBigger && 'Exit'}
                        <IconCloseRegular color="currentColor" />
                    </NavigationBarAction>
                </NavigationBarActionGroup>
            }
        />
    );
};

Default.storyName = 'Funnel navigation bar';

Default.args = {
    isInverse: false,
};
