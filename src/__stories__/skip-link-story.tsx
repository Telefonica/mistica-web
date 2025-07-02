import * as React from 'react';
import {Stack, SkipLink, Placeholder, Text3, TextLink, Title2, ResponsiveLayout, Box} from '..';
import {SkipLinkNav} from '../skip-link';

export default {
    title: 'Components/SkipLink',
    component: SkipLink,
    parameters: {
        fullScreen: true,
    },
};

export const Default: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <Stack space={16}>
                    <SkipLink targetId="main-content">Skip to main content</SkipLink>
                    <Text3 regular as="p">
                        This is a demonstration of a skip link. It allows users of keyboard or assistive
                        technologies to skip directly to the main content of the page, bypassing navigation
                        links and other elements that may not be relevant to them.
                    </Text3>
                    <Text3 regular as="p">
                        For example, these links <TextLink href="https://google.com">Google</TextLink> and{' '}
                        <TextLink href="https://facebook.com">Facebook</TextLink> are skipped when the skip
                        link is pressed.
                    </Text3>
                    <Placeholder height={600} />
                    <Title2 id="main-content">Main Content</Title2>
                    <Text3 regular as="p">
                        This is the main content of the page. When the skip link is activated, users will be
                        taken directly to this section. If the user presses TAB again, the focus will move to
                        interactive elements here, for example:{' '}
                        <TextLink href="https://example.com">link inside main content</TextLink>.
                    </Text3>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

Default.storyName = 'SkipLink';

export const MultipleSkipLinks: StoryComponent = () => {
    return (
        <ResponsiveLayout>
            <Box paddingY={24}>
                <Stack space={16}>
                    <SkipLinkNav>
                        <SkipLink targetId="main-content">Skip to main content</SkipLink>
                        <SkipLink targetId="more-content" aria-label="Skip to more content">
                            Skip to more content
                        </SkipLink>
                    </SkipLinkNav>
                    <Text3 regular as="p">
                        This is a demonstration of a skip link. It allows users of keyboard or assistive
                        technologies to skip directly to the main content of the page, bypassing navigation
                        links and other elements that may not be relevant to them.
                    </Text3>
                    <Text3 regular as="p">
                        In this example, there are two skip links. The first one skips to the main content,
                        and the second one skips to another section of the page.
                    </Text3>
                    <Text3 regular as="p">
                        For example, these links <TextLink href="https://google.com">Google</TextLink> and{' '}
                        <TextLink href="https://facebook.com">Facebook</TextLink> are skipped when the skip
                        link is pressed.
                    </Text3>
                    <Placeholder height={600} />
                    <Title2 id="main-content">Main Content</Title2>
                    <Text3 regular as="p">
                        This is the main content of the page. When the skip link is activated, users will be
                        taken directly to this section. If the user presses TAB again, the focus will move to
                        interactive elements here, for example:{' '}
                        <TextLink href="https://example.com">link inside main content</TextLink>.
                    </Text3>
                    <Placeholder height={600} />
                    <Title2 id="more-content">More Content</Title2>
                    <Text3 regular as="p">
                        This is another section of the page that can be skipped to using a different skip
                        link. If the user presses TAB again, the focus will move to interactive elements here,
                        for example, a link to <TextLink href="https://example.com">Example</TextLink>.
                    </Text3>
                </Stack>
            </Box>
        </ResponsiveLayout>
    );
};

MultipleSkipLinks.storyName = 'SkipLinkNav';
