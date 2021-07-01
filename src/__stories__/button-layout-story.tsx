import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonLink, Text2, ButtonLayout, Stack} from '..';
import {StorySection} from './helpers';

export default {
    title: 'Components/Layouts/ButtonLayout',
    component: ButtonLayout,
};

export const Default: StoryComponent = () => (
    <>
        <StorySection title="Limitations">
            <Stack space={16}>
                <Text2 as="p" regular>
                    There is one limitation with the negative margin we use to implement the ButtonLayout
                    component. A horizontal scroll will appear if a negative margin goes beyond the body.
                    There are 2 available workarounds:
                </Text2>
                <Text2 as="p" regular>
                    1. Applying padding to the parent with at least half the spacing value applied to the
                    child:
                </Text2>
                <Text2 as="pre" regular>
                    <code>
                        {'<body>'}
                        <br />
                        {'  <Box paddingX={16}>'}
                        <br />
                        {'      <ButtonLayout>//...</ButtonLayout>'}
                        <br />
                        {'  </Box>'}
                        <br />
                        {'</body>'}
                    </code>
                </Text2>
                <Text2 as="p" regular>
                    2. Adding `overflow-x: hidden;` to the parent.
                </Text2>
            </Stack>
        </StorySection>
        <div data-testid="screenshot">
            <StorySection title="ButtonLayout">
                <ButtonLayout>
                    <ButtonSecondary fake>Ok</ButtonSecondary>
                    <ButtonPrimary fake>The text in this button is very long</ButtonPrimary>
                </ButtonLayout>
                <ButtonLayout>
                    <ButtonSecondary fake>The text in this button is very long</ButtonSecondary>
                    <ButtonPrimary fake>The text in this button is very long</ButtonPrimary>
                </ButtonLayout>
            </StorySection>

            <StorySection title="ButtonLayout (centered)">
                <ButtonLayout align="center">
                    <ButtonSecondary fake>Ok</ButtonSecondary>
                    <ButtonPrimary fake>The text in this button is very long</ButtonPrimary>
                </ButtonLayout>
            </StorySection>

            <StorySection title="One button (default)">
                <ButtonLayout>
                    <ButtonPrimary fake>The text in this button is very long</ButtonPrimary>
                </ButtonLayout>
            </StorySection>

            <StorySection title="Two buttons (default)">
                <ButtonLayout>
                    <ButtonPrimary fake>Text</ButtonPrimary>
                    <ButtonSecondary fake>The text in this button is very long</ButtonSecondary>
                </ButtonLayout>
            </StorySection>

            <StorySection title="One button (centered)">
                <ButtonLayout align="center">
                    <ButtonPrimary fake>The text in this button is very long</ButtonPrimary>
                </ButtonLayout>
            </StorySection>

            <StorySection title="Two buttons (centered)">
                <ButtonLayout align="center">
                    <ButtonPrimary fake>Text</ButtonPrimary>
                    <ButtonSecondary fake>The text in this button is very long</ButtonSecondary>
                </ButtonLayout>
            </StorySection>

            <StorySection title="One button (centered) with link">
                <ButtonLayout align="center" link={<ButtonLink href="#">Text link</ButtonLink>}>
                    <ButtonPrimary fake>Text</ButtonPrimary>
                </ButtonLayout>
            </StorySection>

            <StorySection title="Two buttons (centered) with link">
                <ButtonLayout align="center" link={<ButtonLink href="#">Text link</ButtonLink>}>
                    <ButtonPrimary fake>Text</ButtonPrimary>
                    <ButtonSecondary fake>The text in this button is very long</ButtonSecondary>
                </ButtonLayout>
            </StorySection>
        </div>
    </>
);

Default.storyName = 'ButtonLayout';
