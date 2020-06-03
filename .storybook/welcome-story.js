// @flow
import * as React from 'react';
import {Text, Stack, Box, ResponsiveLayout, useTheme, ButtonLink} from '../src';
import logo from '../img/mistica-react-logo.svg';

export default {
    title: 'Welcome|Welcome',
};

export const Mistica = (): React.Node => {
    const {colors} = useTheme();
    return (
        <ResponsiveLayout>
            <Box paddingY={32}>
                <Stack space={24}>
                    <Stack space={16}>
                        <Text size={24} as="h2" weight="medium">
                            Welcome to Mistica Storybook
                        </Text>
                        <img src={logo} alt="Mistica loves react" />
                    </Stack>
                    <Stack space={16}>
                        <Text as="p" size={16} color={colors.textSecondary}>
                            Browse the stories in the sidebar menu to know the different components in the
                            mistica-web catalog and see usage examples for every component.
                        </Text>
                        <Text as="p" size={16} color={colors.textSecondary}>
                            Looking for a specific component? You can use the search bar or just press '/' and
                            start typing.
                        </Text>
                        <Text as="p" size={16} color={colors.textSecondary}>
                            Mistica comes with builtin support for the different Telefonica brand color
                            schemes. Use the theme selector to switch between the supported themes (Movistar,
                            O2 and Vivo)
                        </Text>
                    </Stack>
                    <nav style={{margin: '0 -8px'}}>
                        <ButtonLink href="https://github.com/Telefonica/mistica">About Mistica</ButtonLink>
                        <ButtonLink href="https://github.com/Telefonica/mistica-web#getting-started">
                            Getting started
                        </ButtonLink>
                        <ButtonLink href="/playroom">Go to playroom</ButtonLink>
                    </nav>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};
