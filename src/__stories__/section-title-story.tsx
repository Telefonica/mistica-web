import * as React from 'react';
import {StorySection} from './helpers';
import SectionTitle from '../section-title';
import {Placeholder} from '../placeholder';
import TextLink from '../text-link';

export default {
    title: 'Components/Others/SectionTitle',
};

export const Default: StoryComponent = () => (
    <StorySection title="SectionTitle example">
        <SectionTitle>This is a section title</SectionTitle>
        <Placeholder />
        <SectionTitle right={<TextLink href="https://google.com">Link</TextLink>}>
            This is a section title with link
        </SectionTitle>
        <Placeholder />
        <SectionTitle right={<TextLink href="https://google.com">Link</TextLink>}>
            This is a section title with link and with a long text that may wrap to multiple lines in small
            screens
        </SectionTitle>
        <Placeholder />
    </StorySection>
);

Default.storyName = 'SectionTitle';
