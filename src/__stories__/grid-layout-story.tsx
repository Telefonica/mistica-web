import * as React from 'react';
import {GridLayout, ResponsiveLayout} from '..';
import {Placeholder} from '../placeholder';

export default {
    title: 'Layout/Grid layout',
    parameters: {
        fullScreen: true,
    },
};

export const WithoutTemplate: StoryComponent = () => (
    <ResponsiveLayout>
        <GridLayout verticalSpace={8}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
        </GridLayout>
    </ResponsiveLayout>
);

WithoutTemplate.storyName = 'Without template';

export const SixAndSix: StoryComponent = () => (
    <ResponsiveLayout>
        <GridLayout template="6+6" left={<Placeholder />} right={<Placeholder />} />
    </ResponsiveLayout>
);

SixAndSix.storyName = 'Template 6+6';

export const EightAndFour: StoryComponent = () => (
    <ResponsiveLayout>
        <GridLayout template="8+4" left={<Placeholder />} right={<Placeholder />} />
    </ResponsiveLayout>
);

EightAndFour.storyName = 'Template 8+4';

export const FourAndSix: StoryComponent = () => (
    <ResponsiveLayout>
        <GridLayout template="4+6" left={<Placeholder />} right={<Placeholder />} />
    </ResponsiveLayout>
);

FourAndSix.storyName = 'Template 4+6';

export const FiveAndFour: StoryComponent = () => (
    <ResponsiveLayout>
        <GridLayout template="5+4" left={<Placeholder />} right={<Placeholder />} />
    </ResponsiveLayout>
);

FiveAndFour.storyName = 'Template 5+4';

export const ThreeAndNine: StoryComponent = () => (
    <ResponsiveLayout>
        <GridLayout template="3+9" left={<Placeholder />} right={<Placeholder />} />
    </ResponsiveLayout>
);

ThreeAndNine.storyName = 'Template 3+9';
