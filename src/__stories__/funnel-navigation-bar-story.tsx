import * as React from 'react';
import {
    FunnelNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    useScreenSize,
    IconQuestionRegular,
    IconCloseRegular,
    Text2,
    Placeholder,
} from '..';
import {vars} from '../skins/skin-contract.css';

import type {PadSize} from '../box';
import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Navigation bars/FunnelNavigationBar',
    component: FunnelNavigationBar,
    parameters: {
        fullScreen: true,
    },
};

type Args = {
    variant: Variant;
    border: boolean;
    customLogo: boolean;
    wide?: boolean;
    paddingX?: PadSize | 'undefined';
};

export const Default: StoryComponent<Args> = ({variant, border, customLogo, wide, paddingX}) => {
    const {isDesktopOrBigger} = useScreenSize();
    return (
        <FunnelNavigationBar
            withBorder={border}
            variant={variant}
            logo={customLogo ? <Placeholder width={40} height={40} /> : undefined}
            wide={wide ? (paddingX === 'undefined' ? true : {paddingX}) : false}
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
    border: true,
    customLogo: false,
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
