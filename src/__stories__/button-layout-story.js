// @flow
import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonLink} from '../button';
import ButtonLayout from '../button-layout';
import {StorySection} from './helpers';

export default {
    title: 'Core|ButtonLayout',
    component: ButtonLayout,
};

export const buttonLayout = (): React.Node => (
    <>
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
