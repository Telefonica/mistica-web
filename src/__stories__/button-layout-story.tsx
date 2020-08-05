import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from '../button';
import ButtonLayout from '../button-layout';
import {StorySection} from './helpers';

export default {
    title: 'Components|Layouts/ButtonLayout',
    component: ButtonLayout,
};

export const Default: StoryComponent = () => (
    <>
        <StorySection title="Limitations">
            <p>
                There is one limitation with the negative margin we use to implement the ButtonLayout
                component. A horizontal scroll will appear if a negative margin goes beyond the body. There
                are 2 available workarounds:
            </p>
            <p>
                1. Applying padding to the parent with at least half the spacing value applied to the child:
            </p>
            <pre>
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
            </pre>
            <p>2. Adding `overflow-x: hidden;` to the parent.</p>
        </StorySection>
        <StorySection title="ButtonLayout">
            <ButtonLayout>
                <ButtonSecondary fake>ok</ButtonSecondary>
                <ButtonPrimary fake>long long long long</ButtonPrimary>
            </ButtonLayout>
            <ButtonLayout>
                <ButtonSecondary fake>ok</ButtonSecondary>
                <ButtonPrimary fake>long long long long</ButtonPrimary>
            </ButtonLayout>
        </StorySection>

        <StorySection title="ButtonLayout (centered)">
            <ButtonLayout align="center">
                <ButtonSecondary fake>ok</ButtonSecondary>
                <ButtonPrimary fake>long long long long</ButtonPrimary>
            </ButtonLayout>
        </StorySection>

        <StorySection title="One button (default)">
            <ButtonLayout>
                <ButtonPrimary fake>Text</ButtonPrimary>
            </ButtonLayout>
        </StorySection>

        <StorySection title="Two buttons (default)">
            <ButtonLayout>
                <ButtonPrimary fake>Text </ButtonPrimary>
                <ButtonSecondary fake>Text</ButtonSecondary>
            </ButtonLayout>
        </StorySection>

        <StorySection title="One button (centered)">
            <ButtonLayout align="center">
                <ButtonPrimary fake>Text</ButtonPrimary>
            </ButtonLayout>
        </StorySection>

        <StorySection title="Two buttons (centered)">
            <ButtonLayout align="center">
                <ButtonPrimary fake>Text</ButtonPrimary>
                <ButtonSecondary fake>Text</ButtonSecondary>
            </ButtonLayout>
        </StorySection>

        <StorySection title="One button (centered) with link">
            <ButtonLayout align="center" link={<ButtonLink href={' '}>Text link</ButtonLink>}>
                <ButtonPrimary fake>Text</ButtonPrimary>
            </ButtonLayout>
        </StorySection>

        <StorySection title="Two buttons (centered) with link">
            <ButtonLayout align="center" link={<ButtonLink href={' '}>Text link</ButtonLink>}>
                <ButtonPrimary fake>Text</ButtonPrimary>
                <ButtonSecondary fake>Text</ButtonSecondary>
            </ButtonLayout>
        </StorySection>
    </>
);

Default.story = {name: 'ButtonLayout'};
