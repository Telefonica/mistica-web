import * as React from 'react';
import {
    NavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    useScreenSize,
    IconSearchRegular,
} from '..';

import type {PadSize} from '../box';
import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Navigation bars/NavigationBar',
    component: NavigationBar,
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    variant: Variant;
    border: boolean;
    wide?: boolean;
    paddingX?: PadSize | 'undefined';
};

export const Default: StoryComponent<Args> = ({variant, border, wide, paddingX}) => {
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <NavigationBar
            withBorder={border}
            variant={variant}
            onBack={() => {}}
            title="Settings"
            wide={wide ? (paddingX === 'undefined' ? true : {paddingX}) : false}
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
    wide: false,
    paddingX: 'undefined',
};

Default.argTypes = {
    variant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
    },
    paddingX: {
        options: ['undefined', 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80],
        control: {type: 'select'},
        if: {arg: 'wide'},
    },
};
