import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonLink, Text2, ButtonLayout, Stack} from '..';
import {Title1} from '../title';
import {StorySection} from './helpers';

export default {
    title: 'Layout/Button layout',
    component: ButtonLayout,
};

type Props = {
    align?: 'center' | 'left' | 'right' | 'full-width';
};

const Template = ({align = 'full-width'}: Props) => (
    <StorySection title={`ButtonLayout (align = ${align})`}>
        <Stack space={16}>
            <Title1 as="h2">One button</Title1>
            <ButtonLayout
                align={align}
                primaryButton={<ButtonPrimary onPress={() => {}}>Ok</ButtonPrimary>}
            />

            <Title1 as="h2">Two buttons</Title1>
            <ButtonLayout
                align={align}
                primaryButton={<ButtonPrimary onPress={() => {}}>Ok</ButtonPrimary>}
                secondaryButton={<ButtonSecondary onPress={() => {}}>Cancel</ButtonSecondary>}
            />

            <Title1 as="h2">Long captions</Title1>
            <ButtonLayout
                align={align}
                primaryButton={<ButtonPrimary onPress={() => {}}>This one isn't so long</ButtonPrimary>}
                secondaryButton={
                    <ButtonSecondary onPress={() => {}}>The text in this button is very long</ButtonSecondary>
                }
            />

            <Title1 as="h2">One button with link</Title1>
            <ButtonLayout
                align={align}
                link={<ButtonLink href="#">Text link</ButtonLink>}
                primaryButton={<ButtonPrimary onPress={() => {}}>Ok</ButtonPrimary>}
            />

            <Title1 as="h2">Two buttons with link</Title1>
            <ButtonLayout
                align={align}
                link={<ButtonLink href="#">Text link</ButtonLink>}
                primaryButton={<ButtonPrimary onPress={() => {}}>Ok</ButtonPrimary>}
                secondaryButton={<ButtonSecondary onPress={() => {}}>Cancel</ButtonSecondary>}
            />

            <Title1 as="h2">Only link</Title1>
            <ButtonLayout align={align} link={<ButtonLink href="#">Text link</ButtonLink>} />
        </Stack>
    </StorySection>
);

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
                        {'      <ButtonLayout/>'}
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
        <Stack space={16}>
            <Template align="full-width" />
            <Template align="center" />
            <Template align="left" />
            <Template align="right" />
        </Stack>
    </>
);

Default.storyName = 'Button layout';
