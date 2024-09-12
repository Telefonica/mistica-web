import * as React from 'react';
import {ResponsiveLayout, Box, Stack, Text2, Title3} from '../..';

export default {
    title: 'Community/Welcome',
    parameters: {
        fullScreen: true,
    },
};

const Paragraph = ({children}: {children: React.ReactNode}) => (
    <Text2 as="p" regular>
        {children}
    </Text2>
);

export const Default: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Box paddingY={32}>
                <Stack space={24}>
                    <Title3 as="h1">Welcome to Mística Community</Title3>
                    <Stack space={16}>
                        <Paragraph>
                            Mística Community is a place to share components which are built with Mística
                            tools but are not part of the core of the design system.
                        </Paragraph>
                        <Paragraph>
                            A Mística Community Component must meet the following conditions:
                        </Paragraph>
                        <Paragraph>
                            <ul>
                                <li>
                                    Its purpose is too coupled to a specific OB or to a specific product/app
                                    to be part of Mística core. Or has the same purpose as a core component
                                    already in Mística but we need to explore a diferent approach to test if
                                    it works better. (Otherwise it should be part of Mística core)
                                </li>
                                <li>
                                    Lives in the @telefonica/mistica npm package because we have the need to
                                    share it between different projects repositories. (Otherwise it should
                                    live in the specific project repository)
                                </li>
                            </ul>
                        </Paragraph>
                        <Paragraph>
                            Mística Community Components are built with the same quality standards as Mística
                            core components. They are designed with accessibility in mind, have support for
                            dark mode, are multi skin and are tested in different devices and browsers. They
                            are available in Mística Storybook and can be used in Playroom to build
                            interactive prototypes.
                        </Paragraph>
                        <Paragraph>
                            Mística Community Components can be imported from the community folder:
                        </Paragraph>
                        <pre>{`import {SomeComponent} from '@telefonica/mistica/community'`}</pre>
                    </Stack>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Welcome';
