import * as React from 'react';
import {
    Avatar,
    Badge,
    IconShoppingCartRegular,
    MainNavigationBar,
    NavigationBarAction,
    NavigationBarActionGroup,
    Placeholder,
    Stack,
    Text3,
    useScreenSize,
} from '..';
import avatarImg from './images/avatar.jpg';

import type {Variant} from '../theme-variant-context';

export default {
    title: 'Components/Navigation bars/MainNavigationBar',
    component: MainNavigationBar,
    parameters: {
        fullScreen: true,
    },
};

const sectionTitles = ['Start', 'Account', 'Explore', 'Support'] as const;

type Args = {
    variant: Variant;
    border: boolean;
    burgerMenuExtra: boolean;
    large: boolean;
    sections: boolean;
    menu: 'undefined' | 'default' | 'custom';
    desktopSmallMenu: boolean;
};

export const Default: StoryComponent<Args> = ({
    variant,
    border,
    burgerMenuExtra,
    large,
    sections,
    menu,
    desktopSmallMenu,
}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const {isDesktopOrBigger} = useScreenSize();

    const sectionDefaultMenuItemsCount = {
        Start: 3,
        Account: 1,
        Explore: 2,
        Support: 3,
    };

    return (
        <MainNavigationBar
            variant={variant}
            large={large}
            withBorder={border}
            burgerMenuExtra={burgerMenuExtra ? <Placeholder /> : undefined}
            desktopSmallMenu={desktopSmallMenu}
            sections={
                sections
                    ? sectionTitles.map((title, idx) => ({
                          title,
                          onPress: () => setSelectedIndex(idx),
                          menu:
                              menu === 'undefined'
                                  ? undefined
                                  : menu === 'default'
                                    ? {
                                          title: `${title} menu`,
                                          columns: Array.from(
                                              {length: desktopSmallMenu ? 1 : 2},
                                              (_, columnIndex) => ({
                                                  title: `${title} ${columnIndex + 1}`,
                                                  items: Array.from(
                                                      {length: sectionDefaultMenuItemsCount[title]},
                                                      (_, index) => ({
                                                          title: `item ${index + 1}`,
                                                          onPress: () => {},
                                                      })
                                                  ),
                                              })
                                          ),
                                      }
                                    : {
                                          content: (
                                              <Stack space={16}>
                                                  <Text3 regular>{title} menu</Text3>
                                                  {Array.from(
                                                      {length: sectionDefaultMenuItemsCount[title]},
                                                      (_, index) => (
                                                          <Placeholder key={index} />
                                                      )
                                                  )}
                                              </Stack>
                                          ),
                                      },
                      }))
                    : undefined
            }
            selectedIndex={selectedIndex}
            right={
                <NavigationBarActionGroup>
                    <NavigationBarAction onPress={() => {}} aria-label="shopping cart with 2 items">
                        <Badge value={2}>
                            <IconShoppingCartRegular color="currentColor" />
                        </Badge>
                    </NavigationBarAction>
                    <NavigationBarAction onPress={() => {}} aria-label="Open profile">
                        <Avatar src={avatarImg} size={isDesktopOrBigger ? 32 : 24} initials="ML" />
                        {isDesktopOrBigger && 'María López Serrano'}
                    </NavigationBarAction>
                </NavigationBarActionGroup>
            }
        />
    );
};

Default.storyName = 'MainNavigationBar';

Default.args = {
    variant: 'default',
    border: true,
    burgerMenuExtra: false,
    large: false,
    sections: true,
    menu: 'undefined',
    desktopSmallMenu: false,
};

Default.argTypes = {
    variant: {
        options: ['default', 'inverse', 'alternative'],
        control: {type: 'select'},
    },
    menu: {
        options: ['undefined', 'default', 'custom'],
        control: {type: 'select'},
        if: {arg: 'sections'},
    },
    desktopSmallMenu: {if: {arg: 'sections'}},
};
