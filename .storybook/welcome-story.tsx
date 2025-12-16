import {Text2, Text6, Stack, Box, ResponsiveLayout, ButtonLink, TextLink, Inline} from '../src';
import logo from '../img/mistica-react-logo.svg';
import * as React from 'react';

export default {
    title: 'Welcome',
    parameters: {
        codePanel: false,
    },
};

const Paragraph = ({children}: {children: React.ReactNode}) => {
    return (
        <Text2 as="p" regular>
            {children}
        </Text2>
    );
};

export const Welcome = (): React.JSX.Element => {
    return (
        <ResponsiveLayout>
            <Box paddingY={32}>
                <Stack space={24}>
                    <Stack space={16}>
                        <Text6 as="h2">Welcome to Mística Storybook</Text6>
                        <img src={logo} alt="Mística loves react" />
                    </Stack>
                    <Stack space={16}>
                        <Paragraph>
                            Browse the stories in the sidebar menu to know the different React components in
                            the Mística catalog and see usage examples for every component.
                        </Paragraph>
                        <Paragraph>
                            Looking for a specific component? You can use the search bar or just press '/' and
                            start typing.
                        </Paragraph>
                        <Paragraph>
                            Mística comes with builtin support for the different Telefonica brand color
                            schemes. Use the theme selector in the toolbar above to switch between the
                            supported themes (Telefónica, Movistar, O2, Blau and Vivo)
                        </Paragraph>
                        <Paragraph>
                            For quick prototyping using Mística components, use the{' '}
                            <TextLink href="/playroom">Mística Playroom</TextLink>. Using the Playroom you can
                            simultaneously design across a variety of themes and screen sizes, powered by JSX
                            and Mística components library. It's the perfect tool to create quick mock-ups and
                            interactive prototypes with real code. It also allows you to share your work with
                            others by simply copying the URL.
                        </Paragraph>
                    </Stack>
                    <nav style={{margin: '0 -8px'}}>
                        <Inline space={8} wrap>
                            <ButtonLink small href="https://github.com/Telefonica/mistica">
                                About Mística
                            </ButtonLink>
                            <ButtonLink
                                small
                                href="https://github.com/Telefonica/mistica-web#getting-started"
                            >
                                Getting started
                            </ButtonLink>
                            <ButtonLink small href="/playroom">
                                Go to playroom
                            </ButtonLink>
                        </Inline>
                    </nav>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};
