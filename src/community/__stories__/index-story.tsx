import * as React from 'react';
import {ResponsiveLayout, Box, Title2, Stack, Text2} from '../..';

export default {
    title: 'Community/Welcome',
    parameters: {
        fullScreen: true,
    },
};

const Paragraph = ({children}: {children: React.ReactNode}) => {
    return (
        <Text2 as="p" regular>
            {children}
        </Text2>
    );
};

export const Default: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Box paddingY={32}>
                <Stack space={24}>
                    <Title2 as="h1">Welcome to Mistica Community</Title2>
                    <Stack space={16}>
                        <Paragraph>
                            Mistica Community is a place to share components which are built with Mistica
                            tools but are not part of the core of the design system.
                        </Paragraph>
                        <Paragraph>
                            A Mistica Community Component must meet the following conditions:
                        </Paragraph>
                        <Paragraph>
                            <ul>
                                <li>
                                    Its purpose is too coupled to a specific OB or to a specific product/app
                                    to be part of Mistica core. Or has the same purpose as a core component
                                    already in Mistica but we need to explore a diferent approach to test if
                                    it works better. (Otherwise it should be part of Mistica core)
                                </li>
                                <li>
                                    Lives in the @telefonica/mistica npm package because we have the need to
                                    share it between different projects repositories. (Otherwise it should
                                    live in the specific project repository)
                                </li>
                            </ul>
                        </Paragraph>
                        <Paragraph>
                            Mistica Community Components are available in Mistica Storybook and Playroom.
                        </Paragraph>
                        <Paragraph>
                            Mistica Community Components can be imported from the community folder:
                        </Paragraph>
                        <pre>{`import {SomeComponent} from @telefonica/mistica/community`}</pre>
                    </Stack>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'Welcome';
