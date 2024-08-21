import * as React from 'react';
import {
    NavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    useScreenSize,
    IconSearchRegular,
} from '..';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Navigation bars/NavigationBar',
    component: NavigationBar,
    parameters: {
        fullScreen: true,
    },
};

type Args = {variant: Variant; border: boolean};

export const Default: StoryComponent<Args> = ({variant, border}) => {
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <NavigationBar
            withBorder={border}
            variant={variant}
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
    variant: 'default',
    border: true,
};

Default.argTypes = {
    variant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
    },
};
