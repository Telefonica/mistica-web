import {Text2, Text6, Stack, Box, ResponsiveLayout, useTheme, ButtonLink, TextLink} from '../src';
import logo from '../img/mistica-react-logo.svg';

export default {
    title: 'Welcome',
};

const Paragraph = ({children}) => {
    const {colors} = useTheme();
    return (
        <Text2 as="p" color={colors.textSecondary}>
            {children}
        </Text2>
    );
};

export const Welcome = () => {
    return (
        <ResponsiveLayout>
            <Box paddingY={32}>
                <Stack space={24}>
                    <Stack space={16}>
                        <Text6 as="h2">Welcome to Mistica Storybook</Text6>
                        <img src={logo} alt="Mistica loves react" />
                    </Stack>
                    <Stack space={16}>
                        <Paragraph>
                            Browse the stories in the sidebar menu to know the different React components in
                            the Mistica catalog and see usage examples for every component.
                        </Paragraph>
                        <Paragraph>
                            Looking for a specific component? You can use the search bar or just press '/' and
                            start typing.
                        </Paragraph>
                        <Paragraph>
                            Mistica comes with builtin support for the different Telefonica brand color
                            schemes. Use the theme selector in the toolbar above to switch between the
                            supported themes (Movistar, O2 and Vivo)
                        </Paragraph>
                        <Paragraph>
                            For quick prototyping using Mistica components, use the{' '}
                            <TextLink href="/playroom">Mistica Playroom</TextLink>. Using the Playroom you can
                            simultaneously design across a variety of themes and screen sizes, powered by JSX
                            and Mistica components library. It's the perfect tool to create quick mock-ups and
                            interactive prototypes with real code. It also allows you to share your work with
                            others by simply copying the URL.
                        </Paragraph>
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
