import * as React from 'react';
import {
    FunnelNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    useScreenSize,
    IconQuestionRegular,
    IconCloseRegular,
    Text2,
} from '..';
import {vars} from '../skins/skin-contract.css';

export default {
    title: 'Components/Navigation bars/FunnelNavigationBar',
    component: FunnelNavigationBar,
    parameters: {
        fullScreen: true,
    },
};

type Args = {inverse: boolean};

export const Default: StoryComponent<Args> = ({inverse}) => {
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <FunnelNavigationBar
            isInverse={inverse}
            right={
                <NavigationBarActionGroup>
                    <NavigationBarAction aria-label="need help?" href="/help">
                        <IconQuestionRegular color="currentColor" />
                        {isDesktopOrBigger && (
                            <Text2 regular color={vars.colors.textLink}>
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

Default.storyName = 'FunnelNavigationBar';

Default.args = {
    inverse: false,
};
