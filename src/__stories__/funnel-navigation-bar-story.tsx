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

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Navigation bars/FunnelNavigationBar',
    component: FunnelNavigationBar,
    parameters: {
        fullScreen: true,
    },
};

type Args = {variant: Variant; withBorder: boolean};

export const Default: StoryComponent<Args> = ({variant, withBorder}) => {
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <FunnelNavigationBar
            withBorder={withBorder}
            variant={variant}
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
    variant: 'default',
    withBorder: true,
};

Default.argTypes = {
    variant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
    },
};
